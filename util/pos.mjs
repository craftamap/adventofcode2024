export function pack(x, y, height) {
    return x * Math.pow(10, Math.ceil(Math.log10(height))) + y;
}

export function unpack(number, height) {
    const d = Math.pow(10, Math.ceil(Math.log10(height)))
    const x = Math.floor(number / d)
    const y = number % d
    return [x, y]
}

