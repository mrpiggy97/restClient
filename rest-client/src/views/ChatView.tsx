import React,{ChangeEvent, FormEvent, MouseEvent, useEffect, useState} from 'react'
import "./css/ChatView.css"

import chat from '../services/chat'
import Message from "../components/Message"
import {useAppSelector} from "../store/selector"
import {useAppDispatch} from "../store/dispatcher"
import {logoutAction} from "../store/authenticationActions"

type chatResponse = {
    message : string
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


export default function ChatView() : JSX.Element{
    const [chatMessage, setChatMessage] = useState("")
    const [messages,setMessages] = useState<Array<string>>([])
    let userIsAuthenticated = useAppSelector((state) => state.authentication.authenticated)
    let dispatcher = useAppDispatch()
    //http calls

    //update state
    const updateChatMessage = (event : ChangeEvent<HTMLInputElement>) : void => {
        setChatMessage(event.target.value)
    }

    //update store
    const logout = (event : MouseEvent) => {
        event.preventDefault()
        dispatcher(logoutAction())
    }

    useEffect(() => {
        console.log(`chat says user is authenticated? ${userIsAuthenticated}`)
    },[])
    if(userIsAuthenticated === true){
        return(
            <div id='chat-view'>
                <span onClick={logout}>logout</span>
                <form id="chat-message">
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
    return(
        <div>
            <span>please login</span>
        </div>
    )
}