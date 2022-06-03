
const actions = {
    loginSuccessful(email : string){
        return {type : "LOGIN_SUCCESSFUL", payload : {Email : email,Authenticated : true}}
    },
    loginFailed(){
        return {type : "LOGIN_FAILED",payload : {email : "",authenticated : false}}
    }
}

export default actions