import { createAsyncThunk,createAction } from "@reduxjs/toolkit"
import chat,{chatRequest} from "../services/chat"
import { ChatState,AuthenticationState } from "./stateTypes"
import Cookies from "js-cookie"

export const sendMessageAction = createAction("chat/SEND_MESSAGE",function prepare(response){
    console.log(response)
    let payload : ChatState = {
        message : ""
    }
    return {
        payload: payload
    }
})