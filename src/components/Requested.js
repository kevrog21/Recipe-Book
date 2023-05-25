import Card from './Card'
import {useEffect, useState} from 'react'
import arrow from '../assets/arrow.svg'

export default function Requested(props) {

    const cardsScrollContainer = document.getElementsByClassName('cardsScrollContainer')

    const [scrollArrowWidth, setScrollArrowWidth] = useState(15)

    function getScrollPercentage() {
        const totalElementWidth = cardsScrollContainer[`${props.index}`].scrollWidth
        const distanceScrolled = cardsScrollContainer[`${props.index}`].scrollLeft
        const visibleWidth = cardsScrollContainer[`${props.index}`].clientWidth

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

    const data = props.data

    const allRequestedRecipes = data.filter(recipe => recipe.isRequested)

    const [requestedRecipElements, setRequestedRecipes] = useState(allRequestedRecipes.map(recipe => {
            return (
                <Card 
                    key={recipe.id}
                    recipeData={recipe}
                    isFavorited={recipe.isFavorited}
                    isRequested={recipe.isRequested}
                    handleStarClick={props.handleStarClick}
                    handleBellClick={props.handleBellClick}
                    handleCardClick={props.handleCardClick}
                    // title={card.recipeHeader}
                    // subTitle={card.recipeSubHeader}
                    // img={card.recipeImage}
                    // favorited={card.isFavorited}
                    // requested={card.isRequested}
                    // uniqueID={card.uniqueIdentifier}
                />
            )
        })
    )

    useEffect(() => {
        setRequestedRecipes(data.filter(recipe => recipe.isRequested).map(recipe => (
                <Card 
                    key={recipe.id}
                    recipeData={recipe}
                    isFavorited={recipe.isFavorited}
                    isRequested={recipe.isRequested}
                    handleStarClick={props.handleStarClick}
                    handleBellClick={props.handleBellClick}
                    handleCardClick={props.handleCardClick}
                    // title={card.recipeHeader}
                    // subTitle={card.recipeSubHeader}
                    // img={card.recipeImage}
                    // favorited={card.isFavorited}
                    // requested={card.isRequested}
                    // uniqueID={card.uniqueIdentifier}
                />
            ))
        )
    }, [data])



    return (
        <div className="cardSecionContainer">
            <div className="cardSectionHeading">
                <h3 className='homescreen-section-title'>{props.title}</h3>
                <div className="scrollArrowContainer">
                    <div className='scrollProgressContainer' style={styles}>
                        <div className="scrollArrowTail"></div>
                        <img src={arrow} className="arrowHead"/>
                    </div>
                </div>
            </div>
            <div className="cardsScrollContainer" onScroll={getScrollPercentage}>
                <div className="cardsContainer">
                    {requestedRecipElements}
                    <div className='end-line'></div>
                </div>
            </div>
        </div>
    )
}