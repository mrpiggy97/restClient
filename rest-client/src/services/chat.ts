import Cookies from "js-cookie"

export type chatRequest = {
    message : string
}

export default function chat(request : chatRequest){
    let apiUrl : string | undefined = process.env.REACT_APP_HTTP_API_URL
    if (apiUrl){
        let headers : Headers = new Headers()
        headers.append("Content-type","application/json")
        let token : string | undefined = Cookies.get("blocher-token")
        if(token){
            headers.append("Authorization",token)
            return fetch(`${apiUrl}/chat`,{
                method : "POST",
                headers : headers,
                body : JSON.stringify({
                    message : request.message
                })
            })            
        }else{
            throw new Error("error getting token from cookie")
        }
    }
}