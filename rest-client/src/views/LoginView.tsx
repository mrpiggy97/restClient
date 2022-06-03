import React,{ChangeEvent, FormEvent, useState} from 'react'
import {useDispatch} from 'react-redux'
import Cookies from 'js-cookie'
import login from '../services/login'
import actions from '../store/Actions'
import "./css/Login.css"

type LoginResponse = {
    token : string
    expirationDate : number
}

export default function LoginView():JSX.Element{
    const dispatcher = useDispatch()
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
        let response : LoginResponse
        login(email,password)?.then((data) => {
            return data.json()
        }).then((data) => {
            console.log(data)
            response = data
            let expDate : Date = new Date(response.expirationDate)
            Cookies.set("blocher-token",response.token,{expires : expDate})
            Cookies.set("blocher-email",email)
            dispatcher(actions.loginSuccessful(email))
        }).catch((error) => {
            console.log(error)
            dispatcher(actions.loginFailed())
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