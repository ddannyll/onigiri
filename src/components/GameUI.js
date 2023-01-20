import { useState, useEffect } from "react";
import Game from "../Game";
import Card from "./Card";

function GameUI (props) {
    const {images} = props

    const [game] = useState(new Game([...images.keys()]))
    const [levelSprites, setLevelSprites] = useState(game.levelSpriteList)

    const pickSprite = (id) => {
        game.pickSprite(id)
        setLevelSprites(game.levelSpriteList)
    }

    const restartGame = () => {
        game.restartGame()
        setLevelSprites(game.levelSpriteList)
    }


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


    return (
        <div>
            <h2>
                {"Level: " + game.level}
            </h2>
            {game.gameState !== Game.GAME_STATES.play
                ? <>
                    <h3>Game Over!</h3>
                    <button onClick={restartGame}>Restart</button>
                </>
                : <div className="cards">{cards}</div>
            }
            <h2>
                {"Score: " + game.score}
            </h2>
            <h2>
                {"Highscore: " + game.highscore}
            </h2>
        </div>
    )
}

export default GameUI