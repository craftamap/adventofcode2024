import fs from 'node:fs/promises';

const data = await fs.readFile(process.argv[2], { encoding: 'utf8' })

let maxId = 0;
const filesys = []

for (let i = 0; i < data.length; i++) {
    const isFile = i % 2 == 0;
    const length = Number(data[i]);
    const id = Math.floor(i / 2)
    maxId = id;
    filesys.push(...(new Array(length)).fill(isFile ? id : -1))
}

function part1() {
    let left = 0;
    let right = filesys.length - 1;

    while (left + 1 < right - 1) {
        while (filesys[left] != -1) {
            left++;
        }
        while (filesys[right] == -1) {
            right--;
        }

        filesys[left] = filesys[right]
        if (left != right) {
            filesys[right] = -1
        }
    }

    let checksum = 0;

    for (let i = 0; i < filesys.length; i++) {
        if (filesys[i] != -1) {
            checksum += i * filesys[i];
        }
    }

    console.log(checksum)
}


function part2() {
    for (let id = maxId; id >= 0; id--) {
        // this is inefficient. Something similar to binary search might be faster.
        // Note: using lastIndexOf is significantly slower. 
        const firstIdx = filesys.indexOf(id)
        let lastIdx = firstIdx;
        while (filesys[lastIdx] === id) {
            if (filesys[lastIdx + 1] === id) {
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
            if (filesys[searchIdStart] === -1) {
                for (let searchIdEnd = searchIdStart; searchIdEnd < filesys.length; searchIdEnd++) {
                    if (filesys[searchIdEnd] === -1) {
                        if (searchIdEnd - searchIdStart + 1 == blockLength) {
                            s = searchIdStart;
                            e = searchIdEnd;
                            break match;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        if (s !== -1 && s < firstIdx) {
            filesys.splice(firstIdx, blockLength, ...(new Array(blockLength).fill(-1)))
            filesys.splice(s, blockLength, ...(new Array(blockLength).fill(id)))
        }
    }


    let checksum = 0;

    for (let i = 0; i < filesys.length; i++) {
        if (filesys[i] != -1) {
            checksum += i * filesys[i];
        }
    }
    console.log(filesys)
    console.log(checksum)

}

part2()
