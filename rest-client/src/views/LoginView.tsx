import React,{ChangeEvent, FormEvent, useState} from 'react'
import Cookies from 'js-cookie'
import { useAppDispatch } from '../store/Dispatcher'
import { loginAction } from '../store/reducer'
import "./css/Login.css"

type LoginResponse = {
    token : string
    expirationDate : number
}

export default function LoginView():JSX.Element{
    const dispatcher = useAppDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const updateEmail = (event : ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const updatePassword = (event : ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const makeLogin = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatcher(loginAction({email:email,password:password}))
    }
    return(
        <div id="login-view">
            <h1>please login to begin chat</h1>
            <form id="login-form" onSubmit={makeLogin}>
                <label htmlFor="email">email</label>
                <input type="text" max-length="255" id="email" onChange={updateEmail}/>
                <label htmlFor="password">password</label>
                <input type="text" max-length="255" id="password" onChange={updatePassword}/>
                <button type="submit">login</button>
            </form>
        </div>
    )
}