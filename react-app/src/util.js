/** Returns a random integer where min is inclusive and max is exclusive */
export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/** Returns a new shuffled array */
export const shuffleArr = (arr) => {
    let out = [];
    let visited = new Set([]);
    let max = arr.length;
    while (out.length < max) {
        let idx = getRandomInt(0, max)
        if (!visited.has(idx)) {
            visited.add(idx)
            out.push(arr[idx])
        }
    }
    return out;
}
