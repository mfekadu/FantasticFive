import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { Announcement } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";

describe("/announcements", () => {
  let myApp: express.Application;
  let connection: Connection;

  const createAnnouncement = (
    title: string,
    conn: Connection
  ): Promise<Announcement> => {
    const announcement = new Announcement();
    announcement.title= title;
    announcement.desc = "test";
    return conn.getRepository(Announcement).save(announcement);
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
        .get("/announcements")
        .then((response: request.Response) => {
          expect(response.body.length).toEqual(8);
          done();
        });
    });
    test("should return one announcement", done => {
      const title= "testTitle";
      return createAnnouncement(title, connection).then((createdAnnounce: Announcement) => {
        return request(myApp)
          .get("/announcements")
          .expect(200);
      });
    });
  });
  describe("POST '/'", () => {
    test("should create an announcement", done => {
      const testTitle = "testTitle";
      return request(myApp)
        .post("/announcements")
        .send({
          title: testTitle,
          desc: "test"
        })
        .then((response: request.Response) => {
          expect(response.body.createdAnnounce.title).toEqual(testTitle);
          done();
        });
    });
  });
});
