import Card from './Card'
import {useEffect, useState} from 'react'
import arrow from '../assets/arrow.svg'

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

    const allFavoritedRecipes = data.filter(recipe => recipe.isFavorited)

    const favoriteRecipeElements = allFavoritedRecipes.map(recipe => {
        return (
            <Card 
                key={recipe.id}
                recipeData={recipe}
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
                    {favoriteRecipeElements}
                    <div className='end-line'></div>
                </div>
            </div>
        </div>
    )
}


    // const [favoriteRecipeElements, setFavoriteRecipeElements] = useState(allFavoritedRecipes.map(recipe => {
    //         return (
    //             <Card 
    //                 key={recipe.id}
    //                 recipeData={recipe}
    //                 // favoritedState={favoritedState}
    //                 // handleClick={toggleFavorite}
    //                 // title={card.recipeHeader}
    //                 // subTitle={card.recipeSubHeader}
    //                 // img={card.recipeImage}
    //                 // favorited={card.isFavorited}
    //                 // requested={card.isRequested}
    //                 // uniqueID={card.uniqueIdentifier}
    //             />
    //         )
    //     })
    // )
    // useEffect(() => {
    //     setFavoriteRecipeElements(allFavoritedRecipes.map(recipe => (
    //         <Card 
    //             key={recipe.id}
    //             recipeData={recipe}
    //             // title={card.recipeHeader}
    //             // subTitle={card.recipeSubHeader}
    //             // img={card.recipeImage}
    //             // favorited={card.isFavorited}
    //             // requested={card.isRequested}
    //             // uniqueID={card.uniqueIdentifier}
    //         /> 
    //     )))
    //     console.log('rendered the favorites section yo')
    // }, [data])



// export default function Favorited(props) {

    // const cardsScrollContainer = document.getElementsByClassName('cardsScrollContainer')

    // const [scrollArrowWidth, setScrollArrowWidth] = useState(15)

    // function getScrollPercentage() {
    //     const totalElementWidth = cardsScrollContainer[`${props.index}`].scrollWidth
    //     const distanceScrolled = cardsScrollContainer[`${props.index}`].scrollLeft
    //     const visibleWidth = cardsScrollContainer[`${props.index}`].clientWidth

    //     const percentage = distanceScrolled / (totalElementWidth - visibleWidth) * 85

    //     return (
    //         setScrollArrowWidth(percentage + 15)
    //     )
    // }

    // const styles = {
    //     width: `${scrollArrowWidth}% `,
    //     height: '20px',
    //     margin: `0 auto 0 0`,
    //     display: 'grid'
    // }

//     const [allFavoritededRecipes, setFavoritedRecipes] = useState(data.map(recipe => (
//             recipe.isFavorited ? 
//             <Card 
//                 key={recipe.id}
//                 recipeData={recipe}
//                 favoritedState={favoritedState}
//                 handleClick={toggleFavorite}
//                 // title={card.recipeHeader}
//                 // subTitle={card.recipeSubHeader}
//                 // img={card.recipeImage}
//                 // favorited={card.isFavorited}
//                 // requested={card.isRequested}
//                 // uniqueID={card.uniqueIdentifier}
//             /> : 
//             null
//         ))
//     )

//     function toggleFavorite(e) {
//         setFavoritedState(prevState => !prevState)
//         console.log(props.recipeData.uniqueIdentifier)
//         e.stopPropagation()
//         //map over all sections and trigger a re-render if uniqueID matches
//     }

//     // const [currentData, setData] = useState(data)

//     const [favoritedState, setFavoritedState] = useState(props.recipeData.isFavorited)

//     useEffect(() => {
//         setFavoritedRecipes(data.map(recipe => (
//             recipe.isFavorited ? 
//             <Card 
//                 key={recipe.id}
//                 recipeData={recipe}
//                 favoritedState={favoritedState}
//                 handleClick={toggleFavorite}
//                 // title={card.recipeHeader}
//                 // subTitle={card.recipeSubHeader}
//                 // img={card.recipeImage}
//                 // favorited={card.isFavorited}
//                 // requested={card.isRequested}
//                 // uniqueID={card.uniqueIdentifier}
//             /> : 
//             null
//         )))
//         console.log('rendered favorites section')
//     }, [data])


//     // const allRequestedRecipes = Data.map(recipe => 
//     //     (
//     //         recipe.isFavorited ? 
//     //         <Card 
//     //             title={recipe.recipeHeader}
//     //             subTitle={recipe.recipeSubHeader}
//     //             img={recipe.recipeImage}
//     //             favorited={recipe.isFavorited}
//     //             requested={recipe.isRequested}
//     //             key={recipe.id}
//     //         /> : 
//     //         null
//     //     )
//     // )


    

//     return (
//         <div className="cardSecionContainer">
//             <div className="cardSectionHeading">
//                 <h3 className='homescreen-section-title'>{props.title}</h3>
//                 <div className="scrollArrowContainer">
//                     <div className='scrollProgressContainer' style={styles}>
//                         <div className="scrollArrowTail"></div>
//                         <img src={arrow} className="arrowHead"/>
//                     </div>
//                 </div>
//             </div>
//             <div className="cardsScrollContainer" onScroll={getScrollPercentage}>
//                 <div className="cardsContainer">
//                     {allFavoritededRecipes}
//                     <div className='end-line'></div>
//                 </div>
//             </div>
//         </div>
//     )
// }