import fs from 'node:fs/promises';

const data = await fs.readFile(process.argv[2], { encoding: 'utf8' })
let arrangement = data.split(' ').map(Number)

function part1() {
    console.log(arrangement)

    for (let i = 0; i < 25; i++) {
        arrangement = arrangement.flatMap((nu) => {
            if (nu == 0) {
                return [1];
            }

            const noDigits = Math.ceil(Math.log10(nu + 1))
            if (noDigits % 2 == 0) {
                return [
                    Math.floor(nu / Math.pow(10, noDigits / 2)),
                    nu - Math.floor(nu / Math.pow(10, noDigits / 2)) * Math.pow(10, noDigits / 2)
                ]
            }

            return nu * 2024
        })
        console.log(arrangement.length)
    }
}

part1()
