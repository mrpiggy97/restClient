import {createReducer,createAction} from "@reduxjs/toolkit"
import Cookies from "js-cookie"

type AppState = {
    Authenticated : boolean
    Email : string
}

type Action = {
    type : string
    payload : AppState
}

function getInitialState() : AppState{
    let token : string | undefined = Cookies.get("blocher-token")
    let email : string | undefined = Cookies.get("blocher-email")
    if(token && email){
        return {
            Authenticated : true,
            Email : email,
        }
    }else{
        return {
            Authenticated : false,
            Email : ""
        }
    }
}

const initialState : AppState = getInitialState()

export default function Reducer(state : AppState = initialState,action : Action) : AppState{
    switch(action.type){
        case "LOGIN_SUCCESSFUL":
            return {...state,...action.payload}
        case "LOGIN_FAILED":
            return state
        default:
            return state
    }
}


const loginSuccessful = createAction<AppState>("LOGIN_SUCCESSFUL")
const loginFailed = createAction<AppState>("LOGIN_FAILED")

const AuthReducer = createReducer(initialState, (builder) => {
    builder.addCase(loginSuccessful,(state : AppState,action : Action) => {
        state.Authenticated = action.payload.Authenticated
        state.Email = action.payload.Email
    }).addCase(loginFailed,(state : AppState,action : Action) => {
        state.Authenticated = false
        state.Email = ""
    })
})

export type{AppState,Action}
export {initialState, AuthReducer}