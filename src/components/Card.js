import background from '../assets/grilled-cheese-tomato-soup.jpg'
import { useState, useEffect } from 'react'
import star from '../assets/star.svg'
import bell from '../assets/bell.svg'

export default function Card(props) {

//the correct file path is '../assets/tucci-meal-img.jpg'
//it works when importing the hard coded path, but need to figure out how to 
//import it dynamically... look into require or useEffect().

const [backgroundImageURL, setBackgroundImageURL] = useState(background)

useEffect(() => {
    const importImage = async () => {
        const imageModule = await import(`../assets/${props.img}`)
        setBackgroundImageURL(imageModule.default)
    }

    importImage()
}, [])

const styles = {
//     backgroundImage: `url(${require('./assets/${props.img}').default})`
        backgroundImage: `linear-gradient(25deg, rgba(0, 0, 0, .95), rgba(0, 0, 0, 0) 45%), url(${backgroundImageURL})`
       
 }
 
    return (
        <div className='card' style={styles}>
            <img className='star-icon' src={star} alt='favorite icon'/>
            <img className='bell-icon-above-text' src={bell} alt='request icon'/>
            <h3 className='recipe-card-name'>{props.title}</h3>
            <img className='bell-icon' src={bell} alt='request icon'/>
        </div>
    )
}

