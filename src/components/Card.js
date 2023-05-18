import background from '../assets/grilled-cheese-tomato-soup.jpg'
import { useState, useEffect } from 'react'
import star from '../assets/star.svg'
import bell from '../assets/bell.svg'
import filledStar from '../assets/filled-star.svg'
import filledBell from '../assets/filled-bell.svg'

export default function Card(props) {

const [backgroundImageURL, setBackgroundImageURL] = useState(background)

useEffect(() => {
    const importImage = async () => {
        const imageModule = await import(`../assets/${props.img}`)
        setBackgroundImageURL(imageModule.default)
    }

    importImage()
}, [])

const [favoritedState, setFavoritedState] = useState(props.favorited)

function toggleFavorite() {
    setFavoritedState(prevState => !prevState)
    console.log(props.uniqueID)
}

function  showRecipe() {
    console.log(props.uniqueID)
}

const styles = {
//     backgroundImage: `url(${require('./assets/${props.img}').default})`
        backgroundImage: `linear-gradient(25deg, rgba(0, 0, 0, .95), rgba(0, 0, 0, 0) 45%), url(${backgroundImageURL})`
       
 }
 
    return (
        <div className='card' style={styles} onClick={showRecipe}>
            <img className='star-icon icon-drop-shadow' src={favoritedState ? filledStar : star} onClick={toggleFavorite} alt='favorite icon'/>
            <div className='card-text-container'>
                <img className='bell-icon-above-text' src={bell} alt='request icon'/>
                <h3 className='recipe-card-name icon-drop-shadow' >{props.title}</h3>
                {props.subTitle && <h4 className='recipe-subheader'>{props.subTitle}</h4>}
            </div>
            <img className='bell-icon' src={props.requested ? filledBell : bell} alt='request icon'/>
        </div>
    )
}

