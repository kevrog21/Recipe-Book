import background from '../assets/grilled-cheese-tomato-soup.jpg'
import { useState, useEffect } from 'react'

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
       backgroundImage: `url(${backgroundImageURL})`
 }
 
    return (
        <div className='card' style={styles}>
            <h3>{props.title}</h3>
        </div>
    )
}

