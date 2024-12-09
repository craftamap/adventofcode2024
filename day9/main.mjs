import fs from 'node:fs/promises';

const data = await fs.readFile(process.argv[2], { encoding: 'utf8' })

let maxId = 0;
const filesys = []

for (let i = 0; i < data.length; i++) {
    const isFile = i % 2 == 0;
    const length = Number(data[i]);
    const id = Math.floor(i / 2)
    maxId = id;
    filesys.push(...(new Array(length)).fill(isFile ? String(id) : '.'))
}

function part1() {
    let left = 0;
    let right = filesys.length - 1;

    while (left + 1 < right - 1) {
        while (filesys[left] != '.') {
            left++;
        }
        while (filesys[right] == '.') {
            right--;
        }

        filesys[left] = filesys[right]
        if (left != right) {
            filesys[right] = '.'
        }
    }

    let checksum = 0;

    for (let i = 0; i < filesys.length; i++) {
        if (filesys[i] != '.') {
            checksum += i * filesys[i];
        }
    }

    console.log(checksum)
}


function part2() {
    for (let id = maxId; id >= 0; id--) {
        // this is inefficient. Something similar to binary search might be faster.
        const firstIdx = filesys.indexOf(String(id))
        let lastIdx = firstIdx;
        while (filesys[lastIdx] === String(id)) {
            if (filesys[lastIdx + 1] === String(id)) {
                lastIdx++;
            } else {
                break
            }
        }

        const blockLength = lastIdx - firstIdx + 1;


        let s = -1;
        let e = -1;
        match:
        for (let searchIdStart = 0; searchIdStart < filesys.length; searchIdStart++) {
            if (filesys[searchIdStart] === '.') {
                for (let searchIdEnd = searchIdStart; searchIdEnd < filesys.length; searchIdEnd++) {
                    if (filesys[searchIdEnd] === '.') {
                        if (searchIdEnd - searchIdStart + 1 == blockLength) {
                            s = searchIdStart;
                            e = searchIdEnd;
                            break match;
                        }
                    } else {
                        // potential optimisation
                        // searchIdStart = searchIdEnd;
                        break;
                    }
                }
            }
        }
        if (s !== -1 && s < firstIdx) {
            filesys.splice(firstIdx, blockLength, ...(new Array(blockLength).fill('.')))
            filesys.splice(s, blockLength, ...(new Array(blockLength).fill(String(id))))
        }
    }


    let checksum = 0;

    for (let i = 0; i < filesys.length; i++) {
        if (filesys[i] != '.') {
            checksum += i * filesys[i];
        }
    }
    console.log(filesys)
    console.log(checksum)

}

part2()
