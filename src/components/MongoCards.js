import background from '../assets/grilled-cheese-tomato-soup.jpg'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import star from '../assets/star.svg'
import bell from '../assets/bell.svg'
import filledStar from '../assets/filled-star.svg'
import filledBell from '../assets/filled-bell.svg'

export default function MongoCards(props) {

const [isRotating, setIsRotating] = useState(false)
const [isRinging, setIsRinging] = useState(false)
const [rotationDirection, setRotationDirection] = useState()

const styles = {
        backgroundImage: `linear-gradient(25deg, rgba(0, 0, 0, .95), rgba(0, 0, 0, 0) 45%), url(${props.recipeData.imgUrl})`
 }
 
const handleStarClick = (e) => {
    e.stopPropagation()
    setRotationDirection(props.recipeData.isFavorited ? 'unrotate' : 'rotate')
    setIsRotating(true)
    props.handleStarClick(props.recipeData._id, props.recipeData.recipeName, props.recipeData.isFavorited)
    setTimeout(() => {
        setIsRotating(false)
    }, 1000)
}

const handleBellClick = (e) => {
    e.stopPropagation()
    props.handleBellClick(props.recipeData._id, props.recipeData.recipeName, props.recipeData.isRequested)
    setIsRinging(true)
    setTimeout(() => {
        setIsRinging(false)
    }, 1000)
}

    return (
        <div className='card' style={styles}>   
            <Link to={`/${props.recipeData._id}`} className='card-link-container'>
                <div className='card-text-container'>
                    <h3 className='recipe-card-name icon-drop-shadow' >{props.recipeData.recipeName}</h3>
                    {props.recipeData.recipeSubName && <h4 className='recipe-subheader'>{props.recipeData.recipeSubName}</h4>}
                </div>
            </Link>
            <div className='star-icon-container'>
                <img className={`star-icon icon-drop-shadow ${isRotating ? rotationDirection : ''}`} src={props.isFavorited ? filledStar : star} onClick={handleStarClick} />
            </div>
            <img className={`bell-icon ${isRinging ? 'ringing' : ''}`} src={props.recipeData.isRequested ? filledBell : bell} alt='request icon' onClick={handleBellClick} />
        </div>
    )
}

