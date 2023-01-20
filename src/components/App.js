import './App.css'
import GameUI from './GameUI';
import data from '../sprites/descriptions.json'

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
console.log(images);


function App(props) {
    return (
        <div className="App">
            <GameUI images={images}/>
        </div>
    );
}

export default App;
