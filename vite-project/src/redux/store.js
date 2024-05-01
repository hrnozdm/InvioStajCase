import {configureStore} from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import UserSlice from "./UserSlice";
import CartSlice from "./CartSlice";
import SalesSlice from "./SalesSlice";
import AnalysisSlice from "./AnalysisSlice";

export const store = configureStore({
    reducer:{
        product: ProductSlice,
        user: UserSlice,
        cart: CartSlice,
        sales: SalesSlice,
        analysis:AnalysisSlice
    }
});
