class Game {
    #spriteList
    #levelSprites
    #level
    #score 
    #highscore
    #maxLevel
    
    constructor(spriteList) {
        this.#spriteList = spriteList.map(sprite => {return {id: sprite, picked:false}})
        this.#levelSprites = []
        this.#level = 0
        this.#score = 0
        this.#highscore = 0
        this.#maxLevel = this.#getMaxLevel()
        if (this.#maxLevel < 1) {
            throw new Error('Invalid spriteList')
        }
        
        this.#advanceLevel()
    }

    getMaxLevel() {
        return this.#maxLevel
    }

    getLevelSprites() {
        return this.#levelSprites
    }

    getspriteList() {
        return this.#spriteList
    }

    getLevel() {
        return this.#level
    }

    getScore() {
        return this.#score
    }

    getHighScore() {
        return this.#highscore
    }

    #getMaxLevel() {
        let level = 1
        let used = this.#getNumLevelSprites(level)
        while (used <= this.#spriteList.length) {
            level++
            used += this.#getNumLevelSprites(level)
        }
        return level - 1
    }

    #getNumLevelSprites(level) {
        return (level + 1) * 2
    }

    #endGame() {
        if (this.#score > this.#highscore) {
            this.#highscore = this.#score
        }
        this.#level = 0
        this.#score = 0
        this.#spriteList.forEach(sprite => sprite.picked = false)
        this.#advanceLevel()
    }

    #getUnpickedSpriteList() {
        return this.#spriteList.filter(sprite => !sprite.picked)
    }

    #getLevelSprite(id) {
        return this.#levelSprites.find(curr => curr.id === id)
    }

    #advanceLevel() {
        this.#level++
        if (this.#level > this.#maxLevel) {
            this.#endGame()
            return
        }
        this.#levelSprites = []
        let unpickedSprites = this.#getUnpickedSpriteList()
        for (let i = 0; i < this.#getNumLevelSprites(this.#level); i++) {
            const chosenIndex = Math.floor(Math.random() * unpickedSprites.length)
            const randomSprite = unpickedSprites[chosenIndex]
            this.#levelSprites.push(randomSprite)
            unpickedSprites = unpickedSprites.slice(0, chosenIndex).concat(unpickedSprites.slice(chosenIndex + 1))
        }
    }

    #handleGoodPick() {
        this.#score++
        if (this.#score > this.#highscore) {
            this.#highscore = this.#score
        }
        if (this.#levelSprites.every(sprite => sprite.picked)) {
            this.#advanceLevel()
        } else {
            // Shuffle array
            for (let i = 0; i < this.#levelSprites.length; i++) {
                const tmp = this.#levelSprites[i]
                const replacementIndex = Math.floor(Math.random() * (this.#levelSprites.length - i)) + i
                this.#levelSprites[i] = this.#levelSprites[replacementIndex]
                this.#levelSprites[replacementIndex] = tmp
            }
        }
    }

    pickSprite(id) {
        const sprite = this.#getLevelSprite(id)
        if (!sprite) {
            this.#endGame()
            throw new Error(`Sprite with id ${id} not in play`)
        }
        if (!sprite.picked) {
            sprite.picked = true
            this.#handleGoodPick()
        } else {
            this.#endGame()
        }
    }
}

let game = new Game([1,2,3,4, 5])
console.log(game.getLevelSprites(), game.getScore(), game.getMaxLevel());

game.pickSprite(1)
console.log(game.getLevelSprites(), game.getScore())

game.pickSprite(2)
game.pickSprite(3)
console.log(game.getLevelSprites(), game.getScore())

game.pickSprite(4)

console.log(game.getLevelSprites(), game.getScore())