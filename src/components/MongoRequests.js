import {useEffect, useState} from 'react'
import arrow from '../assets/arrow.svg'
import MongoCards from './MongoCards'

export default function Favorited(props) {

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

    const [requestedRecipeElements, setRequestedRecipeElements] = useState(allRequestedRecipes.map(recipe => {
        return (
            <MongoCards 
                key={recipe._id}
                recipeData={recipe}
                isFavorited={recipe.isFavorited}
                isRequested={recipe.isRequested}
                handleStarClick={props.handleMongoFavoriteToggle}
                handleBellClick={props.handleMongoRequestToggle}
                handleCardClick={props.handleCardClick}
                // favoritedState={favoritedState}
                // handleClick={toggleFavorite}
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
        setRequestedRecipeElements(data.filter(recipe => recipe.isRequested).map(recipe => (
            <MongoCards 
                key={recipe._id}
                recipeData={recipe}
                isFavorited={recipe.isFavorited}
                isRequested={recipe.isRequested}
                handleStarClick={props.handleMongoFavoriteToggle}
                handleBellClick={props.handleMongoRequestToggle}
                handleCardClick={props.handleCardClick}
                // title={card.recipeHeader}
                // subTitle={card.recipeSubHeader}
                // img={card.recipeImage}
                // favorited={card.isFavorited}
                // requested={card.isRequested}
                // uniqueID={card.uniqueIdentifier}
            /> 
        )))
        console.log('rendered the favorites section yo')
    }, [data])

    const sectionTitleWithoutSpaces = props.title.replace(/\s/g, '')

    return (
        <div className="cardSectionContainer">
            <div className="cardSectionHeading">
                <h3 className='homescreen-section-title'>{props.title}</h3>
                <div className="scrollArrowContainer">
                    <div className='scrollProgressContainer' style={styles}>
                        <div className="scrollArrowTail"></div>
                        <img src={arrow} className="arrowHead"/>
                    </div>
                </div>
            </div>
            <div className="cardsScrollContainer" onScroll={getScrollPercentage} id={props.index + sectionTitleWithoutSpaces}>
                <div className="cardsContainer">
                    {requestedRecipeElements}
                    <div className='end-line'></div>
                </div>
            </div>
        </div>
    )
}