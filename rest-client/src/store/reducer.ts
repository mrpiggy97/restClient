import { createAsyncThunk,createSlice,PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import login from "../services/login"

export type loginData = {
    email : string,
    password : string
}

export type AppState = {
    authenticated : boolean
    email : string
}

function getInitialState() : AppState{
    let token = Cookies.get("blocher-token")
    let email = Cookies.get("blocher-email")
    if(token && email){
        return {
            authenticated : true,
            email : email
        }
    }else{
        return {
            authenticated : false,
            email : ""
        }
    }
}

const initialState : AppState = getInitialState()

export const loginAction = createAsyncThunk("authentication/LOGIN",async(data : loginData) => {
    let response = await login(data.email,data.password)
    let jsonResponse = await response?.json()
    return jsonResponse
})

export const authenticationSlice = createSlice({
    name:"authentication",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(loginAction.fulfilled,(state,action) => {
            console.log(action)
        })
    }
})

export default authenticationSlice.reducer