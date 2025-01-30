import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: { [tableNumber: number]: CartItem[] };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ item: CartItem; tableNumber: number }>) => {
      const { item, tableNumber } = action.payload;
      if (!state.items[tableNumber]) {
        state.items[tableNumber] = [];
      }
      const existingItem = state.items[tableNumber].find(i => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items[tableNumber].push(item);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ name: string; tableNumber: number }>) => {
      const { name, tableNumber } = action.payload;
      if (state.items[tableNumber]) {
        state.items[tableNumber] = state.items[tableNumber].filter(item => item.name !== name);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ name: string; tableNumber: number; quantity: number }>) => {
      const { name, tableNumber, quantity } = action.payload;
      const item = state.items[tableNumber]?.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state, action: PayloadAction<number>) => {
      const tableNumber = action.payload;
      state.items[tableNumber] = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
