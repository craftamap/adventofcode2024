import fs from 'node:fs/promises';
import { pack } from '../util/pos.mjs';

const data = await fs.readFile(process.argv[2], { encoding: 'utf8' })

const map = data.split('\n').slice(0, -1).map(row => [...row])

const antennaPositions = new Map();

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        const char = map[y][x]
        if (char !== '.') {
            if (!antennaPositions.has(char)) {
                antennaPositions.set(char, [])
            }
            antennaPositions.get(char).push([x, y])
        }
    }
}
function part1() {
    const antiNodes = [];

    const permutations = (array) => array.flatMap(
        (v, i) => array.map((w, i2) => { if (i == i2) { return undefined }; return [v, w] })
    ).filter(a => a);


    for (const entry of antennaPositions.entries()) {
        console.log('antennas', entry[0])
        const perms = permutations(entry[1])

        for (const perm of perms) {
            const diffx = perm[1][0] - perm[0][0]
            const diffy = perm[1][1] - perm[0][1]

            const antiNodePos = [perm[0][0] - diffx, perm[0][1] - diffy]
            if (antiNodePos[0] < 0 || antiNodePos[0] >= map[0].length) {
                continue;
            }
            if (antiNodePos[1] < 0 || antiNodePos[1] >= map.length) {
                continue;
            }
            antiNodes.push(antiNodePos)
        }
    }

    const s = new Set(antiNodes.map(node => pack(node[0], node[1], map.length)))
    console.log(s.size)
}

function part2() {
    const antiNodes = [];

    const permutations = (array) => array.flatMap(
        (v, i) => array.map((w, i2) => { if (i == i2) { return undefined }; return [v, w] })
    ).filter(a => a);


    for (const entry of antennaPositions.entries()) {
        const perms = permutations(entry[1])

        for (const perm of perms) {
            const diffx = perm[1][0] - perm[0][0]
            const diffy = perm[1][1] - perm[0][1]

            let pos = [perm[0][0], perm[0][1]]

            while (true) {
                // we switched from - to plus to go into the other direction, so the other antenna is included. The other anthena will take care of the other direction.
                const antiNodePos = [pos[0] + diffx, pos[1] + diffy]
                if (antiNodePos[0] < 0 || antiNodePos[0] >= map[0].length) {
                    break;
                }
                if (antiNodePos[1] < 0 || antiNodePos[1] >= map.length) {
                    break;
                }
                antiNodes.push(antiNodePos)
                pos = antiNodePos
            }
        }
    }

    const s = new Set(antiNodes.map(node => pack(node[0], node[1], map.length)))
    console.log(s.size)
}

part2()
