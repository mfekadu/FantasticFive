import { iProduct } from "@/models/product.interface";

const p1: iProduct = {
  id: Number.MAX_SAFE_INTEGER - 4,
  title: "A Trek Bike",
  desc: "description",
  brand: "Trek",
  categories: ["Bikes"],
  inventoryQuantity: 3,
  cartQuantity: 0,
  price: 499,
  saleYN: false,
  salesPrice: 499,
  canShipYN: true,
  photoURL: "./logo.png"
};

const p2: iProduct = {
  id: Number.MAX_SAFE_INTEGER - 3,
  title: "B Diamod",
  desc: "description",
  brand: "Diamondback",
  categories: ["Bikes"],
  inventoryQuantity: 3,
  cartQuantity: 0,
  price: 99,
  saleYN: false,
  salesPrice: 499,
  canShipYN: false,
  photoURL: "./128x128.png"
};

const p3: iProduct = {
  id: Number.MAX_SAFE_INTEGER - 2,
  title: "C Bikes,Bike Parts",
  desc: "description",
  brand: "",
  categories: ["Bikes","Bike Parts"],
  inventoryQuantity: 3,
  cartQuantity: 0,
  price: 99,
  saleYN: false,
  salesPrice: 499,
  canShipYN: false,
  photoURL: "./128x128.png"
};

const p4: iProduct = {
  id: Number.MAX_SAFE_INTEGER - 1,
  title: "D Bikes,Clothes",
  desc: "description",
  brand: "",
  categories: ["Bikes", "Clothes"],
  inventoryQuantity: 3,
  cartQuantity: 0,
  price: 99,
  saleYN: false,
  salesPrice: 499,
  canShipYN: false,
  photoURL: "./128x128.png"
};

const p5: iProduct = {
  id: Number.MAX_SAFE_INTEGER,
  title: "E baz",
  desc: "description",
  brand: "",
  categories: [""],
  inventoryQuantity: 3,
  cartQuantity: 0,
  price: 99,
  saleYN: false,
  salesPrice: 499,
  canShipYN: false,
  photoURL: "./128x128.png"
};

export const MOCK_PRODUCTS: iProduct[] = [
  p1,
  p2,
  p3,
  p4,
  p5
];