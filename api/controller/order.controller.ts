import DefaultController from "./default.controller";

import { Request, Response, Router } from "express";

import { Order, Shipping, Billing } from "../entity";

import { getRepository } from "typeorm";

export class OrderController extends DefaultController {

    protected initializeRoutes(): Router {
        const router = Router();
        router
          .route("/checkout")
          .get((req: Request, res: Response) => {
            const orderRepo = getRepository(Order);
            orderRepo.find().then((order: Order[]) => {
              res.status(200).send({ order });
            });
          })
          .post((req: Request, res: Response) => {
            const orderRepo = getRepository(Order);
            const shipRepo = getRepository(Shipping);
            const billRepo = getRepository(Billing);
            const { status, shippingYN, firstShip, lastShip, address1, address2, city, 
                state, zip, firstBill, lastBill, cardNumber, expiration, cvv } = req.body;
            const order = new Order();
            order.status = status;
            order.shippingYN = shippingYN;
            //Shipping Info
            const shipping = new Shipping();
            shipping.firstName = firstShip;
            shipping.lastName = lastShip;
            shipping.address1 = address1;
            shipping.address2 = address2;
            shipping.city = city;
            shipping.state = state;
            shipping.zip = zip;
            //Billing Info
            const billing = new Billing();
            billing.firstName = firstBill;
            billing.lastName = lastBill;
            billing.cardNumber = cardNumber;
            billing.expiration = expiration;
            billing.cvv = cvv;
            //Link the Order to the Shipping and Billing Info
            order.shipping = shipping;
            order.billing = billing;
            orderRepo.save(order).then(
              createdOrder => {
                res.status(200).send({ createdOrder });
              }
            );
          });

          router.route("/orders")
          .get((req: Request, res: Response) => {
            const orderRepo = getRepository(Order);
            orderRepo.find({relations: ['shipping', 'billing']}).then((order: Order[]) => {
              res.status(200).send({ order });
            });
          })
          return router;
    }
}