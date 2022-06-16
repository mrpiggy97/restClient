import { AppDispatch } from "../store/store"
//import { useAppDispatch } from "../store/dispatcher"
import store from "../store/store"
import { sendMessageAction } from "../store/chatActions"
import { chatRequest } from "../services/chat"
import { time } from "console"

var ws : WebSocket

export default function WebSocketConnection() : void {
    let websocktURL = "ws://localhost:5050"
    ws = new WebSocket(`${websocktURL}/ws`)
    ws.onopen = function(){
        console.log("connected to websocket man")
    }
    ws.onmessage = function(event) : void{
        let request : chatRequest = {
            message : event.data
        }
        store.dispatch(sendMessageAction(request))
        console.log(event.data)
    }
    ws.onerror = function(event : Event) : void{
        ws.close()
        console.log(`error ${event}`)
    }

    ws.onclose = function(event):void{
        console.log("websocket connection closed")
    }
}

export function CloseWebSocket():void{
    ws.close()
}