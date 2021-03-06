import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";

import { Order, Shipping, Billing, OrderProducts, Product } from "../entity";

import multer from "multer";
import Path from "path";

import { getRepository } from "typeorm";

export class OrderController extends DefaultController {

    protected initializeRoutes(): Router {
        const router = Router();
        router
          .route("/checkout")
          .post((req: Request, res: Response) => {
            const orderRepo = getRepository(Order);
            const order = new Order();
            const today = new Date();
            order.orderMonth = today.getMonth() + 1;
            order.orderDay = today.getDate();
            order.orderYear = today.getFullYear();
            order.status = req.body.status;
            order.shippingYN = req.body.shippingYN;
            //Shipping Info
            const shipping = new Shipping();
            shipping.firstName = req.body.shipping.firstName;
            shipping.lastName = req.body.shipping.lastName;
            shipping.address1 = req.body.shipping.address1;
            shipping.address2 = req.body.shipping.address2;
            shipping.city = req.body.shipping.city;
            shipping.state = req.body.shipping.state;
            shipping.zip = req.body.shipping.zip;
            //Billing Info
            const billing = new Billing();
            billing.firstName = req.body.billing.firstName;
            billing.lastName = req.body.billing.lastName;
            billing.cardNumber = req.body.billing.cardNumber;
            billing.expiration = req.body.billing.expiration;
            billing.cvv = req.body.billing.cvv;
            //Link the Order to the Shipping and Billing Info
            order.shipping = shipping;
            order.billing = billing;
            orderRepo.save(order).then(
              createdOrder => {
                res.status(200).send(order);
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
          
          router.route("/orderProduct/:id")
          .post((req: Request, res: Response) => {
            const orderProductsRepo = getRepository(OrderProducts);
            console.log("req.body....",req.body);
            const { id, cartQuantity, price, saleYN, salesPrice} = req.body;

            const orderProd = new OrderProducts();
            orderProd.orderNumber = req.params.id;
            orderProd.productId = id;
            orderProd.orderQuantity = cartQuantity;
            if (saleYN) {
              orderProd.orderPrice = salesPrice * cartQuantity;
            }
            else {
              orderProd.orderPrice = price * cartQuantity;
            }
            orderProductsRepo.save(orderProd).then(
              createdOrderProduct => {
                res.status(200).send(orderProd);
              }
            );
          });

          router.route("/orderProduct")
          .get((req: Request, res: Response) => {
            const orderProductRepo = getRepository(OrderProducts);
            orderProductRepo.find().then((orderProds: OrderProducts[]) => {
              res.status(200).send({ orderProds });
            });
          });

          router.route("/productInfo/:id")
          .get((req: Request, res: Response) => {
            const productRepo = getRepository(Product);
            productRepo.findOneOrFail(req.params.id).then((item: Product) => {
              res.status(200).send({ item });
            });
          });

          return router;
    }
}