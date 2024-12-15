import fs from 'node:fs/promises';

const data = await fs.readFile(process.argv[2], { encoding: 'utf8' })

const parsed = data.split('\n').slice(0, -1).map(line => {
    const [_, x, y, vx, vy] = line.match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/)
    return [x, y, vx, vy].map(Number)
})

// js % is not mod, but remainder :^)
function mod(n, m) {
    // copied from stack overflow, but I'm sure I would've come up with something similar :^)
    return ((n % m) + m) % m;
}
function part1() {
    const matrix = [];

    // for (let y = 0; y < 7; y++) {
    //     matrix.push(new Array(11).fill(0))
    // }

    const q = [0, 0, 0, 0]

    for (const robot of parsed) {
        const w = 101;
        const h = 103;
        let [x, y, vx, vy] = robot
        for (let i = 0; i < 100; i++) {
            x = mod(x + vx, w)
            y = mod(y + vy, h)
        }
        console.log('robot', robot, 'pos', x, y)
        // matrix[y][x]++;

        if (x < Math.floor(w / 2) && y < Math.floor(h / 2)) {
            q[0]++
        }
        else if (x > Math.floor(w / 2) && y < Math.floor(h / 2)) {
            q[1]++
        }
        else if (x > Math.floor(w / 2) && y > Math.floor(h / 2)) {
            q[2]++
        }
        else if (x < Math.floor(w / 2) && y > Math.floor(h / 2)) {
            q[3]++
        } else {
            console.log('skip', x, y)
        }

    }
    // console.log(matrix)
    console.log(q[0] * q[1] * q[2] * q[3])
}


function part2() {


    const robots = structuredClone(parsed);

    for (let i = 0; i < 101 * 103; i++) {
        const matrix = [];
        const w = 101;
        const h = 103;
        for (let y = 0; y < h; y++) {
            matrix.push(new Array(w).fill(0))
        }
        for (const robot of robots) {
            let [x, y, vx, vy] = robot
            robot[0] = mod(x + vx, w)
            robot[1] = mod(y + vy, h)
            matrix[y][x]++;
        }
        // assumption: in case of christmas tree, every roboter has a unique position.
        // I dont like that I have to assume this...
        if (!(matrix.flatMap(i => i).some(i => i > 1))) {
            console.log('i', i)
            // console.log(matrix.map(row => row.join('').replace(/0/g, ' ')).join('\n'))
            break
        }
    }


}


part2()
