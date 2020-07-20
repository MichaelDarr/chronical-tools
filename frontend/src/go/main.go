package main

import (
	"github.com/MichaelDarr/chronicle-app/frontend/src/go/internal"
)

func main() {
	c := make(chan bool)
	internal.Bind()
	<-c
}
