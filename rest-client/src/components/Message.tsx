import React from "react"

type MessageProps = {
    message : string
}

export default function Message(props : MessageProps) : JSX.Element{
    return(
        <div>
            <span>{props.message}</span>
        </div>
    )
}