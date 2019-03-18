import DefaultController from "./default.controller";

import { Request, Response, Router } from "express";

import { Product, ProductBrand, ProductCategory } from "../entity";

import { getRepository, Repository } from "typeorm";

const OK = 200;

export class ProductController extends DefaultController {

    protected initializeRoutes(): Router {

        // private helper function to handle GET requests
        // ... given HTTP GET Request 'req' 
        // ... find and send back the productArray from DB via 'res' using Express
        const getProducts = (req: Request, res: Response) => {
            // get a productRepo object for typeorm
            const productRepo = getRepository(Product);
            // define the function to handle the find() Promise
            const sendProductArray = (productArray: Product[]) => {
                res.status(OK).send({ productArray });
            };
            // find the product table in DB, 
            // then set OK status and send back the productArray
            const options = { relations: ['brand', 'categories'] };
            productRepo.find(options).then(sendProductArray);
        };

        // private helper function to handle POST requests
        const createProduct = (req: Request, res: Response) => {
            const productRepo = getRepository(Product);
            const brandRepo = getRepository(ProductBrand);
            const categoryRepo = getRepository(ProductCategory);
            // unravel the req.body properties into variables
            // brand is expected to be an object {id: number, name: string}
            // categories is expected to be an object {id: number, name: string}
            const { title, desc, stock, brand, categories,
                price, saleYN, salesPrice, canShipYN, photoURL } = req.body;
            const newProduct = new Product();
            // setup all the primitive data
            newProduct.title = title;
            newProduct.desc = desc;
            newProduct.stock = stock;
            newProduct.price = price;
            newProduct.saleYN = saleYN;
            newProduct.salesPrice = salesPrice;
            newProduct.canShipYN = canShipYN;
            newProduct.photoURL = photoURL;

            const saveTheProduct = () => {
                console.log("saving product");
                // save the product, set OK, send back product
                productRepo.save(newProduct).then((createdProduct: Product) => {
                    res.status(OK).send({ createdProduct });
                });
            }
            const findCats = (): Promise<any> => {
                // extract an array of the ids
                console.log("finding categories");
                const catIds = categories.map((each: any) => each.id);
                return new Promise((resolve) => {
                    categoryRepo.findByIds(catIds).then(resolve);
                });
            }
            const appendCats = (foundCats: ProductCategory[]): Promise<any> => {
                console.log("appending categories");
                newProduct.categories = foundCats;
                return new Promise(resolve => resolve());
            };
            const appendBrand = (foundBrand: ProductBrand): Promise<any> => {
                console.log("appending brand");
                newProduct.brand = foundBrand;
                return new Promise(resolve => resolve());
            }

            // never expect to create a new brand
            brandRepo.findOneOrFail(brand.id)
                .then(appendBrand)
                .then(findCats)
                .then(appendCats)
                .then(saveTheProduct);
        };

        // private helper to handle PUT requests
        const updateProduct = (req: Request, res: Response) => {
            const productRepo = getRepository(Product);
            const brandRepo = getRepository(ProductBrand);
            const categoryRepo = getRepository(ProductCategory);
            // unravel the req.body properties into variables
            const { title, desc, brand, categories, isActive, stock, price, saleYN, 
                    salesPrice, canShipYN, photoURL } = req.body;
            // get the product to be updated
            productRepo.findOneOrFail(req.params.id).then((foundProduct: Product) => {
                // update the actual product
                foundProduct.title = title;
                foundProduct.desc = desc;
                foundProduct.categories = categories;
                foundProduct.stock = stock;
                foundProduct.price = price;
                foundProduct.saleYN = saleYN;
                foundProduct.salesPrice = salesPrice;
                foundProduct.canShipYN = canShipYN;
                foundProduct.photoURL = photoURL;
                foundProduct.isActive = isActive; 

                const saveTheProduct = () => {
                    console.log("saving product");
                    // save the product, set OK, send back product
                    productRepo.save(foundProduct).then((createdProduct: Product) => {
                        res.status(OK).send({ createdProduct });
                    });
                }
                const findCats = (): Promise<any> => {
                    // extract an array of the ids
                    console.log("finding categories");
                    const catIds = categories.map((each: any) => each.id);
                    return new Promise((resolve) => {
                        categoryRepo.findByIds(catIds).then(resolve);
                    });
                }
                const appendCats = (foundCats: ProductCategory[]): Promise<any> => {
                    console.log("appending categories");
                    foundProduct.categories = foundCats;
                    return new Promise(resolve => resolve());
                };
                const appendBrand = (foundBrand: ProductBrand): Promise<any> => {
                    console.log("appending brand");
                    foundProduct.brand = foundBrand;
                    return new Promise(resolve => resolve());
                }

                // never expect to create a new brand
                brandRepo.findOneOrFail(brand.id)
                    .then(appendBrand)
                    .then(findCats)
                    .then(appendCats)
                    .then(saveTheProduct);
            });
        };

        // private helper to handle DELETE requests
        const deleteProduct = (req: Request, res: Response) => {
            const productRepo = getRepository(Product);
            productRepo.findOneOrFail(req.params.id).then((foundProduct: Product) => {
                productRepo.remove(foundProduct).then((updatedProduct: Product) => {
                    res.status(OK).send({ product: updatedProduct });
                });
            });
        };

        const getBrands = (req: Request, res: Response) => {
            const brandRepo = getRepository(ProductBrand);
            // define the function to handle the find() Promise
            const getBrandArray = (brands: ProductBrand[]) => {
                res.status(OK).send({ brands });
            };
            brandRepo.find().then(getBrandArray);
        }

        const getCats = (req: Request, res: Response) => {
            const catRepo = getRepository(ProductCategory);
            // define the function to handle the find() Promise
            const getCatArray = (categories: ProductCategory[]) => {
                res.status(OK).send({ categories });
            };
            catRepo.find().then(getCatArray);
        }

        const getSpecificProduct = (req: Request, res: Response) => {
            const productRepo = getRepository(Product);
            // find the product table in DB, 
            // then set OK status and send back the productArray
            const options = { relations: ['brand', 'categories'] };
            // get the product to be updated
            productRepo.findOneOrFail(req.params.id, options).then((foundProduct: Product) => {
                res.status(OK).send({ product: foundProduct });
            });
        };

        const createBrand = (req: Request, res: Response) => {
            const brandRepo = getRepository(ProductBrand);
            const brand = new ProductBrand();
            brand.name = req.body.name;
            brandRepo.save(brand).then(createdBrand => {
                res.status(200).send({ brand });
            });
        };

        const createCategory = (req: Request, res: Response) => {
            const catRepo = getRepository(ProductCategory);
            const category = new ProductCategory();
            category.name = req.body.name;
            catRepo.save(category).then(createdCat => {
                res.status(200).send({ category });
            });
        };

        const router = Router();
        router.route("/shop")
            .get(getProducts)
            .post(createProduct);

        router.route("/shop/:id")
            .get(getSpecificProduct)
            .put(updateProduct)
            .delete(deleteProduct);

        router.route("/brand")
            .get(getBrands)
            .post(createBrand);

        router.route("/category")
            .get(getCats)
            .post(createCategory);

        return router;
    };
};