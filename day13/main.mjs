import fs from 'node:fs/promises';

const data = await fs.readFile(process.argv[2], { encoding: 'utf8' })
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
function part1() {
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
    throw new Error("see python for implementation")
    // g1: z1 * ax + z2 * bx = px
    // g2: z1 * ay + z2 * by = py
    //
    //hint: https://dev.to/grantdotdev/advent-of-code-24-day-13-claw-contraption-n2p use matrix to solve equation? gramer?
    // https://www.sofatutor.com/mathematik/terme-und-gleichungen/lineare-gleichungssysteme/lineare-gleichungssysteme-mit-zwei-variablen additionsverfahren

    let sum = 0;
    for (const machine of machines) {
        let [ax, ay, bx, by, px, py] = machine;
        px += 10000000000000
        py += 10000000000000

        // we need to calculate the factor to multiply g1 with
        const factor = -(ay / ax)

        const mulAx = ax * factor
        const mulBx = bx * factor
        const mulPx = px * factor

        const sumedA = mulAx + ay // hopefully 0
        if (sumedA != 0) {
            continue
        }

        const sumedB = mulBx + by
        const sumedP = mulPx + py

        const z2 = sumedP / sumedB

        // into g2:
        // z1 * ay + z2 * by = py 
        // z1 = (py - z2 * by) / ay
        const z1 = (py - z2 * by) / ay
        console.log(z1, z2)
        if (Number.isInteger(z1) && Number.isInteger(z2)) {
            sum += z1 * 3 + z2
        }

    }
    console.log(sum)


}
part2()
