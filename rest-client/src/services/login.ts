

export type loginResponse = {
    token : string
    ExpirationDate : number
}

export default function login(email : string, password : string){
    if (email.length === 0){
        throw new Error("email cannot be blank")
    }
    if (password.length === 0){
        throw new Error("password cannot be blank")
    }

    let apiUrl : string | undefined = process.env.REACT_APP_HTTP_API_URL
    if (apiUrl){
        return fetch(`${apiUrl}/login`,{
            method : "POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                email : email,
                password : password
            })
        })
    }
}