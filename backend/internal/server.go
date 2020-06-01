package internal

import (
	"fmt"
	"net/http"
	"os"
)

func Serve() {
	http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "world")
	})

	portString := fmt.Sprintf(":%s", os.Getenv("PORT"))
	http.ListenAndServe(portString, nil)
}
