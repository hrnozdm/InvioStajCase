import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import { message } from "antd";
import { supabase } from "../lib/supabaseClient";


const initialState={
    productsData:[]
}


export const getAllProduct = createAsyncThunk('getAllProduct',async ()=>{

    try {
       const { data, error } = await supabase.from('products').select();
       if (error){
         return message.error("Kayıt Bulunamadı");
       }
 
       if (data){
         return data;
       }
    } catch (error) {
      throw new Error("Ürün Çekilirken bir hata oluştu: " + error.message);
       
    }
 
 });


export const addProduct = createAsyncThunk('addProduct',async (values)=>{

    try {
        const {data, error} = await supabase.from('products').insert({name: values.name,price:values.price});
        if (error){
          return message.error('Kayıt yapılamadı');
        }
        
        getAllProduct();   
        message.success("Kayıt Başarılı");
        
        
        
       } catch (error) {
        throw new Error("Ürün Eklenirken bir hata oluştu: " + error.message);
       }

});


export const deleteProduct = createAsyncThunk('deleteProduct',async (productId)=>{

  try {
    const { error } = await supabase.from('products').delete().eq('id', productId);

    if (error){
      return message.success("Ürün Silme İşlemi Başarısız");
    }
    
    getAllProduct();
    message.success("Ürün Silme İşlemi Başarılı");
  
     } catch (error) {
      throw new Error("Ürün Silinirken bir hata oluştu: " + error.message);
     }

});


export const product = createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addProduct.fulfilled,(state,action)=>{
            state.productsData=action.payload;
        });

        builder.addCase(getAllProduct.fulfilled,(state,action)=>{
            state.productsData=action.payload;
        });
        
        builder.addCase(deleteProduct.fulfilled,(state,action)=>{
          state.productsData = state.productsData.filter(product => product.id !== action.meta.arg);
        });
       


    }
});


export default product.reducer;