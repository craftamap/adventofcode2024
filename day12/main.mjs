import fs from 'node:fs/promises';
import { pack } from '../util/pos.mjs';

const data = await fs.readFile(process.argv[2], { encoding: 'utf8' })

const map = data.split('\n').slice(0, -1).map(row => [...row])

function part1() {
    const regions = [

    ]

    /** @type {Set<number>} */
    const visitedLocations = new Set();


    function visitAndGrow(x, y, letter) {
        if ((map[y] || [])[x] !== letter) {
            return [[], 1];
        }
        if (visitedLocations.has(pack(x, y, map.length))) {
            return [[], 0];
        }
        visitedLocations.add(pack(x, y, map.length))

        const positions = [pack(x, y, map.length)];
        let totalPerimeterCnt = 0;
        for (const [dx, dy] of [[-1, 0], [0, -1], [1, 0], [0, 1]]) {
            const [newPositions, perimeterCnt] = visitAndGrow(x + dx, y + dy, letter)
            positions.push(...newPositions)
            totalPerimeterCnt += perimeterCnt
        }
        return [positions, totalPerimeterCnt];
    }

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            const packedPos = pack(x, y, map.length)

            if (visitedLocations.has(packedPos)) {
                continue
            }

            regions.push(visitAndGrow(x, y, map[y][x]))
        }
    }

    let sum = 0;
    for (const region of regions) {
        sum += region[0].length * region[1]
    }

    console.log(sum)
}

part1()
