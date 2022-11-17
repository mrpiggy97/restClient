import React,{ChangeEvent, FormEvent, useState} from 'react'
import { useAppDispatch } from '../store/dispatcher'
import { loginAction } from '../store/authenticationActions'
import { useNavigate } from 'react-router-dom'
import "./css/Login.css"

export default function LoginView():JSX.Element{
    const dispatcher = useAppDispatch()
    const navigator = useNavigate()
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
        dispatcher(loginAction({email:email,password:password})).then(() => {
            navigator("/chat")
        })
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