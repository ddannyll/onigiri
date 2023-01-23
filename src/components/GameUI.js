import { useState, useEffect } from "react";
import './GameUI.css'
import Game from "../Game";
import Card from "./Card";

function GameUI (props) {
    const {images, setScore, setHighscore, setLevel} = props

    const [help, setHelp] = useState(true)
    const [game] = useState(new Game([...images.keys()]))
    const [levelSprites, setLevelSprites] = useState(game.levelSpriteList)

    const setAll = () => {
        setScore(game.score)
        setHighscore(game.highscore)
        setLevel(game.level)
    }

    const pickSprite = (id) => {
        game.pickSprite(id)
        setLevelSprites(game.levelSpriteList)
    }

    const restartGame = () => {
        game.restartGame()
        setLevelSprites(game.levelSpriteList)
    }

    useEffect(() => {
        setAll()
    })


    const cards = levelSprites.map(card => 
        {
            return (
                <Card
                    key={card.id}
                    onClick={() => pickSprite(card.id)}
                    image={images[card.id].path}
                    name={images[card.id].name}
                    description={images[card.id].description}
                />
            )
        }
    )

    const getMain = () => {
        if (help) {
            return (<div className="gameOver">
                <h3>Click as many sprites <em>without</em> clicking the same one twice!</h3>
                <button onClick={() => {restartGame(); setHelp(false)}}>Start!</button>
            </div>)
        }
        return game.gameState !== Game.GAME_STATES.play
        ? <div className="gameOver">
            <h3>Game Over!</h3>
            <button onClick={restartGame}>Restart</button>
        </div>
        : <div className="cards">{cards}</div>
    }


    return (
        <div className="gameUI">
            {getMain()}
        </div>
    )
}

export default GameUI