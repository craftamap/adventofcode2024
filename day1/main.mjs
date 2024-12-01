import fs from 'node:fs/promises';

const data = await fs.readFile('./input', { encoding: 'utf8' })
const lines = data.split('\n').slice(0, -1)
const numberPairs = lines.map(line => line.split('   '))
const left = []
const right = []

for (const pair of numberPairs) {
    left.push(pair[0])
    right.push(pair[1])
}

function part1() {

    left.sort()
    right.sort()

    let sumOfDiff = 0

    for (let i = 0; i < left.length; i++) {
        sumOfDiff += Math.abs(left[i] - right[i])
    }
    console.log('part1', sumOfDiff)
}

function part2() {
    let simscore = 0;
    const countsOfRight = new Map();
    for (const r of right) {
        if (!countsOfRight.has(r)) {
            countsOfRight.set(r, 0)
        }
        countsOfRight.set(r, countsOfRight.get(r) + 1)
    }

    for(const l of left) {
        simscore += Number(l) * Number(countsOfRight.get(l) || 0)
    }
    console.log(simscore)
}

part2()
