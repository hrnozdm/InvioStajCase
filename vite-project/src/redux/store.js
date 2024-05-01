import {configureStore} from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import UserSlice from "./UserSlice";
import CartSlice from "./CartSlice";


export const store = configureStore({
    reducer:{
        product:ProductSlice,
        user:UserSlice,
        cart:CartSlice
    }
});