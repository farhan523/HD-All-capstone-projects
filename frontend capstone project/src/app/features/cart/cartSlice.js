import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: {
        open: false,
        totalPrice: 0,
        totalItems: 0,
        products: []
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const existingProductIndex = state.cart.products.findIndex((product) => product.id === action.payload.id);

            if (existingProductIndex !== -1) {
                const existingProduct = state.cart.products[existingProductIndex];
                state.cart.totalPrice -= existingProduct.quantity * existingProduct.price;
                state.cart.totalItems -= existingProduct.quantity;
                existingProduct.quantity = action.payload.quantity;
                state.cart.totalPrice += existingProduct.quantity * existingProduct.price;
                state.cart.totalItems += existingProduct.quantity;
            } else {
                state.cart.products.push(action.payload);
                state.cart.totalPrice += action.payload.quantity * action.payload.price;
                state.cart.totalItems += action.payload.quantity;
            }
        },
        toggleCart: (state, action) => {
            state.cart.open = !state.cart.open;
        }
    }
});

export default cartSlice.reducer;
export const { addProduct, toggleCart } = cartSlice.actions;
