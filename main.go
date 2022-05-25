package main

import (
	"fmt"
	"log"
	"net/http"

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
	router.ServeFiles("/*filepath", http.Dir("./public"))
	return &Server{
		router: router,
	}
}

func main() {
	var appServer *Server = NewServer()
	log.Fatal(http.ListenAndServe("0.0.0.0:8000", appServer))
}
