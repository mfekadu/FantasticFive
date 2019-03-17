import { Brand } from "./brand.interface";
import { Category } from "./category.interface";

export interface iProduct {
  id: number;
  title: string;
  desc: string;
  brand: Brand;
  categories: Category[];
  stock: number;
  cartQuantity: number;
  price: number;
  saleYN: boolean;
  salesPrice: number;
  canShipYN: boolean;
  photoURL: string;
}