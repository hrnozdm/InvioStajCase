import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../lib/supabaseClient";

const initialState={
    analysisData:[],
}

export const getAnalysis =createAsyncThunk('analysisData',async ()=>{
    try {
        //const { data, error } = await supabase.rpc('getallsalesbydate');
        const { data, error } = await supabase.from('sales').select();
        if (data){
           console.log(data);
           return data;
        }
    } catch (error) {
        throw new Error("Bir hata oluştu: " + error.message);
    }

});


export const analysis=createSlice({
    name:'analysis',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
     builder.addCase(getAnalysis.fulfilled,(state,action)=>{
      state.analysisData=action.payload;
    })
    }
});

export default analysis.reducer;


