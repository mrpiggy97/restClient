import React from "react"

type MessageProps = {
    key : string
    message : string
}

export default function Message(props : MessageProps) : JSX.Element{
    return(
        <div id={`${props.key}`}>
            <span>{props.message}</span>
        </div>
    )
}