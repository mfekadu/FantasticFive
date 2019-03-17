import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { Service } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";

describe("/services", () => {
  let myApp: express.Application;
  let connection: Connection;

  const createService = (
    title: string,
    conn: Connection
  ): Promise<Service> => {
    const service = new Service();
    service.title= title;
    return conn.getRepository(Service).save(service);
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
        .get("/services")
        .then((response: request.Response) => {
          expect(response.body).toEqual({ items: [] });
          done();
        });
    });
    test("should return one service", done => {
      const title = "testString";
      return createService(title, connection).then((savedService: Service) => {
        return request(myApp)
          .get("/items")
          .expect(200)
          .then((response: request.Response) => {
            expect(
              response.body.items && response.body.items.length
            ).toEqual(1);
            expect(response.body.items[0].title).toEqual(title);
            done();
          });
      });
    });
  });
  describe("POST '/'", () => {
    test("should create a service", done => {
      const title = `testTitle`;
      return request(myApp)
        .post("/services")
        .send({
          title: title
        })
        .then((response: request.Response) => {
          expect(response.body.createdService.title).toEqual(title);
          done();
        });
    });
  });
});