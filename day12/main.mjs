import fs from 'node:fs/promises';
import { pack, unpack } from '../util/pos.mjs';

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


function part2() {
    const regions = [

    ]

    /** @type {Set<number>} */
    const visitedLocations = new Set();


    function visitAndGrow(x, y, letter) {
        if ((map[y] || [])[x] !== letter) {
            return [];
        }
        if (visitedLocations.has(pack(x, y, map.length))) {
            return [];
        }
        visitedLocations.add(pack(x, y, map.length))

        const positions = [pack(x, y, map.length)];
        for (const [dx, dy] of [[-1, 0], [0, -1], [1, 0], [0, 1]]) {
            const newPositions = visitAndGrow(x + dx, y + dy, letter)
            positions.push(...newPositions)
        }
        return positions;
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


    // tip from reddit: figure out how many corners exist. The amount of corners equals the amount of lines.
    // https://www.reddit.com/r/adventofcode/comments/1hdg24l/day_12_part_2_what_am_i_missing/

    let sum = 0;
    for (const region of regions) {
        let corners = 0;
        for (const location of region) {
            const [x, y] = unpack(location, map.length)

            const [left, top, right, bottom, topleft, topright, bottomleft, bottomright] = [[-1, 0], [0, -1], [1, 0], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1]].map(([dx, dy]) => {
                return pack(x + dx, y + dy, map.length)
            }).map(packed => !region.includes(packed))

            if (left && top) {
                corners++;
            }
            if (right && top) {
                corners++;
            }
            if (left && bottom) {
                corners++;
            }
            if (right && bottom) {
                corners++;
            }

            if (!top && !left && topleft) corners++
            if (!top && !right && topright) corners++
            if (!bottom && !left && bottomleft) corners++
            if (!bottom && !right && bottomright) corners++
        }
        sum += (corners * region.length)
    }

    console.log(sum)

}

part2()
