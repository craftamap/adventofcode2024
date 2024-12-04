import fs from 'node:fs/promises';

const data = await fs.readFile('./input', { encoding: 'utf8' })

// function part1() {
//     function countInArray(arrOfChars) {
//         let cnt = 0;
//         for (let i = 0; i < arrOfChars.length; i++) {
//             if (arrOfChars[i] === 'X' || arrOfChars[i] === 'S') {
//                 const toInspect = arrOfChars.slice(i, i + 4).join('');
//                 // console.log(toInspect)
//                 if (toInspect === "XMAS" || toInspect === "SAMX") {
//                     cnt += 1;
//                 }
//             }
//         }
//         return cnt;
//     }
// 
//     let count = 0;
//     // rows
//     const lines = data.split('\n').slice(0, -1)
//     for (const line of lines) {
//         count += countInArray([...line])
//     }
//     // rows
//     for (let i = 0; i < lines[0].length; i ++) {
//         count += countInArray(lines.map(line => line[i]))
//     }
//     console.log(count)
//     // diagonal \
//     for (let i = 0; i < lines[0].length; i ++) {
//         let arr = [];
//         // todo: contruct array?
//         // star search mightve been easier :(
//         count += countInArray()
//     }
// }

function part1() {
    const matrix = data.split('\n').slice(0, -1).map(row => [...row])


    function searchAtSpot(x, y) {
        let matches = 0;
        for (let xm = -1; xm <= 1; xm++) {
            for (let ym = -1; ym <= 1; ym++) {
                let word = [];
                for (let i = 0; i < 4; i++) {
                    word.push((matrix[x + i * xm] || [])[y + i * ym]);
                }
                if (word.join('') === 'XMAS') {
                    console.log('match', x, y)
                    matches++;
                }
            }
        }
        return matches;
    }

    let cnt = 0;

    for (let x = 0; x < matrix[0].length; x++) {
        for (let y = 0; y < matrix.length; y++) {
            if (matrix[x][y] === 'X') {
                cnt += searchAtSpot(x, y);
            }
        }
    }
    console.log(cnt);
}

function part2() {
    const matrix = data.split('\n').slice(0, -1).map(row => [...row])


    function searchAtSpot(x, y) {
        let matches = 0;
        for (let ym = -1; ym <= 1; ym+=2) {
            let word = [];
            for (let i = -1; i <= 1; i++) {
                word.push((matrix[x + i] || [])[y + i * ym]);
            }
            if (word.join('') === 'MAS' || word.join('') === 'SAM') {
                //console.log('match', x, y)
                matches++;
            }
        }
        return (matches == 2) ? 1 : 0;
    }

    let cnt = 0;

    for (let x = 0; x < matrix[0].length; x++) {
        for (let y = 0; y < matrix.length; y++) {
            if (matrix[x][y] === 'A') {
                cnt += searchAtSpot(x, y);
            }
        }
    }
    console.log(cnt);
}

part2()
