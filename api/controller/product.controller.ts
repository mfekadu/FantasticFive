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
        const router = Router();
        router.route("/shop")
            .get( getProducts )

        return router;
    };
};