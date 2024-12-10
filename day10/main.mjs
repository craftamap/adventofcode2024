import fs from 'node:fs/promises';
import { pack } from '../util/pos.mjs';

const data = await fs.readFile(process.argv[2], { encoding: 'utf8' })

const map = data.split('\n').slice(0, -1).map(row => [...row].map((v) => Number(v)))


function part1() {
    const startPositions = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] == 0) {
                startPositions.push([x, y])
            }
        }
    }

    console.log(startPositions)

    function valueAt([x, y]) {
        // safe access
        return (map[y] || [])[x];
    }

    let score = 0;

    function walk(currentPos, tops) {
        const [x, y] = currentPos
        const currentValue = valueAt(currentPos);
        if (currentValue === 9) {
            tops.add(pack(x, y, map.length));
            return;
        }

        if (valueAt([x + 1, y]) === currentValue + 1) {
            walk([x + 1, y], tops)
        }
        if (valueAt([x - 1, y]) === currentValue + 1) {
            walk([x - 1, y], tops)
        }
        if (valueAt([x, y + 1]) === currentValue + 1) {
            walk([x, y + 1], tops)
        }
        if (valueAt([x, y - 1]) === currentValue + 1) {
            walk([x, y - 1], tops)
        }

    }

    console.log(startPositions)
    for (const startPos of startPositions) {
        const tops = new Set();
        let currentPos = startPos;

        walk(currentPos, tops)

        console.log(tops)
        score += tops.size
    }
    console.log(score)

}


function part2() {
    const startPositions = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] == 0) {
                startPositions.push([x, y])
            }
        }
    }

    console.log(startPositions)

    function valueAt([x, y]) {
        // safe access
        return (map[y] || [])[x];
    }

    let score = 0;

    function walk(currentPos, tops) {
        const [x, y] = currentPos
        const currentValue = valueAt(currentPos);
        if (currentValue === 9) {
            score++;
        }

        if (valueAt([x + 1, y]) === currentValue + 1) {
            walk([x + 1, y], tops)
        }
        if (valueAt([x - 1, y]) === currentValue + 1) {
            walk([x - 1, y], tops)
        }
        if (valueAt([x, y + 1]) === currentValue + 1) {
            walk([x, y + 1], tops)
        }
        if (valueAt([x, y - 1]) === currentValue + 1) {
            walk([x, y - 1], tops)
        }

    }

    console.log(startPositions)
    for (const startPos of startPositions) {
        const tops = new Set();
        let currentPos = startPos;

        walk(currentPos, tops)

        console.log(tops)
    }
    console.log(score)

}

part2()
