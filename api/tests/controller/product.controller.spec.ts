import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { Product } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";

describe("/shop", () => {
  let myApp: express.Application;
  let connection: Connection;

  const createProduct = (
    title: string,
    conn: Connection
  ): Promise<Product> => {
    const product = new Product();
    product.title= title;
    return conn.getRepository(Product).save(product);
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
        .get("/shop")
        .then((response: request.Response) => {
          expect(response.body).toEqual({ productArray: [] });
          done();
        });
    });
    test("should return one product", done => {
      const title = "swag";
      return createProduct(title, connection).then((createdProduct: Product) => {
        return request(myApp)
          .get("/shop")
          .expect(200)
          .then((response: request.Response) => {
            expect(
              response.body.productArray && response.body.productArray.length
            ).toEqual(1);
            expect(response.body.productArray[0].title).toEqual(title);
            done();
          });
      });
    });
  });
  describe("POST '/'", () => {
    test("should create a product", done => {
      const title = `testTitle`;
      return request(myApp)
        .post("/shop")
        .send({
          title: title
        })
        .then((response: request.Response) => {
          expect(response.body.createdProduct).toEqual(title);
          done();
        });
    });
  });
});
