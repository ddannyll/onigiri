import { useEffect, useState } from "react";
import Game from "../Game";

function GameUI (props) {
    const {imagePaths} = props

    const [game, setGame] = useState(new Game(imagePaths))
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
        <button key={card.id} onClick={() => pickSprite(card.id)}>
            <img src={card.id} alt="test" />
        </button>
    )


    return (
        <div>
            <h2>
                {"Level: " + game.level}
            </h2>
            {game.level == 0 
                ? <>
                    <h3>Game Over!</h3>
                    <button onClick={restartGame}>Restart</button>
                </>
                : <>{cards}</>
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