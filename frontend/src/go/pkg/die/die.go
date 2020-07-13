package die

import (
	"math/rand"
	"sort"
	"time"
)

type Die struct {
	Sides int
}

func D6() *Die {
	return &Die{
		Sides: 6,
	}
}

func (die *Die) Roll() int {
	return rand.Intn(die.Sides)
}

func (die *Die) RollMany(rollCount int) (rollVals []int) {
	rollVals = make([]int, rollCount)
	for i := 0; i < rollCount; i++ {
		rollVals[i] = die.Roll()
	}
	sort.Slice(rollVals, func(i, j int) bool {
		return rollVals[i] < rollVals[j]
	})
	return
}

func (die *Die) SumHighestRolls(rollCount int, keep int) (highestRollsSum int) {
	rollVals := die.RollMany(rollCount)
	for i := 0; i < keep; i++ {
		highestRollsSum += rollVals[i]
	}
	return
}

func init() {
	// Re-seed rand away from the default
	rand.Seed(time.Now().UnixNano())
}
