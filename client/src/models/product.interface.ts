export interface iProduct {
  id: number;
  title: string;
  desc: string;
  brand: string;
  categories: string[];
  inventoryQuantity: number;
  cartQuantity: number;
  price: number;
  saleYN: boolean;
  salesPrice: number;
  canShipYN: boolean;
  photoURL: string;
}

export const createEmptyProduct = function() {
  const foo : iProduct = {
    id: 0,
    title: "foo",
    desc: "foo",
    brand: "foo",
    categories: ["foo"],
    inventoryQuantity: 0,
    cartQuantity: 0,
    price: 0,
    saleYN: false,
    salesPrice: 0,
    canShipYN: false,
    photoURL: "foo"
  }
  return foo;
}