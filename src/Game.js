import uniqid from 'uniqid';
class Game {
    
    static GAME_STATES = {
        'play': Symbol('play'),
        'won': Symbol('won'),
        'lost': Symbol('lost'),
    }

    #gameState
    #spriteList
    #levelSpriteList
    #level
    #score 
    #highscore
    #maxLevel
    
    constructor(spriteList) {
        this.#spriteList = spriteList.map(sprite => {return {id: sprite, picked:false}})
        this.#levelSpriteList = []
        this.#gameState = Game.GAME_STATES.play
        this.#highscore = 0
        this.#maxLevel = this.#getMaxLevel()
        if (this.#maxLevel < 1) {
            throw new Error('Invalid spriteList')
        }
        this.restartGame()
    }

    get gameState() {
        return this.#gameState
    }

    get level() {
        return this.#level
    }

    get score() {
        return this.#score
    }

    get highscore() {
        return this.#highscore
    }

    get levelSpriteList() {
        return structuredClone(this.#levelSpriteList)
    }

    get spriteList() {
        return structuredClone(this.#spriteList)
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

    #getUnpickedSpriteList() {
        return this.#spriteList.filter(sprite => !sprite.picked)
    }

    #getLevelSprite(id) {
        return this.#levelSpriteList.find(curr => curr.id === id)
    }

    #nextLevel() {
        this.#level++
        if (this.#level > this.#maxLevel) {
            this.#gameState = Game.GAME_STATES.won
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
        if (this.#gameState !== Game.GAME_STATES.play) {
            throw new Error(`Incorrect game state: ${this.#gameState.description} 
                             Must be in ${Game.GAME_STATES.play.description}`)
        }
        
        const sprite = this.#getLevelSprite(id)
        if (!sprite) {
            throw new Error(`Sprite with id ${id} not in play`)
        }

        if (!sprite.picked) {
            sprite.picked = true
            this.#handleGoodPick()
        } else {
            this.#gameState = Game.GAME_STATES.lost
        }
    }

    restartGame() {
        this.#level = 0
        this.#score = 0
        this.#levelSpriteList = []
        this.#spriteList.forEach(sprite => sprite.picked = false)
        this.#gameState = Game.GAME_STATES.play
        this.#nextLevel()
    }
}

export default Game