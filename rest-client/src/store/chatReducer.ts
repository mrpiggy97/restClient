import { createSlice } from "@reduxjs/toolkit";
import { ChatState } from "./stateTypes";
import { sendMessageAction } from "./chatActions";

const initialState : ChatState = {
    message : ""
}

const chatSlice = createSlice({
    name:"chat",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(sendMessageAction,(state,action) => {
            console.log("message fullfiled")
            return {...state}
        })
    }
})

export default chatSlice.reducer