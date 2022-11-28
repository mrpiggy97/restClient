import React, {useState} from "react"
import LoginView from "./LoginView"
import SignUpView from "./SignUpView"

import "./css/Auth.css"

export default function AuthView() : JSX.Element{
    const [showLogin, setShowLogin] = useState(true)

    const showSignUpView = () => {
        setShowLogin(false)
    }

    const showLoginView = () => {
        setShowLogin(true)
    }

    return(
        <div id="auth-view">
            <div id="forms">
                {showLogin
                ? <span className="redirect" onClick={showSignUpView}>dont't have an account? click here to sign up</span>
                : <span className="redirect" onClick={showLoginView}>click here to login</span>
                }
            </div>
            <div id="auth">
                {showLogin
                ? <LoginView/>
                : <SignUpView/>
                }
            </div>
        </div>
    )
}