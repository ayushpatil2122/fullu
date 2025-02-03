import { create } from "zustand";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: { [tableNumber: number]: CartItem[] };
  totalItems: number;
  addToCart: (item: CartItem, tableNumber: number) => void;
  updateQuantity: (name: string, tableNumber: number, quantity: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: {},
  totalItems: 0,
  addToCart: (item, tableNumber) =>
    set((state) => {
      const tableItems = state.items[tableNumber] || [];
      const existingItem = tableItems.find((i) => i.name === item.name);

      let newTotalItems = state.totalItems;

      // Only increment totalItems if the dish is new (not already in the cart)
      if (!existingItem) {
        newTotalItems += 1; // Increment by 1 for a new dish
      }

      return {
        items: {
          ...state.items,
          [tableNumber]: existingItem
            ? tableItems.map((i) =>
                i.name === item.name ? { ...i, quantity: i.quantity + item.quantity } : i
              )
            : [...tableItems, item],
        },
        totalItems: newTotalItems,
      };
    }),
  updateQuantity: (name, tableNumber, quantity) =>
    set((state) => {
      const tableItems = state.items[tableNumber] || [];
      const existingItem = tableItems.find((i) => i.name === name);

      if (!existingItem) return state;

      // Update the quantity without changing totalItems
      return {
        items: {
          ...state.items,
          [tableNumber]: tableItems.map((i) =>
            i.name === name ? { ...i, quantity } : i
          ),
        },
        totalItems: state.totalItems, // No change to totalItems
      };
    }),
}));