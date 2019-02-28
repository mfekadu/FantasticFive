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
        let getProducts = (req: Request, res: Response) => {
            // get a productRepo object for typeorm
            const productRepo = getRepository(Product);
            // define the function to handle the find() Promise
            let getProductArray = (productArray : Product[]) => {
                res.status(OK).send({ productArray });
             };
            // find the product table in DB, 
            // then set OK status and send back the productArray
            productRepo.find().then(getProductArray);
        };

        // private helper function to handle POST requests
        let createProduct = (req: Request, res: Response) => {
            const productRepo = getRepository(Product);
            // unravel the req.body properties into variables
            const { title, desc, quantity, price, photoURL } = req.body;
            const product = new Product();
            product.title = title;
            product.desc = desc;
            product.quantity = quantity;
            product.price = price;
            product.photoURL = photoURL;
            // save the product, set OK, send back product
            productRepo.save(product).then((createdProduct : Product) => {
                res.status(OK).send({createdProduct});
            });
        };

        // private helper to handle PUT requests
        let updateProduct = (req: Request, res: Response) => {
            const productRepo = getRepository(Product);
            // unravel the req.body properties into variables
            const { title, desc, quantity, price, photoURL } = req.body;
            // get the product to be updated
            productRepo.findOneOrFail(req.params.id).then((foundProduct: Product) => {
                // save updates here
                foundProduct.title = "updated";
                productRepo.save(foundProduct).then((updatedProduct : Product) => {
                    res.send(OK).send({product: updatedProduct});
                });
            });
        };

        const router = Router();
        router.route("/shop")
            .get( getProducts )
            .post( createProduct )
            .put( updateProduct );

        return router;
    };
};