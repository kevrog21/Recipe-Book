import { useParams, Link } from 'react-router-dom' 
import { useState, useEffect } from 'react'
import arrow from '../assets/arrow.svg'
import greyStar from '../assets/grey-star.svg'
import bell from '../assets/bell.svg'
import filledYellowStar from '../assets/light-grey-outline.svg'
import checkmark from '../assets/checkmark.svg'
// import filledYellowStar from '../assets/filled-star-outline.svg'
import filledBell from '../assets/filled-bell.svg'

export default function RecipePage(props) {
    const {recipeId} = useParams()
    const { mongoData, handleMongoFavoriteToggle, selectedRecipe, addNewCookedDate } = props
    const [currentRecipe, setCurrentRecipe] = useState(selectedRecipe)
    const [isLoading, setIsLoading] = useState(true)
    const [ingredients, setIngredients] = useState([])
    const [tags, setTags] = useState([])
    const [timeScore, setTimeScore] = useState(null)
    const [overallScore, setOverallScore] = useState(null)

    useEffect(() => {
        if (mongoData.length > 0) {
            const recipe = mongoData.find(recipe => recipe._id === recipeId)
            setCurrentRecipe(recipe)
            setIsLoading(false)
        }
    }, [mongoData, recipeId])

    useEffect(() => {
        if (currentRecipe) {
            const ingredients = currentRecipe.ingredients.map(ingredient => {
                return (
                    <div key={ingredient.ingredientMeasurement + ingredient.ingredientName + ingredient.ingredientExtraDetail}
                             className='ingredient-preview-element'>
                            <span className='ingredient-measurement-preview'>{ingredient.ingredientMeasurement}</span>
                            <span className='ingredient-name-preview'>{ingredient.ingredientName}</span>
                            <span className='ingredient-extra-detail-preview'>{ingredient.ingredientExtraDetail}</span>
                    </div>
                )
            })
            const tags = currentRecipe.tags.map(tag => {
                return (
                    <span key={tag}
                    className='taglist'> #{tag} </span>
                )
            })
            setIngredients(ingredients)
            setTags(tags)

            setHasBeenCookedToday(() => {
                const userTimezoneOffset = new Date().getTimezoneOffset() * 60000
                const currentDateInUserTimezone = new Date(Date.now() - userTimezoneOffset)
                const currentDay = currentDateInUserTimezone.toISOString().split('T')[0]
                const lastCookedDay = currentRecipe.cookingHistoryArray.length > 0 ? currentRecipe.cookingHistoryArray[currentRecipe.cookingHistoryArray.length - 1] : new Date(2023, 0, 1).toISOString()

                const lastCookedDayDate = new Date(lastCookedDay)
                const lastCookedDayTimestamp = lastCookedDayDate.getTime()
                const lastCookedDayInUserTimezone = new Date(lastCookedDayTimestamp - userTimezoneOffset)
                const lastCookedDayString = lastCookedDayInUserTimezone.toISOString().split('T')[0]
                // console.log(lastCookedDayString, "lastCookedDayString")

                // console.log("current day", currentDay)
                // console.log("last cooked day", lastCookedDayString)

                return currentDay === lastCookedDayString
            })

            const checkmarkEl = document.getElementById('checkmark')
            console.log(checkmarkEl)
            if (checkmarkEl) {
                hasBeenCookedToday ? checkmarkEl.classList.remove('hide') : checkmarkEl.classList.add('hide')
            }

            setTimeScore(() => {
                if(currentRecipe.totalCooktime <= 30) {
                    return 10
                } else if(currentRecipe.totalCooktime <= 45) {
                    return 9
                } else if(currentRecipe.totalCooktime <= 60) {
                    return 8
                } else if(currentRecipe.totalCooktime <= 75) {
                    return 7
                } else if(currentRecipe.totalCooktime <= 90) {
                    return 6
                } else if(currentRecipe.totalCooktime <= 105) {
                    return 5
                } else if(currentRecipe.totalCooktime <= 120) {
                    return 4
                } else if(currentRecipe.totalCooktime <= 135) {
                    return 3
                } else if(currentRecipe.totalCooktime <= 150) {
                    return 2
                } else if(currentRecipe.totalCooktime <= 175) {
                    return 1
                } else {
                    return 0
                }
            }) 
        
            setOverallScore((((currentRecipe.nutritionScore + currentRecipe.costScore + currentRecipe.tastinessScore + currentRecipe.timeScore) / 40) * 10).toFixed(1))
        }
    }, [currentRecipe])

    const handleStarClick = (e) => {
        e.stopPropagation()
        handleMongoFavoriteToggle(currentRecipe._id, currentRecipe.recipeName, currentRecipe.isFavorited)
    }

    const handleCheckboxClick = (e) => {
        e.stopPropagation()
        if (!hasBeenCookedToday) {
            addNewCookedDate(currentRecipe._id, currentRecipe.recipeName, currentRecipe.cookingHistoryArray)
            setHasBeenCookedToday(true)
        }
    }

    function convertAndFormatDate(dateInUTC) {
        const userTimezoneOffset = new Date().getTimezoneOffset() * 60000
        const parsedDate = Date.parse(dateInUTC)

        if (!isNaN(parsedDate)) {
            const unformattedDate = new Date(parsedDate - userTimezoneOffset)
            const formattedDate = unformattedDate.toLocaleDateString('en-US', {
                month: 'numeric',
                day: '2-digit',
                year: 'numeric'
            })
            return formattedDate
        } else {
            console.log("Invalid Date")
        }
    }

    // const [hasBeenCookedToday, setHasBeenCookedToday] = useState(() => {
    //     const userTimezoneOffset = new Date().getTimezoneOffset() * 60000
    //     const currentDateInUserTimezone = new Date(Date.now() - userTimezoneOffset)
    //     const currentDay = currentDateInUserTimezone.toISOString().split('T')[0]

    //     console.log(currentDay)
    //     console.log(currentRecipe)
    //     currentDay === currentRecipe.cookingHistoryArray[currentRecipe.cookingHistoryArray.length - 1] ? console.log('Yes! we have a match') : console.log('no match')
    //     return currentDay === cookedArray[cookedArray.length - 1]
    //     // return currentDay === currentRecipe.lastCookedDate
    // })

    const [hasBeenCookedToday, setHasBeenCookedToday] = useState(false)

    useEffect(() => {
        const checkmarkEl = document.getElementById('checkmark')
        console.log(checkmarkEl)
        if (checkmarkEl) {
            hasBeenCookedToday ? checkmarkEl.classList.remove('hide') : checkmarkEl.classList.add('hide')
        }
    }, [hasBeenCookedToday])

    const overallScoreStyle = {
        width: `${overallScore * 10}% `,
        background: '#A541F3',
        height: '100%',
        borderRadius: '.25em'
    }

    if (isLoading) {
        return (
            <main>
                Loading...
            </main>
        )
    } else {
        return (
            <main className='recipe-page'>
                <div className='recipe-page-icon-container'>
                    <Link to='/'>
                        <div className='recipe-page-back-arrow-container no-margin'>
                            <img src={arrow} className="arrowHead back-arrowhead"/>
                            <div className='back-arrow'></div>
                        </div>
                    </Link>
                    <img className='recipe-page-star star-outline' src={currentRecipe.isFavorited ? filledYellowStar : greyStar} onClick={handleStarClick} />
                </div>
    
                <div className='recipe-page-hero' style={{backgroundImage: `linear-gradient(12deg, rgba(0, 0, 0, .95), rgba(0, 0, 0, 0) 45%), url(${currentRecipe.imgUrl})`}}>
                    <div>
                        <div id='recipe-title-overlay'>{currentRecipe.recipeName}</div>
                        <div id='recipe-subtitle-overlay'>{currentRecipe.recipeSubName}</div>
                    </div>
                </div>

                <section className='cooktime'>cooktime: {currentRecipe.totalCooktime > 60 ? `${currentRecipe.cooktimeHours} hours ${currentRecipe.cooktimeMins} mins` : `${currentRecipe.cooktimeMins} mins`}</section>
    
                <section className='ingredients-section'>
                    <h4 className='section-title'>Ingredients</h4>
                    <div className='section-arrow-container'>
                        <img src={arrow} className="arrowHead section-arrowhead"/>
                    </div>
    
                    <div className='section-content-container'>
                        {ingredients}
                    </div>
                </section>
    
                <section className='instructions-section'>
                            
                    <h4 className='section-title'>Instructions</h4>
                    <div className='section-arrow-container'>
                        <img src={arrow} className="arrowHead section-arrowhead"/>
                    </div>
                    
                    <div className='section-content-container'>
                        <p className='show-line-breaks'>{currentRecipe.instructions}</p>
                    </div>
    
                </section>
    
                <section className='notes-section'>
                            
                    <h4 className='section-title'>Notes</h4>
                    <div className='section-arrow-container'>
                        <img src={arrow} className="arrowHead section-arrowhead"/>
                    </div>
                    
                    <div className='section-content-container'>
                        <p className='show-line-breaks'>{currentRecipe.notes}</p>
                    </div>
    
                </section>
    
                <section className='stats-section'>
                            
                    <h4 className='section-title'>Stats</h4>
                    <div className='section-arrow-container'>
                        <img src={arrow} className="arrowHead section-arrowhead"/>
                    </div>
                    
                    <div className='section-content-container'>
                        <div className='overall-score-container'>Overall Score: {overallScore}  /  10
                            <div className='score-bar-background'>
                                <div className='overall-score-bar' style={overallScoreStyle}></div>
                            </div>

                        </div>
                        <p><b>cost:</b> {currentRecipe.costScore}/10</p>
                        <p><b>nutrition:</b> {currentRecipe.nutritionScore}/10</p>
                        <p><b>tastiness:</b> {currentRecipe.tastinessScore}/10</p>
                        <div><span className='weight600'>Total Times Cooked: </span> {currentRecipe.cookingHistoryArray.length}</div>
                        {(currentRecipe.cookingHistoryArray.length > 0) && <div><span className='weight600'>Last Cooked: </span> 
                            {convertAndFormatDate(currentRecipe.cookingHistoryArray[currentRecipe.cookingHistoryArray.length - 1])}</div>}
                    </div>
    
                </section>

                {tags.length > 0 && <section className='tags-section'>
                    <h4 className='section-title'>Tags</h4>
                    <div className='section-arrow-container'>
                        <img src={arrow} className="arrowHead section-arrowhead"/>
                    </div>
    
                    <div className='section-content-container tags-container'>
                        {tags}
                    </div>
                </section>}

                {currentRecipe.originalRecipeLink && <section className='original-link-section'>
                    <h4 className='section-title'>Original Recipe Link</h4>
                    <div className='section-arrow-container'>
                        <img src={arrow} className="arrowHead section-arrowhead"/>
                    </div>
    
                    <div className='section-content-container'>
                        <a href={`${currentRecipe.originalRecipeLink}`} target='_blank'>{currentRecipe.originalRecipeLink}</a>
                    </div>
                </section>}

                <div className='checkbox-container'>
                    <div id="completed-checbox" onClick={handleCheckboxClick}>
                        {hasBeenCookedToday && <img src={checkmark} id='checkmark'/>}
                    </div>
                    <div>
                        <div className='completed-text'>Check box after cooking</div>
                        <div>(to add to stats)</div>
                    </div>
                </div>

                <div className='edit-text-container'>
                    <Link to={`/${currentRecipe._id}/edit`} className='edit-recipe-link'>
                        <div className='edit-text'>Edit this recipe</div>
                    </Link>
                </div>
    
                <Link to='/' className='back-arrow-link'>
                    <div className='recipe-page-back-arrow-container bottom-back-arrow'>
                        <img src={arrow} className="arrowHead back-arrowhead"/>
                        <div className='back-arrow'></div>
                        <span id='back-text'>back</span>
                    </div>
                </Link>
    
            
            </main>
        )
    }
}