import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import { supabase } from "../lib/supabaseClient";

const initialState = {
    userData:[]
}

export const getUserData=createAsyncThunk('getUserData',async (jwt)=>{
    try {
        const { data: { user } } = await supabase.auth.getUser(jwt);

        if (user){
            return user;
        }

    } catch (error) {
        throw new Error("Kullanıcı Bilgileri Çekilirken bir hata oluştu: " + error.message);
    }
})

export const user = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getUserData.fulfilled,(state,action)=>{
            state.userData=action.payload;
        })
    }
});

export default user.reducer;