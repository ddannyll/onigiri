import './App.css'
import GameUI from './GameUI';
import Game from '../Game';
import { useState } from 'react';


function App(props) {
    const importAll = (r) => {
        let images = [];
            r.keys().forEach((item) => { images.push(r(item))});
        return images
      }
    const imagePaths = importAll(require.context('../sprites', false, /\.(png|jpe?g|svg)$/))

    return (
        <div className="App">
            <GameUI imagePaths={imagePaths}/>
        </div>
    );
}

export default App;
