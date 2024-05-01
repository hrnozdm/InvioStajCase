import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
   cartItems:[],
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
       
        resetCart:(state,action)=>{
           state.cartItems=[];
        },

        addToCart: (state, action) => {
            const newItem = { ...action.payload, count: 1 };
            const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);
            if (existingItemIndex !== -1) {
                state.cartItems[existingItemIndex].count++;
                message.success("Ürün Sepete Eklendi");
            } else {
                state.cartItems.push(newItem);
                message.success("Ürün Sepete Eklendi");
            }
        },
        

        removeFromCart:(state,action) =>{
            state.cartItems= state.cartItems.filter((item) => item.id !== action.payload.id);
        },

        updateItemCount: (state, action) => {
            const { id, count } = action.payload;
            const itemToUpdate = state.cartItems.find(item => item.id === id);
            if (itemToUpdate) {
                if (count > 0) {
                    itemToUpdate.count = count;
                } else {
                    state.cartItems = state.cartItems.filter(item => item.id !== id);
                }
            }
        }
    },
});

export const { addToCart, removeFromCart, updateItemCount,resetCart} = cartSlice.actions;

export default cartSlice.reducer;
