package main

import (
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	dat, _ := os.ReadFile(os.Args[1])
	arrangement := []int{}
	for _, n := range strings.Split(string(dat[:len(dat)-1]), " ") {
		nu, err := strconv.Atoi(n)
		if err != nil {
		}

		arrangement = append(arrangement, nu)
	}
	sum := 0
	for _, i := range arrangement {
		sum += calculateArrangement(i, 75, 0)
	}
	fmt.Printf("sum: %v\n", sum)
}

var arrDepthCache map[[2]int]int = map[[2]int]int{}

func calculateArrangement(arrangement int, count int, currentCount int) int {
	if currentCount == count {
		return 1
	}
	if v, ok := arrDepthCache[[2]int{arrangement, currentCount}]; ok {
		return v
	}

	newArrangement := make([]int, 0)
	nu := arrangement

	noDigits := int(math.Ceil(math.Log10(float64(nu + 1))))
	if nu == 0 {
		newArrangement = append(newArrangement, 1)
	} else if noDigits%2 == 0 {
		newArrangement = append(newArrangement, int(math.Floor(float64(nu)/math.Pow(float64(10), float64(noDigits/2)))))
		newArrangement = append(newArrangement,
			int(float64(nu)-math.Floor(float64(nu)/math.Pow(10, float64(noDigits)/float64(2)))*math.Pow(float64(10), float64(noDigits)/float64(2))),
		)
	} else {
		newArrangement = append(newArrangement, nu*2024)
	}

	sum := 0
	for _, nu := range newArrangement {
		sum += calculateArrangement(nu, count, currentCount+1)
	}
	arrDepthCache[[2]int{arrangement, currentCount}] = sum

	return sum
}
