import MongoCards from './MongoCards'
import {useEffect, useState} from 'react'
import arrow from '../assets/arrow.svg'

export default function AllMongoRecipes(props) {

    const cardsScrollContainer = document.getElementsByClassName('cardsScrollContainer')

    const [scrollAllArrow, setScrollAllArrowWidth] = useState(15)

    function getScrollPercentage() {
        const totalElementWidth = cardsScrollContainer[`${props.index}`].scrollWidth
        const distanceScrolled = cardsScrollContainer[`${props.index}`].scrollLeft
        const visibleWidth = cardsScrollContainer[`${props.index}`].clientWidth

        const percentage = distanceScrolled / (totalElementWidth - visibleWidth) * 85

        return (
            setScrollAllArrowWidth(percentage + 15)
        )
    }

    const styles = {
        width: `${scrollAllArrow}% `,
        height: '20px',
        margin: `0 auto 0 0`,
        display: 'grid'
    }

    const data = props.data

    const allBasicsRecipes = data.filter(recipe => recipe.tags.includes('basics'))
    
    const [basicsRecipeElements, setAllbasics] = useState(allBasicsRecipes.map(recipe => (
            <MongoCards 
                key={recipe._id}
                recipeData={recipe}
                isFavorited={recipe.isFavorited}
                isRequested={recipe.isRequested}
                handleStarClick={props.handleMongoFavoriteToggle}
                handleBellClick={props.handleBellClick}
                handleCardClick={props.handleCardClick}
                handleMongoFavoriteToggle={props.handleMongoFavoriteToggle}
            /> 
        ))
    )

    useEffect(() => {
        setAllbasics(data.filter(recipe => recipe.tags.includes('basics')).map(recipe => (
            <MongoCards 
                key={recipe._id}
                recipeData={recipe}
                isFavorited={recipe.isFavorited}
                isRequested={recipe.isRequested}
                handleStarClick={props.handleMongoFavoriteToggle}
                handleBellClick={props.handleMongoRequestToggle}
                handleCardClick={props.handleCardClick}
                handleMongoFavoriteToggle={props.handleMongoFavoriteToggle}
            /> 
        )))
        console.log('rendered basics section')
    }, [data])




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
            <div className="cardsScrollContainer" onScroll={getScrollPercentage}>
                <div className="cardsContainer">
                    {basicsRecipeElements}
                    <div className='end-line'></div>
                    {!basicsRecipeElements.length > 0 && <div className='nothing-here-text'>No Recipes Yet</div>}
                </div>
            </div>
        </div>
    )
}