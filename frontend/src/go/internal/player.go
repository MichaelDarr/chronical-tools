package internal

import (
	"fmt"
	"math"

	"github.com/MichaelDarr/chronicle-app/frontend/src/go/pkg/die"
)

// Player is a single Chronicle character
// keep
// | 0		| lower		|
// | 1		| middle	|
// | 2		| highest	|
type Player struct {
	Damage  int
	Defense int
	Dodge   int
	Health  int
	Hit     int
	Keep    int
	Name    string
}

type AttackData struct {
	Dodged      bool
	BonusDamage int
	TotalDamage int
	TotalDodge  int
}

type PlayerFightData struct {
	Player *Player
	Dodges []int
	Hits   []int
	Turns  int
	Won    bool
}

type FightData struct {
	Rounds        int
	Turns         int
	PlayerOneData *PlayerFightData
	PlayerTwoData *PlayerFightData
}

func (player *Player) Clone() *Player {
	playerClone := new(Player)
	*playerClone = *player
	return playerClone
}

func (attacker *Player) Attack(target *Player) (updatedTarget *Player, data *AttackData, err error) {
	updatedTarget = target.Clone()
	data = new(AttackData)

	initialDodge := die.D6().SumHighestRolls(3, 2)
	data.TotalDodge = initialDodge + target.Dodge
	if data.TotalDodge >= attacker.Hit {
		data.Dodged = true
		return
	}
	initialDamage := attacker.Damage
	data.BonusDamage, err = attacker.KeepRoll(die.D6(), 3)
	if err != nil {
		return
	}
	data.TotalDamage = initialDamage + data.BonusDamage
	if data.TotalDamage >= target.Health {
		updatedTarget.Health = 0
	} else {
		updatedTarget.Health -= data.TotalDamage
	}
	return
}

func (player *Player) IsAlive() bool {
	return player.Health > 0
}

func (player *Player) KeepRoll(die *die.Die, rollCount int) (int, error) {
	rollVals := die.RollMany(rollCount)
	switch player.Keep {
	case 0:
		return rollVals[0], nil
	case 1:
		midRollIdx := float64(len(rollVals)) / 2
		return rollVals[int(math.Ceil(midRollIdx))], nil
	case 2:
		return rollVals[len(rollVals)-1], nil
	}
	return 0, fmt.Errorf("Invalid player keep value: %d", player.Keep)
}

// Fight pits two players against each other to the death.
func Fight(playerOne *Player, playerTwo *Player, logger Logger) (updatedPlayerOne *Player, updatedPlayerTwo *Player, data *FightData, err error) {
	fmt.Println(playerOne)
	fmt.Println(playerTwo)
	updatedPlayerOne = playerOne.Clone()
	updatedPlayerTwo = playerTwo.Clone()
	data = &FightData{
		PlayerOneData: &PlayerFightData{Player: updatedPlayerOne},
		PlayerTwoData: &PlayerFightData{Player: updatedPlayerTwo},
	}

	attacker := data.PlayerOneData
	target := data.PlayerTwoData
	var attackData *AttackData
	var updatedTarget *Player
	for attacker.Player.IsAlive() && target.Player.IsAlive() {
		updatedTarget, attackData, err = attacker.Player.Attack(target.Player)
		*target.Player = *updatedTarget
		if err != nil {
			return
		}
		attacker.Turns += 1
		attacker.Dodges = append(attacker.Dodges, attackData.TotalDodge)
		if !attackData.Dodged {
			attacker.Hits = append(attacker.Hits, attackData.TotalDamage)
			logger.Log(fmt.Sprint(attacker.Player.Name, " attack: ", attackData.TotalDamage, " (", target.Player.Name, " dodge ", attackData.TotalDodge, ")"))
		} else {
			logger.Log(fmt.Sprint(attacker.Player.Name, " attack: miss (", target.Player.Name, " dodge ", attackData.TotalDodge, ")"))
		}
		if !target.Player.IsAlive() {
			attacker.Won = true
		}
		attacker, target = target, attacker
	}
	data.Turns = attacker.Turns + target.Turns
	data.Rounds = int(math.Ceil(float64(data.Turns) / 2))
	return
}
