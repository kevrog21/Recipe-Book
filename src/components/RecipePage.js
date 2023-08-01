import { useParams, Link } from 'react-router-dom' 
import { useState, useEffect } from 'react'
import arrow from '../assets/arrow.svg'
import greyStar from '../assets/grey-star.svg'
import bell from '../assets/bell.svg'
import filledYellowStar from '../assets/light-grey-outline.svg'
// import filledYellowStar from '../assets/filled-star-outline.svg'
import filledBell from '../assets/filled-bell.svg'

export default function RecipePage(props) {
    const {recipeId} = useParams()
    const { mongoData, handleMongoFavoriteToggle, selectedRecipe } = props
    const [currentRecipe, setCurrentRecipe] = useState(selectedRecipe)
    const [isLoading, setIsLoading] = useState(true)
    const [ingredients, setIngredients] = useState([])
    const [tags, setTags]= useState([])

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
        }
    }, [currentRecipe])

    const handleStarClick = (e) => {
        e.stopPropagation()
        handleMongoFavoriteToggle(currentRecipe._id, currentRecipe.recipeName, currentRecipe.isFavorited)
    }

    const handleCheckboxClick = () => {
        setHasBeenCookedToday(true)
        // fetch request to server to add current day to cooked array
        // add total cooked number
    }

    const cookedArray = ['2023-02-31', '2023-01-31', '2023-08-01']

    const [hasBeenCookedToday, setHasBeenCookedToday] = useState(() => {
        const userTimezoneOffset = new Date().getTimezoneOffset() * 60000
        const currentDateInUserTimezone = new Date(Date.now() - userTimezoneOffset)
        const currentDay = currentDateInUserTimezone.toISOString().split('T')[0]

        console.log(currentDay)
        currentDay === cookedArray[cookedArray.length - 1] ? console.log('Yes! we have a match') : console.log('no match')
        return currentDay === cookedArray[cookedArray.length - 1]
        // return currentDay === currentRecipe.lastCookedDate
    })

    useEffect(() => {
        const checkmarkEl = document.getElementById('checkmark')
        console.log(checkmarkEl)
        if (checkmarkEl) {
            hasBeenCookedToday ? checkmarkEl.classList.remove('hide') : checkmarkEl.classList.add('hide')
        }
    }, [hasBeenCookedToday])

    if (isLoading) {
        return (
            <main>
                Loading...
            </main>
        )
    } else {
        setTimeout(() => {
            const checkmarkEl = document.getElementById('checkmark')
            console.log(checkmarkEl)
            if (checkmarkEl) {
                hasBeenCookedToday ? checkmarkEl.classList.remove('hide') : checkmarkEl.classList.add('hide')
            }
        }, 0)
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
                        <p><b>cost:</b> {currentRecipe.costScore}/10</p>
                        <p><b>nutrition:</b> {currentRecipe.nutritionScore}/10</p>
                        <p><b>tastiness:</b> {currentRecipe.tastinessScore}/10</p>
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

                <div className='checkbox-container'>
                    <div id="completed-checbox" onClick={handleCheckboxClick}>
                        <div id='checkmark' className='hide'></div>
                    </div>
                    <div>
                        <div className='completed-text'>Check box after cooking</div>
                        <div>(to add to stats)</div>
                    </div>
                </div>
    
                <Link to='/'>
                    <div className='recipe-page-back-arrow-container'>
                        <img src={arrow} className="arrowHead back-arrowhead"/>
                        <div className='back-arrow'></div>
                        <span id='back-text'>back</span>
                    </div>
                    
                </Link>
    
            
            </main>
        )
    }
}