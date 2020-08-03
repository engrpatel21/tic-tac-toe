const gameState = {
    sq0: 'x',
    sq1: 'o',
    sq2: 'o',
    sq3: 's',
    sq4: 's',
    sq5: null,
    sq6: 's',
    sq6: null,
    sq7: null,
    sq8: null
}

function getState() {
    const keys = []
    for (let key in gameState) {
        if (gameState[key] === null) {
            keys.push(key)
        }
    }
    return keys
}

console.log(getState())