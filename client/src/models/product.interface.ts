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
