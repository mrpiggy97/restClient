import { createAsyncThunk,createAction } from "@reduxjs/toolkit"
import login,{loginResponse} from "../services/login"
import SignUp,{signUpResponse} from "../services/signup"
import Cookies from "js-cookie"
import { AuthenticationState } from "./stateTypes"

export type authData = {
    email : string,
    password : string
}

export type messageData = {
    message : string
}

export const loginAction = createAsyncThunk("authentication/LOGIN",async(data : authData) => {
    let response = await login(data.email,data.password)
    let jsonResponse : loginResponse = await response?.json() as loginResponse
    Cookies.set("blocher-token",jsonResponse.token,{expires:jsonResponse.ExpirationDate})
    Cookies.set("blocher-email",data.email,{expires:jsonResponse.ExpirationDate})
    return jsonResponse
})

export const signUpAction = createAsyncThunk("authentication/SIGNUP", async(data : authData) => {
    console.log("signing up")
    let response = await SignUp(data.email,data.password)
    let jsonResponse : signUpResponse = await response?.json() as signUpResponse
    console.log(jsonResponse)
    Cookies.set("blocher-token", jsonResponse.token,{expires:jsonResponse.expirationDate})
    Cookies.set("blocher-email", data.email,{expires : jsonResponse.expirationDate})
    return jsonResponse
})

export const logoutAction = createAction("authentication/LOGOUT",function prepare() {
    console.log("logging out")
    Cookies.remove("blocher-token")
    Cookies.remove("blocher-email")
    let payloadReturn : AuthenticationState = {
        authenticated : false,
        email : ""
    }
    return {
        payload : payloadReturn
    }
})