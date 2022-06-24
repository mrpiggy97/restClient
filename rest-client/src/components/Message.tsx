import React from "react"

import "./css/Message.css"

type MessageProps = {
    message : string
}

export default function Message(props : MessageProps) : JSX.Element{
    return(
        <div className="message">
            <span>{props.message}</span>
        </div>
    )
}