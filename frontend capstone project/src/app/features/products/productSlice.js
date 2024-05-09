import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products : [{
        id: 1,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Nike Kwanza",
        description: "A pair of basketball shoes, has midtop style, lace-up",
        price: 60,
        itemRemaining: 2
    },
    {
        id: 2,
        image: "https://plus.unsplash.com/premium_photo-1663127429325-3acefe582da5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Nike Kwanza",
        description: "A pair of basketball shoes, has midtop style, lace-up",
        price: 60,
        itemRemaining: 23
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Nike Kwanza",
        description: "A pair of basketball shoes, has midtop style, lace-up",
        price: 60,
        itemRemaining: 23
    }]
}

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers: {
        addProduct:(state,action)=>{
            state.products.push(action.product)
        },
        decreaseProductCount:(state,action)=>{
            state.products[action.payload.index].itemRemaining -= action.payload.itemBuy
        }
    }
})

export default productSlice.reducer;
export const { addProduct , decreaseProductCount} = productSlice.actions;

