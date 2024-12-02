import fs from 'node:fs/promises';

const data = await fs.readFile('./input', { encoding: 'utf8' })
const reports = data.split('\n').slice(0, -1)
const reportLevels = reports.map(report => report.split(' '))

function part1() {
    let safe = 0;
    outer:
    for (const levels of reportLevels) {
        let firstDiff;
        console.log(levels)
        for (let i = 0; i < levels.length - 1; i++) {
            const diff = levels[i] - levels[i + 1];
            if (i == 0) {
                firstDiff = diff;
            } else {
                if (Math.sign(diff) != Math.sign(firstDiff)) {
                    continue outer;
                }
            }
            if (diff == 0) {
                continue outer;
            }
            if (Math.abs(diff) > 3) {
                continue outer;
            }
        }
        console.log('safe')
        safe++;
    }

    console.log(safe)
}

function part2() {
    let safe = 0;
    outer:
    for (const flevels of reportLevels) {
        let match = false;
        inner:
        for (let j = 0; j < flevels.length; j++) {
            const levels = flevels.filter((_, idx) => idx != j)
            let firstDiff;
            for (let i = 0; i < levels.length - 1; i++) {
                const diff = levels[i] - levels[i + 1];
                if (i == 0) {
                    firstDiff = diff;
                } else {
                    if (Math.sign(diff) != Math.sign(firstDiff)) {
                        continue inner;
                    }
                }
                if (diff == 0) {
                    continue inner;
                }
                if (Math.abs(diff) > 3) {
                    continue inner;
                }
            }
            match = true;
            break inner;
        }
        if (match) {
            safe++;
        }
    }

    console.log(safe)
}

part2()
