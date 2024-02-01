import {useEffect, useState} from 'react'
import arrow from '../assets/arrow.svg'
import MongoCards from './MongoCards'

export default function RecipeSectionTemplate(props) {

    const cardsScrollContainer = document.getElementsByClassName('cardsScrollContainer')

    const [scrollAllArrow, setScrollAllArrowWidth] = useState(15)

    function getScrollPercentage() {
        const totalElementWidth = cardsScrollContainer[`${props.index + 3}`].scrollWidth
        const distanceScrolled = cardsScrollContainer[`${props.index + 3}`].scrollLeft
        const visibleWidth = cardsScrollContainer[`${props.index + 3}`].clientWidth

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

    const allSectionRecipes = data.filter(recipe => recipe.tags.includes(`${props.title}`))
    
    const [sectionCardElements, setSectionCardElements] = useState(allSectionRecipes.map(recipe => (
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
        setSectionCardElements(data.filter(recipe => recipe.tags.includes(`${props.title}`)).map(recipe => (
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
        console.log(`rendered ${props.title} section`)
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
            <div className="cardsScrollContainer" onScroll={getScrollPercentage} id={(props.index + 3) + sectionTitleWithoutSpaces}>
                <div className="cardsContainer">
                    {sectionCardElements}
                    <div className='end-line'></div>
                    {!sectionCardElements.length > 0 && <div className='nothing-here-text'>No Recipes Yet</div>}
                </div>
            </div>
        </div>
    )
}