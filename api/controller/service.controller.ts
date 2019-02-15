import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Service } from "../entity";

import { getRepository } from "typeorm";

export class ServiceController extends DefaultController {
    protected initializeRoutes(): express.Router {
        const router = express.Router();

        router.route("/services")
        .get((req: Request, res: Response) => {
            const itemRepo = getRepository(Service);
            itemRepo.find().then((items: Service[]) => {
              res.status(200).send({ items });
            });
          })
        .post((req: Request, res: Response) => {
            const token = req.get("token");
            const serviceRepo = getRepository(Service);
            const service = new Service();
            service.title = req.body.title;
            service.desc = req.body.desc;
            service.price = req.body.price;
            serviceRepo.save(service).then((savedService: Service) => {
                res.status(200).send({ service });
            });
        });

        return router;
    }
}
