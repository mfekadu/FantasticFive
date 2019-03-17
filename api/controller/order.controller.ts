import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";

import { Order, Shipping, Billing } from "../entity";

import multer from "multer";
import Path from "path";

import { getRepository } from "typeorm";

export class OrderController extends DefaultController {

    protected initializeRoutes(): Router {
        const router = Router();
        router
          .route("/orders")
          .post((req: Request, res: Response) => {
            const orderRepo = getRepository(Order);
            const shipRepo = getRepository(Shipping);
            const billRepo = getRepository(Billing);
            const { shippingYN, firstShip, lastShip, address1, address2, city, 
                state, zip, firstBill, lastBill, cardNumber, expiration, cvv } = req.body;
            const order = new Order();
            const today = new Date();
            order.orderMonth = today.getMonth();
            order.orderDay = today.getDate();
            order.orderYear = today.getFullYear();
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

          router.route("/orderDetails/:id")
          .get((req: Request, res: Response) => {
            const orderRepo = getRepository(Order);
            orderRepo.findOneOrFail(req.params.id, {relations: ['shipping', 'billing']}).then((item: Order) => {
              res.status(200).send({ item });
            });
          })
          .put((req: Request, res: Response) => {
            const orderRepo = getRepository(Order);
            orderRepo.findOneOrFail(req.params.id, {relations: ['shipping', 'billing']}).then((foundOrder: Order) => {
              // save updates here
              foundOrder.status = req.body.status;
              foundOrder.shippingYN = req.body.shippingYN;
              foundOrder.shipping.firstName = req.body.shipping.firstName;
              foundOrder.shipping.lastName = req.body.shipping.lastName;
              foundOrder.shipping.address1 = req.body.shipping.address1;
              foundOrder.shipping.address2 = req.body.shipping.address2;
              foundOrder.shipping.city = req.body.shipping.city;
              foundOrder.shipping.state = req.body.shipping.state;
              foundOrder.shipping.zip = req.body.shipping.zip;
              foundOrder.billing.firstName = req.body.billing.firstName;
              foundOrder.billing.lastName = req.body.billing.lastName;
              foundOrder.billing.cardNumber = req.body.billing.cardNumber;
              foundOrder.billing.expiration = req.body.billing.expiration;
              foundOrder.billing.cvv = req.body.billing.cvv;
              orderRepo.save(foundOrder).then((updatedOrder: Order) => {
                res.status(200).send({ service: updatedOrder });
              });
            });
          });

          return router;
    }
}