export interface iProduct {
  id: number;
  title: string;
  desc: string;
  brand: string;
  categories: string[];
  quantity: number;
  price: number;
  saleYN: boolean;
  salesPrice: number;
  canShipYN: boolean;
  photoURL: string;
}