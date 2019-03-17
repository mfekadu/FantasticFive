import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { Product, ProductBrand, ProductCategory } from "../../entity";
import { Server } from "../../server";
import DBUtils from "../util/database";

const PRODUCT_TITLE: string = "test product title";
const PRODUCT_DESC: string = "test product description";
const PRODUCT_PHOTO_URL: string = "test photo url";
const PRODUCT_BRAND_NAME: string = "test brand name";
const PRODUCT_PRICE: number = 42;
const PRODUCT_STOCK: number = 10;
const PRODUCT_SHIPYN: boolean = true;
const PRODUCT_CATS: ProductCategory[] = [];
const PRODUCT_SALEYN: boolean = true;
const PRODUCT_SALES_PRICE: number = 55;

const OBJ_TO_POST = {
  title: PRODUCT_TITLE,
  desc: PRODUCT_DESC,
  stock: PRODUCT_STOCK,
  brand: {name: PRODUCT_BRAND_NAME},
  categories: [{name: "cat1"}, {name: "cat2"}, {name: "cat3"}],
  price: PRODUCT_PRICE,
  saleYN: PRODUCT_SALEYN,
  salesPrice: PRODUCT_SALES_PRICE,
  canShipYN: PRODUCT_SHIPYN,
  photoURL: PRODUCT_PHOTO_URL
}



const testSuite = () => {
  // declare the API variables
  let myApp: express.Application;
  let connection: Connection

  // given a productName and an api connection
  // return a promise of a created product after saving the new product
  const createProduct = (title: string, conn: Connection) => {
    const p = new Product();
    p.title = title;
    p.brand = new ProductBrand();
    p.brand.name = PRODUCT_BRAND_NAME;
    p.stock = PRODUCT_STOCK;
    p.canShipYN = PRODUCT_SHIPYN;
    p.categories = PRODUCT_CATS;
    p.desc = PRODUCT_DESC;
    p.photoURL = PRODUCT_PHOTO_URL;
    p.price = PRODUCT_PRICE;
    p.saleYN = PRODUCT_SALEYN;
    p.salesPrice = PRODUCT_SALES_PRICE;
    // save p into the Product table.
    return conn.getRepository(Product).save(p);
  }

  const getNewDatabaseConnection = async () => { 
    myApp = await new Server().getMyApp();
    connection = await DBConnection.getConnection();
    await connection.synchronize();
  };

  const clearTheDatabase = async () => {
    await DBUtils.clearDB();
  }

  const closeTheDatabase = async () => {
    console.log("close DB");
    DBConnection.closeConnection();
  }

  // first thing that runs
  beforeAll(getNewDatabaseConnection);

  // before every test case
  beforeEach(clearTheDatabase);

  // last thing that runs?
  afterAll(closeTheDatabase);

  // define the GET tests
  const allGETtests = () => {
    test("should return an empty list because there is nothing in the database", done => {
      request(myApp).get('/shop').then((response: request.Response) => {
        expect(response.body).toEqual({ users: [] });
        done();
      });
    });

    test("should return one product", done => {
      const title = PRODUCT_TITLE;
      const handleCreatePromise = (createdProduct: Product) => {
        const handleGetPromise = (response: request.Response) => {
          expect(response.body.productArray && response.body.productArray.length).toEqual(1);
          expect(response.body.productArray[0].title).toEqual(title);
          done();
        }
        return request(myApp).get('/shop').expect(200).then(handleGetPromise);
      }
      return createProduct(title, connection).then(handleCreatePromise)
    })
  }

  // define the POST tests
  const allPOSTtests = () => {
    test("should create a product", done => {
      const title = `test${new Date().getTime()}@test.com`;
      const handlePostPromise = (res : request.Response) => {
        expect(res.body.createdProduct.title).toEqual(title);
        done();
      }
      return request(myApp).post("/shop").send({...OBJ_TO_POST}).then(handlePostPromise);
    });
  }

  // tell Jest about the 'descriptions' of the tests
  describe("GET '/'", allGETtests);
  describe("POST '/'", allPOSTtests);
}

// tell jest about the 'description' of the test suite
describe("/shop", testSuite);