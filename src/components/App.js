import Header from './Header';
import './App.css'
import GameUI from './GameUI';
import data from '../sprites/descriptions.json'
import { useState } from 'react';

const importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '').replace('.png','')] = r(item); });
    return images;
  }
const imagePaths = importAll(require.context('../sprites', false, /\.(png|jpe?g|svg)$/))
const images = data.map((description) => {
    return {
        path: imagePaths[description.id],
        name: description.name,
        description: description.description
    }
})

function App(props) {

    const [score, setScore] = useState(-1)
    const [highscore, setHighscore] = useState(-1)
    const [level, setLevel] = useState(-1)

    return (
        <div className="App">
            <Header score={score} highscore={highscore} level={level}></Header>
            <GameUI images={images} setScore={setScore} setHighscore={setHighscore} setLevel={setLevel}/>
        </div>
    );
}

export default App;
