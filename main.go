package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/julienschmidt/httprouter"
)

type Server struct {
	router *httprouter.Router
}

func (server *Server) ServeHTTP(writer http.ResponseWriter, req *http.Request) {
	fmt.Println("serving")
	server.router.ServeHTTP(writer, req)
}

func NewServer() *Server {
	var router *httprouter.Router = httprouter.New()
	router.ServeFiles("/*filepath", http.Dir("./rest-client/build"))
	return &Server{
		router: router,
	}
}

func main() {
	var appServer *Server = NewServer()
	var port string = os.Getenv("PORT")
	var address string = fmt.Sprintf("0.0.0.0:%v", port)
	fmt.Println("server started listening at adress ", address)
	log.Fatal(http.ListenAndServe(address, appServer))
}
