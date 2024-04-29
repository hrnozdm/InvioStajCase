import {configureStore} from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import UserSlice from "./UserSlice";


export const store = configureStore({
    reducer:{
        product:ProductSlice,
        user:UserSlice
    }
});