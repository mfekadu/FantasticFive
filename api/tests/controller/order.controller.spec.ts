import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { Order, Shipping, Billing } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";

describe("/orders", () => {
  let myApp: express.Application;
  let connection: Connection;

  const createOrder = (
    status: string,
    conn: Connection
  ): Promise<Order> => {
    const order = new Order();
    order.status = "testOrder";
    order.shippingYN = true;
    order.orderMonth = 6;
    
    return conn.getRepository(Order).save(order);
  };

  beforeAll(async () => {
    myApp = await new Server().getMyApp();
    connection = await DBConnection.getConnection();
    await connection.synchronize();
  });

  beforeEach(async () => {
    await DBUtils.clearDB();
  });

  afterAll(async () => {
    DBConnection.closeConnection();
  });

  describe("GET '/'", () => {
    test("should return an empty list because there isn't anything in the database", done => {
      request(myApp)
        .get("/orders")
        .then((response: request.Response) => {
          expect(response.body).toEqual({ order: [] });
          done();
        });
    });
    test("should return one order", done => {
      const status = "swag";
      return createOrder(status, connection).then((createdOrder: Order) => {
        return request(myApp)
          .get("/orders")
          .expect(200)
          .then((response: request.Response) => {
            expect(
              response.body.orders && response.body.orders.length
            ).toEqual(1);
            expect(response.body.orders[0].status.toEqual("swag"));
            done();
          });
      });
    }); 
  });
  describe("POST '/'", () => {
    test("should create a order", done => {
      const status = "swag";
      const shipping = new Shipping();
      return request(myApp)
        .post("/orders")
        .send({
          status: "shipped fam",
          shipping: new Shipping(),
          billing: new Billing()
        })
        .then((response: request.Response) => {
          expect(response.body.createdOrder.status).toEqual("shipped fam");
          done();
        });
    });
  });

});