
type AppState = {
    Authenticated : boolean
    Email : string
}

type Action = {
    type : string
    payload : AppState
}

const initialState : AppState = {
    Authenticated : false,
    Email : ""
}

export default function Reducer(state : AppState = initialState,action : Action){
    switch(action.type){
        case "LOGIN_SUCCESSFUL":
            return {...state,...action.payload}
        case "LOGIN_FAILED":
            return state
        default:
            return state
    }
}

export type{AppState,Action}
export {initialState}