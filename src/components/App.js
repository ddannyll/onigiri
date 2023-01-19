import { useState } from 'react';
import './App.css'
import GameUI from './GameUI';


function App(props) {
    importAll = (r) => {
        let images = [];
            r.keys().forEach((item) => { images.push(r(item))});
        return images
      }
    const imagePaths = importAll(require.context('../sprites', false, /\.(png|jpe?g|svg)$/))

    const game = new Game([...imagePaths.keys()])

    return (
        <div className="App">
            <GameUI cards={game.levelSpriteList.map(id => {id, imagePaths[id]})}/>
        </div>
    );
}

export default App;
