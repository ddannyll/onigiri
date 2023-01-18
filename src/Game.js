class Game {
    #spriteList
    #levelSpriteList
    #level
    #score 
    #highscore
    #maxLevel
    
    constructor(spriteList) {
        this.#spriteList = spriteList.map(sprite => {return {id: sprite, picked:false}})
        this.#levelSpriteList = []
        this.#level = 0
        this.#score = 0
        this.#highscore = 0
        this.#maxLevel = this.#getMaxLevel()
        if (this.#maxLevel < 1) {
            throw new Error('Invalid spriteList')
        }
        this.#nextLevel()
    }

    get level() {
        return this.#level
    }

    get score() {
        return this.#score
    }

    get highscore() {
        return this.#score
    }

    get levelSpriteList() {
        return structuredClone(this.#levelSpriteList)
    }

    get spriteList() {
        return structuredClone(this.#spriteList)
    }

    get maxLevel() {
        return this.#maxLevel
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
        this.#levelSpriteList = []
        this.#spriteList.forEach(sprite => sprite.picked = false)
    }

    #getUnpickedSpriteList() {
        return this.#spriteList.filter(sprite => !sprite.picked)
    }

    #getLevelSprite(id) {
        return this.#levelSpriteList.find(curr => curr.id === id)
    }

    #nextLevel() {
        this.#level++
        if (this.#level > this.#maxLevel) {
            this.#endGame()
            return
        }
        this.#levelSpriteList = []
        let unpickedSprites = this.#getUnpickedSpriteList()
        for (let i = 0; i < this.#getNumLevelSprites(this.#level); i++) {
            const chosenIndex = Math.floor(Math.random() * unpickedSprites.length)
            const randomSprite = unpickedSprites[chosenIndex]
            this.#levelSpriteList.push(randomSprite)
            unpickedSprites = unpickedSprites.slice(0, chosenIndex).concat(unpickedSprites.slice(chosenIndex + 1))
        }
    }

    #handleGoodPick() {
        this.#score++
        if (this.#score > this.#highscore) {
            this.#highscore = this.#score
        }
        if (this.#levelSpriteList.every(sprite => sprite.picked)) {
            this.#nextLevel()
        } else {
            // Shuffle array
            for (let i = 0; i < this.#levelSpriteList.length; i++) {
                const tmp = this.#levelSpriteList[i]
                const replacementIndex = Math.floor(Math.random() * (this.#levelSpriteList.length - i)) + i
                this.#levelSpriteList[i] = this.#levelSpriteList[replacementIndex]
                this.#levelSpriteList[replacementIndex] = tmp
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
console.log(game.levelSpriteList, game.spriteList, "score" + game.score, "maxLevel" + game.maxLevel, "level" + game.level);
game.spriteList.pop()
game.pickSprite(1)
console.log(game.levelSpriteList, game.spriteList, "score" + game.score, "maxLevel" + game.maxLevel, "level" + game.level);

