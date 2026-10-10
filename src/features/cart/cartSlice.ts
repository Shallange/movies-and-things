import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "./cartTypes";

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (
      state,
      action: PayloadAction<{ id: number; productType: "movie" | "poster" }>,
    ) => {
      const index = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.productType === action.payload.productType,
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
