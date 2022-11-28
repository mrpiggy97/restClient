import React, {ChangeEvent, FormEvent, FormEventHandler, useState} from "react"
import {signUpAction} from "../store/authenticationActions"
import { useAppDispatch } from "../store/dispatcher"

import "./css/SignUp.css"

export default function SignUpView() : JSX.Element{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatcher = useAppDispatch()

    const updateEmail = (event : ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const updatePassword = (event : ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    
    const makeSignUp = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatcher(signUpAction({email: email, password:password})).then(() => {
            console.log("sign up made")
        })
    }

    return (
        <div id="signup-view">
            <h1>please sign up to begin chat</h1>
            <form id="signup-form" onSubmit={makeSignUp}>
                <label htmlFor="email">email</label>
                <input type="text" max-length="255" id="email" className="fields" onChange={updateEmail}/>
                <label htmlFor="password">password</label>
                <input type="text" max-length="255" id="password" className="fields" onChange={updatePassword}/>
                <button id="signup-button" className="auth" type="submit">Sign up</button>
            </form>
        </div>
    )
}