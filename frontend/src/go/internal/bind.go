package internal

import (
	"fmt"
	"syscall/js"
)

// Logger is a generic message logger
type Logger interface {
	Log(string)
}

// JSLogger wraps a JS logging function.
type JSLogger struct {
	logFunc js.Value
}

// Log logs a string to JS.
func (logger *JSLogger) Log(message string) {
	logger.logFunc.Invoke(message)
}

// GetJSLogger generates a JS logger from a passed logger function.
func GetJSLogger(logFunc js.Value) *JSLogger {
	return &JSLogger{
		logFunc: logFunc,
	}
}

func extractPlayerArg(arg js.Value) *Player {
	return &Player{
		Damage:  arg.Get("damage").Int(),
		Defense: arg.Get("defense").Int(),
		Dodge:   arg.Get("dodge").Int(),
		Health:  arg.Get("health").Int(),
		Hit:     arg.Get("hit").Int(),
		Keep:    arg.Get("keep").Int(),
		Name:    arg.Get("name").String(),
	}
}

func jsFight(this js.Value, args []js.Value) interface{} {
	playerOne := extractPlayerArg(args[0])
	playerTwo := extractPlayerArg(args[1])
	logger := GetJSLogger(args[2])

	playerOne, playerTwo, fightData, err := Fight(playerOne, playerTwo, logger)
	if err != nil {
		logger.Log(fmt.Sprint("Error attacking player: ", err))
	}
	var winningPlayer string
	if fightData.PlayerOneData.Won {
		winningPlayer = "Player One"
	}
	if fightData.PlayerTwoData.Won {
		winningPlayer = "Player Two"
	}
	logger.Log(fmt.Sprint(winningPlayer, " wins!"))
	return js.ValueOf(winningPlayer)
}

// Bind binds internal functions the global JS context.
func Bind() {
	js.Global().Set("Fight", js.FuncOf(jsFight))
}
