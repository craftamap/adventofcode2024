import fs from 'node:fs/promises';

const data = await fs.readFile('./input', { encoding: 'utf8' })

function part1() {
    const exp = /mul\((\d{1,3}),(\d{1,3})\)/gm

    const result = data.matchAll(exp)

    let sum = 0;
    for (const match of result) {
        const lhs = match[1]
        const rhs = match[2]
        sum += Number(lhs) * Number(rhs)
    }
    console.log(sum)
}

function part2() {
    const exp = /(mul)\((\d{1,3}),(\d{1,3})\)|(do)\(\)|(don't)\(\)/gm

    const result = data.matchAll(exp);

    let r_do = true;
    let sum = 0;
    for (const match of result) {
        console.log(match)
        if (match[4] == 'do') {
            r_do = true; 
        } else if (match[5] == 'don\'t') {
            r_do = false;
        } else if (match[1] == 'mul' && r_do) {
            const lhs = match[2]
            const rhs = match[3]
            sum += Number(lhs) * Number(rhs)
        }
    }
    console.log(sum)
}

part2()
