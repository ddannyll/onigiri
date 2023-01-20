import './Card.css'

function Card (props) {
    const {onClick, image, name, description} = props
    
    return (
        <button className='card'
            onClick={onClick}
        >
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{description}</p>
        </button>
    )
}

export default Card