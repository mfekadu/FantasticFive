export interface iFilter {
  type: string;    // brand, category, price, picked
  value: string;   // a value corresponding to a key in an iProduct object
  status: boolean; // to include or not include in filtered array
};

export interface iAllFilters {
  brands : iFilter[], 
  categories : iFilter[],
  prices : iFilter[],
  shipping : iFilter
}

export enum PRICES {
  low = "$0 - $50",
  med = "$51 - $100",
  high = "$101 - $200",
  extra = "$201+"
}

// filter type enum
export enum FT {
  b = 'brand',
  c = 'category',
  p = 'price',
  s = 'shipping'
}

// will display just canShipYN = true
export const CAN_SHIP: iFilter = {
  type   : FT.s,
  value  : FT.s,
  status : true
};

// will display just canShipYN = false
export const PICKUP_ONLY: iFilter = {
  type   : FT.s,
  value  : FT.s,
  status : false
};