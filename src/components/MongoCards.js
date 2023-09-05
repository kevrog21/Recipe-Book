import background from '../assets/grilled-cheese-tomato-soup.jpg'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import star from '../assets/star.svg'
import bell from '../assets/bell.svg'
import filledStar from '../assets/filled-star.svg'
import filledBell from '../assets/filled-bell.svg'

export default function MongoCards(props) {

const [isRotating, setIsRotating] = useState(false)

const styles = {
        backgroundImage: `linear-gradient(25deg, rgba(0, 0, 0, .95), rgba(0, 0, 0, 0) 45%), url(${props.recipeData.imgUrl})`
 }
 
const handleStarClick = (e) => {
    e.stopPropagation()
    setIsRotating(true)
    props.handleStarClick(props.recipeData._id, props.recipeData.recipeName, props.recipeData.isFavorited)
}

const handleBellClick = (e) => {
    e.stopPropagation()
    props.handleBellClick(props.recipeData._id, props.recipeData.recipeName, props.recipeData.isRequested)
}

const toggleDisplayFullRecipe = (e) => {
    props.handleCardClick(props.recipeData)
}

    return (
            <div className='card' style={styles} onClick={toggleDisplayFullRecipe}>
                <img className={`star-icon icon-drop-shadow ${isRotating ? 'rotating' : ''}`} src={props.isFavorited ? filledStar : star} onClick={handleStarClick} />
                <div className='card-text-container'>
                    <img className='bell-icon-above-text' src={bell} alt='request icon'/>
                    <h3 className='recipe-card-name icon-drop-shadow' >{props.recipeData.recipeName}</h3>
                    {props.recipeData.recipeSubName && <h4 className='recipe-subheader'>{props.recipeData.recipeSubName}</h4>}
                </div>
                <img className='bell-icon' src={props.recipeData.isRequested ? filledBell : bell} alt='request icon' onClick={handleBellClick} />
                <Link to={`/${props.recipeData._id}`} />
            </div>
    )
}

