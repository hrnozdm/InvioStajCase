import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../lib/supabaseClient";

const initialState = {
  salesProduct: []
}

export const productSales = createAsyncThunk('productSales', async (products) => {
    const salesResults = [];
    try {
        for (const product of products) {
            const { data, error } = await supabase.from('sales').insert({
                created_at: product.selectedDate.toISOString(), 
                product_id: product.id,
                count: product.count
            });

            if (!error) {
                salesResults.push({ success: true, message: "Ürün Satışa Çıkarıldı", product: product });
                
            } else {
                salesResults.push({ success: false, message: "Ürün Satışa Çıkarılamadı", product: product });
            }
        }
    } catch (error) {
        throw new Error("Bir hata oluştu: " + error.message);
    }
    return salesResults;
  }
);

export const sales = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productSales.fulfilled, (state, action) => {
      action.payload.forEach(result => {
        state.salesProduct.push(result);
      });
    })
  }
});

export default sales.reducer;
