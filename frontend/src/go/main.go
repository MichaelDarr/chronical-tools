package main

import (
	"syscall/js"

	"github.com/MichaelDarr/chronicle-app/frontend/src/go/internal"
)

func main() {
	c := make(chan bool)
	js.Global().Set("DemoFight", js.FuncOf(internal.DemoFight))
	<-c
}
