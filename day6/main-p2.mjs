
import fs from 'node:fs/promises';

const data = await fs.readFile(process.argv[2], { encoding: 'utf8' })

const map = data.split('\n').slice(0, -1).map(row => [...row])



function rotate(ymod, xmod) {
    if (ymod == -1 && xmod == 0) { // ^ to >
        return [0, 1]
    } else if (ymod == 0 && xmod == 1) { // > to v
        return [1, 0]
    } else if (ymod == 1 && xmod == 0) { // v to <
        return [0, -1]
    } else if (ymod == 0 && xmod == -1) { // < to ^
        return [-1, 0]
    }
}

let loopsDetected = 0;

function loop(map) {
    //y,x,stepy, stepx
    let position = [0, 0, 0, -1];
    let visitedPositions = new Set();

    xloop:
    for (let x = 0; x < map[0].length; x++) {
        for (let y = 0; y < map.length; y++) {
            if (map[y][x] == '^') {
                map[y][x] = '.'
                position = [y, x, -1, 0];


                break xloop;
            }
        }
    }

    for (let i = 0; i < 10_000; i++) {
        const [y, x, ymod, xmod] = position;
        const posStr = `${y}--${x}--${ymod}--${xmod}`
        if (visitedPositions.has(posStr)) {
            console.log('loop detected')
            loopsDetected += 1;
            break
        }
        visitedPositions.add(posStr)

        if (y + ymod < 0 || y + ymod >= map.length) {
            break;
        }
        if (x + xmod < 0 || x + xmod >= map[0].length) {
            break;
        }

        if (map[y + ymod][x + xmod] === '#') {
            const newmod = rotate(ymod, xmod)
            position[2] = newmod[0]
            position[3] = newmod[1]
        } else {
            position[0] += position[2]
            position[1] += position[3]
        }
    }

    return visitedPositions;
}

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        const newMap = structuredClone(map)
        //console.log(y, x)
        newMap[y][x] = '#'
        loop(newMap)
    }
}

console.log('loopsDetected', loopsDetected)
