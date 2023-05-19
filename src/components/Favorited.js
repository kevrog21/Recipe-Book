import Card from './Card'
import {useEffect, useState} from 'react'
import arrow from '../assets/arrow.svg'
import Data from '../data.js'

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

    const [allFavoritededRecipes, setFavoritedRecipes] = useState(Data.map(recipe => (
            recipe.isFavorited ? 
            <Card 
                key={recipe.id}
                recipeData={recipe}
                // title={card.recipeHeader}
                // subTitle={card.recipeSubHeader}
                // img={card.recipeImage}
                // favorited={card.isFavorited}
                // requested={card.isRequested}
                // uniqueID={card.uniqueIdentifier}
            /> : 
            null
        ))
    )

    const [currentData, setData] = useState(Data)

    useEffect(() => {
        setFavoritedRecipes(Data.map(recipe => (
            recipe.isFavorited ? 
            <Card 
                key={recipe.id}
                recipeData={recipe}
                // title={card.recipeHeader}
                // subTitle={card.recipeSubHeader}
                // img={card.recipeImage}
                // favorited={card.isFavorited}
                // requested={card.isRequested}
                // uniqueID={card.uniqueIdentifier}
            /> : 
            null
        )))
        console.log('rendered favorites')
    }, [Data])


    // const allRequestedRecipes = Data.map(recipe => 
    //     (
    //         recipe.isFavorited ? 
    //         <Card 
    //             title={recipe.recipeHeader}
    //             subTitle={recipe.recipeSubHeader}
    //             img={recipe.recipeImage}
    //             favorited={recipe.isFavorited}
    //             requested={recipe.isRequested}
    //             key={recipe.id}
    //         /> : 
    //         null
    //     )
    // )


    

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
                    {allFavoritededRecipes}
                    <div className='end-line'></div>
                </div>
            </div>
        </div>
    )
}