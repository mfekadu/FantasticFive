import DefaultController from "./default.controller";

import { Request, Response, Router } from "express";

import { Product } from "../entity";

import { getRepository } from "typeorm";

const OK = 200;

export class ProductController extends DefaultController {

    protected initializeRoutes(): Router {

        // private helper function to handle GET requests
        // ... given HTTP GET Request 'req' 
        // ... find and send back the productArray from DB via 'res' using Express
        const getProducts = (req: Request, res: Response) => {
            // get a productRepo object for typeorm
            const productRepo = getRepository(Product);
            // define the function to handle the find() Promise
            const getProductArray = (productArray : Product[]) => {
                res.status(OK).send({ productArray });
             };
            // find the product table in DB, 
            // then set OK status and send back the productArray
            productRepo.find().then(getProductArray);
        };

        // private helper function to handle POST requests
        const createProduct = (req: Request, res: Response) => {
            const productRepo = getRepository(Product);
            // unravel the req.body properties into variables
            const { title, desc, stock, price, photoURL } = req.body;
            const product = new Product();
            product.title = title;
            product.desc = desc;
            product.stock = stock;
            product.price = price;
            product.photoURL = photoURL;
            // save the product, set OK, send back product
            productRepo.save(product).then((createdProduct : Product) => {
                res.status(OK).send({createdProduct});
            });
        };

        // private helper to handle PUT requests
        const updateProduct = (req: Request, res: Response) => {
            const productRepo = getRepository(Product);
            // unravel the req.body properties into variables
            const { title, desc, stock, price, photoURL } = req.body;
            // get the product to be updated
            productRepo.findOneOrFail(req.params.id).then((foundProduct: Product) => {
                // update the actual product
                foundProduct.title = title;
                foundProduct.desc = desc;
                foundProduct.stock = stock;
                foundProduct.price = price;
                foundProduct.photoURL = photoURL;
                // save the updated product
                productRepo.save(foundProduct).then((updatedProduct : Product) => {
                    res.send(OK).send({product: updatedProduct});
                });
            });
        };

        // private helper to handle DELETE requests
        const deleteProduct = (req: Request, res: Response) => {
            const productRepo = getRepository(Product);
            productRepo.findOneOrFail(req.params.id).then((foundProduct: Product) => {
                productRepo.remove(foundProduct).then((updatedProduct: Product) => {
                res.status(OK).send({ product: updatedProduct });
              });
            });
          };

        const router = Router();
        router.route("/shop")
            .get( getProducts )
            .post( createProduct );

        router.route("/shop/:id")
            .put( updateProduct )
            .delete( deleteProduct );

        return router;
    };
};