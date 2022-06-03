import Cookies from "js-cookie"

export default function chat(message : string){
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
                    message : message
                })
            })            
        }else{
            throw new Error("error getting token from cookie")
        }
    }
}