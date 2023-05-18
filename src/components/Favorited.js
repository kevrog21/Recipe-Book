import Card from './Card'
import {useEffect, useState} from 'react'
import arrow from '../assets/arrow.svg'
import Data from '../data.js'

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

    const [allRequestedRecipes, setRequestedRecipes] = useState(Data.map(recipe => (
            recipe.isFavorited ? 
            <Card 
                title={recipe.recipeHeader}
                subTitle={recipe.recipeSubHeader}
                img={recipe.recipeImage}
                favorited={recipe.isFavorited}
                requested={recipe.isRequested}
                key={recipe.id}
                uniqueID={recipe.uniqueIdentifier}
            /> : 
            null
        ))
    )

    const [currentData, setData] = useState(Data)

    useEffect(() => {
        setRequestedRecipes(Data.map(recipe => (
            recipe.isFavorited ? 
            <Card 
                title={recipe.recipeHeader}
                subTitle={recipe.recipeSubHeader}
                img={recipe.recipeImage}
                favorited={recipe.isFavorited}
                requested={recipe.isRequested}
                key={recipe.id}
                uniqueID={recipe.uniqueIdentifier}
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
                    {allRequestedRecipes}
                    <div className='end-line'></div>
                </div>
            </div>
        </div>
    )
}