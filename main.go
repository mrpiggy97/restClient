package main

import (
	"context"
	"fmt"
	"net/http"
	"sync"

	"github.com/julienschmidt/httprouter"
	"github.com/mrpiggy97/rest/server"
)

type Server struct {
	router    *httprouter.Router
	apiServer *server.Server
}

func (server *Server) ServeHTTP(writer http.ResponseWriter, req *http.Request) {
	fmt.Println("serving")
	server.router.ServeHTTP(writer, req)
}

func NewServer() *Server {
	var router *httprouter.Router = httprouter.New()
	router.ServeFiles("/*filepath", http.Dir("./public"))
	apiServer, _ := server.NewServer(context.Background())
	return &Server{
		router:    router,
		apiServer: apiServer,
	}
}

func main() {
	//var appServer *Server = NewServer()
	//log.Fatal(http.ListenAndServe("0.0.0.0:8000", appServer))
	var waiter *sync.WaitGroup = new(sync.WaitGroup)
	waiter.Add(1)
	go server.Runserver()
	waiter.Wait()
}
