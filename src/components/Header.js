import './Header.css'
import Onigiri from '../sprites/jpf14.png'

const Header = (props) => {
    const {score, highscore, level} = props

    return (
        <div className="backgroundContainer">
            <header>
                <div className="logo">
                    <img src={Onigiri} alt="" />
                    <h1>Onigiri</h1>
                </div>
                <div className="stats">
                    <p>Score: {score}</p>
                    <p>Best: {highscore}</p>
                    <p>Level: {level}</p>
                </div>
            </header>
        </div>
    )
}

export default Header