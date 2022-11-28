import React,{ChangeEvent, FormEvent, MouseEvent, useEffect, useState} from 'react'
import "./css/ChatView.css"

import Message from "../components/Message"
import {useAppSelector} from "../store/selector"
import {useAppDispatch} from "../store/dispatcher"
import {logoutAction} from "../store/authenticationActions"
import chat,{chatRequest,chatResponse} from "../services/chat"
import {sendMessageAction} from "../store/chatActions"

export default function ChatView() : JSX.Element{
    const [chatMessage, setChatMessage] = useState("")
    const currentMessage : chatResponse = useAppSelector((state) => state.chat)
    const [messages,setMessages] = useState<Array<chatResponse>>([])
    let userIsAuthenticated = useAppSelector((state) => state.authentication.authenticated)
    let dispatcher = useAppDispatch()
    let ws : WebSocket

    //update state
    const updateChatMessage = (event : ChangeEvent<HTMLInputElement>) : void => {
        setChatMessage(event.target.value)
    }

    //update store
    const logout = (event : MouseEvent) => {
        event.preventDefault()
        dispatcher(logoutAction())
    }

    const sendMessage = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            let request : chatRequest = {
                message : chatMessage
            }
            await chat(request)
            let element : HTMLFormElement = document.getElementById("chat-message") as HTMLFormElement
            element.reset()
        } catch (error) {
            console.log(error)
        }
    }
    // when component mounts we start websocket connection
    useEffect(() => {
        ws = new WebSocket("ws://localhost:5050/ws")
        ws.onopen = function(){
            console.log("connected to websocket")
        }
        ws.onmessage = function(event) : void{
            console.log(event.data)
            let decodedData : chatResponse = JSON.parse(event.data)
            console.log(decodedData.message)
            let response : chatResponse = {
                message : decodedData.message,
                uuid : decodedData.uuid
            }
            dispatcher(sendMessageAction(response))
            console.log(event.data)
        }
        ws.onerror = function(event : Event) : void{
            ws.close()
            console.log(`error ${event}`)
        }

        ws.onclose = function(event):void{
            console.log("websocket connection closed")
        }
        return () => {
            ws.close()
            console.log("websocket closed")
        }
    },[])

    //when store is updated we push that value to messages array
    useEffect(() => {
        console.log(`current message ${currentMessage.message}`)
        if (currentMessage.message.length > 0){
            let arrayClone : Array<chatResponse> = messages.slice()
            arrayClone.push(currentMessage)
            setMessages(arrayClone)            
        }
    },[currentMessage])
    
    if(userIsAuthenticated === true){
        return(
            <div id='chat-view'>
                <form id="chat-message" onSubmit={sendMessage}>
                    <span onClick={logout}>logout</span>
                    <label htmlFor="message">write your message below</label>
                    <input type="text" id="message" onChange={updateChatMessage}/>
                    <button id="chat" type="submit">Send</button>
                </form>
                <div id="messages">
                    {messages.map((message) => {
                        return <Message message={message.message} key={message.uuid} />
                    })}
                </div>
            </div>
        )        
    }
    return(
        <div>
            <span>please login</span>
        </div>
    )
}