
import fs from 'node:fs/promises';

const data = await fs.readFile(process.argv[2], { encoding: 'utf8' })

const map = data.split('\n').slice(0, -1).map(row => [...row])

//x,y,stepx, stepy
let position = [0, 0, 0, -1];
let visitedPositions = new Set();

xloop:
for (let x = 0; x < map[0].length; x++) {
    for (let y = 0; y < map.length; y++) {
        if (map[y][x] == '^') {
            map[y][x] = '.'
            position = [y, x, -1, 0];

            visitedPositions.add(`${y}--${x}`)

            break xloop;
        }
    }
}


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

while (true) {
    const [y, x, ymod, xmod] = position;
    visitedPositions.add(`${y}--${x}`)

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
console.log(visitedPositions.size)
