import { useState } from 'react';
import './App.css'

function importAll(r) {
    let images = [];
        r.keys().forEach((item) => { images.push(r(item))});
    return images
}

const imagePaths = importAll(require.context('../sprites', false, /\.(png|jpe?g|svg)$/))


function App() {
    const NUM_IMAGES = 6
    
    const getImages = (numImages) => {
        const gameImagesPaths = []
        let imagePathsUnused = imagePaths
        for (let i = 0; i < numImages; i++) {
            const randomIndex = parseInt(Math.random() * imagePathsUnused.length)
            gameImagesPaths.push(imagePathsUnused[randomIndex])
            imagePathsUnused = imagePathsUnused.slice(0, randomIndex).concat(imagePathsUnused.slice(randomIndex + 1))
        }
        const gameImages = gameImagesPaths.map(imagePath => 
            <img key={imagePath} src={imagePath} alt='gameImage'/>
        )
        return gameImages
    }

    const [state, setState] = useState(getImages(NUM_IMAGES)) 

    return (
        <div className="App">
            {state}
            <button onClick={() => {setState(getImages(NUM_IMAGES))}}>
                Refresh!
            </button>
        </div>
    );
}

export default App;
