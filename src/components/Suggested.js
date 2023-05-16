import Card from './Card'
import {useState} from 'react'
import arrow from '../assets/arrow.svg'
import Data from '../data.js'

export default function Suggested(props) {

    const scrollArrow = document.getElementsByClassName('scrollArrow')
    const cardsScrollContainer = document.getElementsByClassName('cardsScrollContainer')

    const [scrollArrowWidth, setScrollArrowWidth] = useState(15)

    function getScrollPercentage() {
        const totalElementWidth = cardsScrollContainer[0].scrollWidth
        const distanceScrolled = cardsScrollContainer[0].scrollLeft
        const visibleWidth = cardsScrollContainer[0].clientWidth

        const percentage = distanceScrolled / (totalElementWidth - visibleWidth) * 85

        return (
            setScrollArrowWidth(percentage + 15)
        )
    }

    const styles = {
        width: `${scrollArrowWidth}% `,
        height: '20px',
        margin: `0 auto 0 0`,
        display: 'grid'
    }

    const cardElements = Data.map(card => {
        return (
            <Card 
                title={card.recipeName}
                img={card.recipeImage}
                key={card.id}
            />
        )
    })



    return (
        <div className="cardSecionContainer">
            <div className="cardSectionHeading">
                <h3>{props.title}</h3>
                <div className="scrollArrowContainer">
                    <div className='scrollProgressContainer' style={styles}>
                        <div className="scrollArrowTail"></div>
                        <img src={arrow} className="arrowHead"/>
                    </div>
                </div>
            </div>
            <div className="cardsScrollContainer" onScroll={getScrollPercentage}>
                <div className="cardsContainer">
                    {cardElements}
                </div>
            </div>
        </div>
    )
}