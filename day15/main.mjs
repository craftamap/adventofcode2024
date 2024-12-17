import fs from 'node:fs/promises';

const data = await fs.readFile(process.argv[2], { encoding: 'utf8' })

function printMap(map, position) {
    const cloned = structuredClone(map)
    cloned[position[1]][position[0]] = '@'
    console.log(cloned.map(line => line.join('')).join('\n'))
}
const [mapTxt, movemTxt] = data.split('\n\n')
function part1() {
    const map = mapTxt.split('\n').map(m => [...m])

    let position = [0, 0];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === '@') {
                position = [x, y]
                map[y][x] = '.'
            }
        }
    }
    console.log(position)
    const movements = movemTxt.split('\n').flatMap(m => [...m])

    let scoreSet = [];
    for (const move of movements) {
        let delta;
        if (move === 'v') delta = [0, 1]
        else if (move === '^') delta = [0, -1]
        else if (move === '<') delta = [-1, 0]
        else if (move === '>') delta = [1, 0]

        const observedPos = [position[0] + delta[0], position[1] + delta[1]]
        const atObserved = map[observedPos[1]][observedPos[0]]
        if (atObserved === '.') {
            position = observedPos;
        } else if (atObserved === '#') {
            // no-op
        } else if (atObserved === 'O') {
            // walk all crates, until we find free or border. if free, remove first crate and insert into first free position. if border, dont do anything
            let crateWalk = observedPos;
            while (map[crateWalk[1]][crateWalk[0]] === 'O') {
                crateWalk = [crateWalk[0] + delta[0], crateWalk[1] + delta[1]]
            }
            if (map[crateWalk[1]][crateWalk[0]] === '.') {
                position = observedPos;
                map[crateWalk[1]][crateWalk[0]] = 'O';
                map[observedPos[1]][observedPos[0]] = '.';
            } else if (map[crateWalk[1]][crateWalk[0]] === '#') {
                // intentional no-op
            }

        }
    }
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === 'O') {
                const gpscoord = y * 100 + x
                scoreSet.push(gpscoord)
            }
        }
    }

    console.log(scoreSet.reduce((a, b) => a + b, 0))
}

function part2() {
    let map = mapTxt.split('\n').map(m => [...m].flatMap(l => {
        if (l === '@') {
            return ['@', '.']
        }
        if (l === 'O') {
            return ['[', ']']
        }
        return [l, l]
    }))

    let position = [0, 0];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === '@') {
                position = [x, y]
                map[y][x] = '.'
            }
        }
    }
    printMap(map, position)
    const movements = movemTxt.split('\n').flatMap(m => [...m])

    function moveCrate(mapC, position, delta) {
        let atNextPos = (mapC[position[1] + delta[1]] || [])[position[0] + delta[0]]
        if (delta[0] == 1) { // if it's movement to right, we need to look two forward
            atNextPos = (mapC[position[1] + delta[1]] || [])[position[0] + delta[0] * 2]
        }
        const atNextPosRight = (mapC[position[1] + delta[1]] || [])[position[0] + delta[0] + 1] // position right next to NextPos. Might be position itself. 
        // atNextPosRight is not needed for right movement, so no offset here.


        if (atNextPos === '#') {
            return false;
        }
        if (delta[1] != 0 && atNextPosRight == '#') {
            return false;
        }
        let wasMoved = false;
        // sideway motion => we the next '[' is off two to the current one.
        if (delta[0] !== 0 && (atNextPos === '[' || atNextPos === ']')) {
            wasMoved = moveCrate(mapC, [position[0] + 2 * delta[0], position[1] + 2 * delta[1]], delta)
        } else if (delta[1] != 0) { // up-down / vertical
            // if true, we have a box directly above. So we can just continue with this box.
            if (atNextPos == '[') {
                wasMoved = moveCrate(mapC, [position[0] + delta[0], position[1] + delta[1]], delta)
            } else { // else, we have offsetted boxes above. Lovely.
                let wasMovedL = true;
                let wasMovedR = true;
                if (atNextPos === ']') {
                    // -1 since we need to move one to the left
                    wasMovedL = moveCrate(mapC, [position[0] + delta[0] - 1, position[1] + delta[1]], delta)
                }
                if (atNextPosRight === '[') {
                    wasMovedR = moveCrate(mapC, [position[0] + delta[0] + 1, position[1] + delta[1]], delta)
                }
                wasMoved = wasMovedL && wasMovedR;
            }
        }
        let b = true;
        if (delta[1] != 0) {
            b = atNextPosRight === '.'
        }
        
        if ((atNextPos === '.' && b) || wasMoved) {
            if (delta[0] === 1) { // move to right
                mapC[position[1]][position[0]] = '.'
                mapC[position[1]][position[0] + delta[0]] = '['
                mapC[position[1]][position[0] + delta[0] * 2] = ']'
            } else if (delta[0] === -1) { // move to left
                mapC[position[1]][position[0]] = ']'
                mapC[position[1]][position[0] + delta[0]] = '['
                mapC[position[1]][position[0] - delta[0]] = '.'
            } else if (delta[1] === -1 || delta[1] == 1) { // move up/down
                mapC[position[1]][position[0]] = '.'
                mapC[position[1]][position[0] + 1] = '.'
                mapC[position[1] + delta[1]][position[0]] = '['
                mapC[position[1] + delta[1]][position[0] + 1] = ']'
            }
            return true;
        }
        return false;
    }

    for (const [mIdx, move] of movements.entries()) {
        let delta;
        // if (mIdx == 194) {
        //     debugger;
        // }
        if (move === 'v') delta = [0, 1]
        else if (move === '^') delta = [0, -1]
        else if (move === '<') delta = [-1, 0]
        else if (move === '>') delta = [1, 0]

        const observedPos = [position[0] + delta[0], position[1] + delta[1]]
        const atObserved = map[observedPos[1]][observedPos[0]]
        if (atObserved === '.') {
            position = observedPos;
        } else if (atObserved === '#') {
            // no-op
        } else if (atObserved === '[' || atObserved === ']') {
            const copiedMap = structuredClone(map)
            let cratePos = structuredClone(observedPos)
            if (atObserved === ']') {
                cratePos = [observedPos[0] - 1, observedPos[1]]
            }
            const moved = moveCrate(copiedMap, cratePos, delta)
            if (moved) {
                map = copiedMap;
                position = observedPos;
            }
        }
        console.log('move', mIdx, move)
        printMap(map, position)
    }
    let scoreSet = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === '[') {
                const gpscoord = y * 100 + x
                scoreSet.push(gpscoord)
            }
        }
    }

    console.log([...scoreSet].reduce((a, b) => a + b, 0))
}

part2()
