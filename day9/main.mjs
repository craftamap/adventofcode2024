import fs from 'node:fs/promises';

const data = await fs.readFile(process.argv[2], { encoding: 'utf8' })

const filesys = []

for (let i = 0; i < data.length; i++) {
    const isFile = i % 2 == 0;
    const length = Number(data[i]);
    const id = Math.floor(i / 2)
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

part1()
