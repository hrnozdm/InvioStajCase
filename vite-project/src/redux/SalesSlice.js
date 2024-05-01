import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { supabase } from "../lib/supabaseClient";
import { message } from "antd";


const initialState={
    salesProduct:[]
}

export const productSales=createAsyncThunk('productSales',async(product)=>{
    try {
        const { error } = await supabase.from('sales').insert({product_id:product.id,count:product.count});
        if (error){
           return message.error("Ürün Satın Alınamadı");
        }
        
        return message.success("Sipariş Başarıyla Alındı");

    } catch (error) {
        message.error('Başarısız İşlem')
    }
});


export const sales = createSlice({
    name:'sales',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(productSales.fulfilled,(state,action)=>{
            state.userData=action.payload;
        })
    }
});

export default user.reducer;

