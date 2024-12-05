import fs from 'node:fs/promises';

const data = await fs.readFile('./input', { encoding: 'utf8' })

const [rulesTxt, updatesTxt] = data.split('\n\n')

const rules = rulesTxt.split('\n').map(rule => rule.split('|')).map(rule => rule.map(r => Number(r)))

const updates = updatesTxt.split('\n').slice(0, -1).map(update => update.split(',')).map(update => update.map(u => Number(u)))

// console.log(rules, updates)

const rulesLookup = new Map();

for (const rule of rules) {
    // setup
    if (!rulesLookup.has(rule[0])) {
        rulesLookup.set(rule[0], { before: [], after: [] })
    }
    if (!rulesLookup.has(rule[1])) {
        rulesLookup.set(rule[1], { before: [], after: [] })
    }
    // key needs to be before value
    rulesLookup.get(rule[0]).before.push(rule[1])
    // key needs to be after value
    rulesLookup.get(rule[1]).after.push(rule[0])
}

// console.log(updates)

let sum = 0;
let incorrect = [];
update:
for (const update of updates) {
    for (let i = 0; i < update.length; i++) {
        let page = update[i]
        let relevantRules = rulesLookup.get(page)

        // for (let j = 0; j < 0; j++) {
        //     let lookedAt = update[i]

        //     if(relevantRules.before.includes(lookedAt)) {
        //         continue update;
        //     }
        // }
        for (let j = i + 1; j < update.length; j++) {
            let lookedAt = update[j]
            if (relevantRules.after.includes(lookedAt)) {
                incorrect.push(update);
                continue update;
            }
        }
    }
    const middle = update[Math.floor(update.length / 2)]
    sum += middle;
}

console.log("part 1 sum", sum)

let sump2 = 0;
for (const update of incorrect) {
    const sorted = update.toSorted((a, b) => {
        const rule = rulesLookup.get(a)

        if (rule.after.includes(b)) {
            return 1;
        } else {
            return -1;
        }
    });
    const middle = sorted[Math.floor(sorted.length / 2)]
    sump2 += middle;
}

console.log("par 2 sum", sump2)
