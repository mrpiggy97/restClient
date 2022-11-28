import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { loginAction,logoutAction, signUpAction } from "./authenticationActions";
import {AuthenticationState} from "./stateTypes"

function getAuthenticationState() : AuthenticationState{
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

const initalAuthenticationState : AuthenticationState = getAuthenticationState()

export const authenticationSlice = createSlice({
    name:"authentication",
    initialState:initalAuthenticationState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(loginAction.fulfilled,(state,action) => {
            let newState = getAuthenticationState()
            return {...state,...newState}
        })
        builder.addCase(logoutAction,(state,action) => {
            return {...state,...action.payload}
        })
        builder.addCase(signUpAction.fulfilled,(state,action) => {
            let newState = getAuthenticationState()
            return {...state, ...newState}
        })
    }
})

export default authenticationSlice.reducer