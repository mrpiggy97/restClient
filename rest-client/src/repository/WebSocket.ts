export default class WebSocketConnection{
    constructor(){
    }
    public static startWebSocketConnection() : void {
        let websocktURL = process.env.REACT_APP_WEBSOCKET_API_URL
        const ws = new WebSocket(`${websocktURL}/ws`)
        ws.onopen = function(){
            console.log("connected to websocket man")
        }
        ws.onmessage = function(event) : void{
            console.log(event.data)
        }
        ws.onerror = function(event : Event) : void{
            console.log(`error ${event}`)
        }            
    }
}