import { createSlice } from "@reduxjs/toolkit";
import { ChatState } from "./stateTypes";
import { sendMessageAction } from "./chatActions";

const initialState : ChatState = {
    message : "",
    uuid:""
}

const chatSlice = createSlice({
    name:"chat",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(sendMessageAction,(state,action) => {
            console.log("message fullfiled")
            return {...state,...action.payload}
        })
    }
})

export default chatSlice.reducer