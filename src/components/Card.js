import background from '../assets/grilled-cheese-tomato-soup.jpg'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import star from '../assets/star.svg'
import bell from '../assets/bell.svg'
// import filledStar from '../assets/filled-star.svg'
// import filledBell from '../assets/filled-bell.svg'

export default function Card(props) {

const [backgroundImageURL, setBackgroundImageURL] = useState()

// useEffect(() => {
//     const importImage = async () => {
//         const imageModule = await import(`../assets/${props.recipeData.recipeImage}`)
//         setBackgroundImageURL(imageModule.default)
//     }

//     importImage()
// }, [])


const styles = {
        backgroundImage: `linear-gradient(25deg, rgba(0, 0, 0, .95), rgba(0, 0, 0, 0) 45%), url(${backgroundImageURL})`
 }
 
const handleStarClick = (e) => {
    e.stopPropagation()
    props.handleStarClick(props.recipeData.id)
}

const handleBellClick = (e) => {
    e.stopPropagation()
    props.handleBellClick(props.recipeData.id)
}

const toggleDisplayFullRecipe = (e) => {
    props.handleCardClick(props.recipeData)
}

console.log(props.recipeData)

    return (
            <div className='card' style={styles} onClick={toggleDisplayFullRecipe}>
                {/* <img className='star-icon icon-drop-shadow' src={props.isFavorited ? filledStar : star} onClick={handleStarClick} /> */}
                <div className='card-text-container'>
                    <img className='bell-icon-above-text' src={bell} alt='request icon'/>
                    <h3 className='recipe-card-name icon-drop-shadow' >{props.recipeData.recipeHeader}</h3>
                    {props.recipeData.recipeSubName && <h4 className='recipe-subheader'>{props.recipeData.recipeSubName}</h4>}
                </div>
                {/* <img className='bell-icon' src={props.recipeData.isRequested ? filledBell : bell} alt='request icon' onClick={handleBellClick} /> */}
                <Link to={`/${props.recipeData.id}`} />
            </div>
    )
}

