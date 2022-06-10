import { createAsyncThunk } from "@reduxjs/toolkit"
import chat,{chatRequest} from "../services/chat"

export const sendMessageAction = createAsyncThunk("chat/SEND_MESSAGE",async(request : chatRequest) => {
    let response = await chat(request)
    let jsonResponse = await response?.json()
    console.log(jsonResponse)
    return jsonResponse
})