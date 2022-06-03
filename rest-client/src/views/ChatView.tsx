import React,{ChangeEvent, FormEvent, useEffect, useState} from 'react'
import "./css/ChatView.css"

import chat from '../services/chat'
import Message from "../components/Message"

type chatResponse = {
    message : string
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


export default function ChatView() : JSX.Element{
    const [chatMessage, setChatMessage] = useState("")
    const [messages,setMessages] = useState<Array<string>>([])
    //effects
    const startWebSocketConnection = () : void => {
        let websocktURL = process.env.REACT_APP_WEBSOCKET_API_URL
        if (websocktURL){
           const ws = new WebSocket(`${websocktURL}/ws`)
            ws.onopen = function(){
                console.log("connected to websocket")
            }
            ws.onmessage = function(event){
                console.log(event.data)
                console.log("ws")
                //let newArray : Array<string> = messages
                //newArray.push(event.data)
                //setMessages(newArray)
            }
            ws.onerror = function(event : Event) : void{
                console.log(`error ${event}`)
            }            
        }else{
            throw new Error("failed to load websocket api url")
        }
    }
    //http calls
    const sendMessage = (event : FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        chat(chatMessage)?.then((response) => {
            console.log("common")
            return response.json()
        }).then(() => {
            console.log("message sent successfuly")
        }).catch((error) => {
            console.log(error)
        })
    }

    //update state
    const updateChatMessage = (event : ChangeEvent<HTMLInputElement>) : void => {
        setChatMessage(event.target.value)
    }

    useEffect(startWebSocketConnection,[])
    return(
        <div id='chat-view'>
            <form id="chat-message" onSubmit={sendMessage}>
                <label htmlFor="message">message</label>
                <input type="text" id="message" onChange={updateChatMessage} />
                <button type="submit">send</button>
            </form>
            <div id="messages">
                {messages.map((message) => {
                    return <Message message={message} key={uuid()} />
                })}
            </div>

        </div>
    )
}