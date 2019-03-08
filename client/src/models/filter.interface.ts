export interface iFilter {
  type: string;    // brand, category, price, picked
  value: string;   // a value corresponding to a key in an iProduct object
  status: boolean; // to include or not include in filtered array
};

// filter type enum
export enum FT {
  br = 'brand',
  ca = 'category',
  pr = 'price',
  pi = 'pickup'
}

export const YES_PICKUP: iFilter = {type:'pickup', value:'pickup',status:true};
export const NO_PICKUP: iFilter = {type:'pickup', value:'pickup',status:false};