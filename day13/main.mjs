import fs from 'node:fs/promises';

const data = await fs.readFile(process.argv[2], { encoding: 'utf8' })
function part1() {
    const machines = data.split('\n\n').map((machineTxt) => {
        const [aTxt, bTxt, pTxt] = machineTxt.split('\n')
        const off = /X\+(\d+), Y\+(\d+)/
        const pri = /X\=(\d+), Y\=(\d+)/
        const [, axT, ayT] = aTxt.match(off)
        const ax = Number(axT)
        const ay = Number(ayT)
        const [, bxT, byT] = bTxt.match(off)
        const bx = Number(bxT)
        const by = Number(byT)
        const [, pxT, pyT] = pTxt.match(pri)
        const px = Number(pxT)
        const py = Number(pyT)

        return [ax, ay, bx, by, px, py]
    })

    let sumToken = 0;

    for (const machine of machines) {
        const [ax, ay, bx, by, px, py] = machine;

        // g1: z1 * ax + z2 * bx = px
        // g2: z1 * ay + z2 * by = py


        // g1: z1 * ax + z2 * bx = px           | / ax
        //     z1 + (z2 * bx) / ax = px / ax    | - (z2 * bx)
        //     z1 = px / ax - (z2 * bx)
        //
        // g2: (px / ax - z2 * bx) * ay + z2 * by = py
        //     px * ay / ax - z2 * bx * ay + z2 * by = py
        //
        //
        // ???
        //
        what:
        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                const x = ax * i + bx * j
                const y = ay * i + by * j
                // console.log(i,j, ax, ay, bx, by, x, y, px, py)
                if (x === px && y === py) {
                    console.log(i, j)
                    sumToken += i * 3 + j
                    break what
                }
            }
        }
    }

    console.log(sumToken)

}

function part2() {
// g1: z1 * ax + z2 * bx = px
// g2: z1 * ay + z2 * by = py


// g1: z1 * ax + z2 * bx = px           | / ax
//     z1 + (z2 * bx) / ax = px / ax    | - (z2 * bx)
//     z1 = px / ax - (z2 * bx)
//
// g2: (px / ax - z2 * bx) * ay + z2 * by = py |  / by
// ???
//
//hint: https://dev.to/grantdotdev/advent-of-code-24-day-13-claw-contraption-n2p use matrix to solve equation? gramer?
// https://www.matheretter.de/wiki/matrizen-losen-gleichungssysteme gramersche regel
//
// g1: z1 * ax + z2 * bx = px
// g2: z1 * ay + z2 * by = py
//
//
//    z1    z2   | 
//    ax    bx   | px 
//    ay    by   | py
}
