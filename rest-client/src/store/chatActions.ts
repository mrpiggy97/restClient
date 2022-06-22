import { createAction } from "@reduxjs/toolkit"
import {chatResponse} from "../services/chat"
import { ChatState } from "./stateTypes"

export const sendMessageAction = createAction("chat/SEND_MESSAGE",function prepare(response : chatResponse){
    let payload : ChatState = {
        message : response.message,
        uuid : response.uuid
    }
    return {
        payload: payload
    }
})