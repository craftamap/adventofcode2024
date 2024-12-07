import fs from 'node:fs/promises';

const data = await fs.readFile(process.argv[2], { encoding: 'utf8' })

const lines = data.split('\n').slice(0, -1)

const puzzle = lines.map(line => line.split(': ')).map(([result, rem]) => [Number(result), rem.split(' ').map(Number)])

function part1() {
    function recursive(puzzleResult, accumulator, remaining) {
        if (remaining.length == 0) {
            if (accumulator === puzzleResult) {
                return true;
            }
            return false;
        }

        const r1 = recursive(puzzleResult, accumulator + remaining[0], remaining.slice(1))
        const r2 = recursive(puzzleResult, accumulator * remaining[0], remaining.slice(1))
        return r1 || r2;
    }

    function evaluate(puzzleLine) {
        const lineResult = recursive(puzzleLine[0], puzzleLine[1][0], puzzleLine[1].slice(1))
        console.log("solution for", puzzleLine, lineResult)
        if (lineResult) {
            return puzzleLine[0]
        }
        return 0;
    }

    let sum = 0;
    for (const puzzleLine of puzzle) {
        sum += evaluate(puzzleLine)
    }
    console.log('total sum', sum)
}
function part2() {
    function recursive(puzzleResult, accumulator, remaining) {
        if (remaining.length == 0) {
            if (accumulator === puzzleResult) {
                return true;
            }
            return false;
        }
        if (accumulator > puzzleResult) {
            return false;
        }

        const r1 = recursive(puzzleResult, accumulator + remaining[0], remaining.slice(1))
        const r2 = recursive(puzzleResult, accumulator * remaining[0], remaining.slice(1))
        const concatMath = accumulator * Math.pow(10, Math.ceil(Math.log10(remaining[0] + 1))) + remaining[0];
        const r3 = recursive(puzzleResult, concatMath, remaining.slice(1))
        return r1 || r2 || r3;
    }

    function evaluate(puzzleLine) {
        const lineResult = recursive(puzzleLine[0], puzzleLine[1][0], puzzleLine[1].slice(1))
        console.log("solution for", puzzleLine, lineResult)
        if (lineResult) {
            return puzzleLine[0]
        }
        return 0;
    }

    let sum = 0;
    for (const puzzleLine of puzzle) {
        sum += evaluate(puzzleLine)
    }
    console.log('total sum', sum)
}

part2()
