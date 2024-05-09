import userSlice from "./features/users/userSlice";
import productSlice from "./features/products/productSlice";
import cartSlice from "./features/cart/cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

const store = configureStore({
    reducer: {
        userSlice,
        productSlice,
        cartSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
