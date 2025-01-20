import { atom } from "recoil";

export type MenuItem = {
    name: string
    price: number
    quantity : number 
    description: string
}
  
export type CartItem = MenuItem & { quantity: number }
  

export const cartOfTable1 = atom<CartItem[]>({
    key: 'cartOfTable1',
    default: [],
});
  
export const cartOfTable2 = atom<CartItem[]>({
    key: 'cartOfTable2',
    default: [],
});


export const cartOfTable3 = atom<CartItem[]>({
    key: 'cartOfTable3',
    default: [],
});


export const cartOfTable4 = atom<CartItem[]>({
    key: 'cartOfTable4',
    default: [],
});

export const cartOfTable5 = atom<CartItem[]>({
    key: 'cartOfTable5',
    default: [],
});


export const cartOfTable6 = atom<CartItem[]>({
    key: 'cartOfTable6',
    default: [],
});