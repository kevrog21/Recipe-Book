import { useParams, Link } from 'react-router-dom' 
import { useState, useEffect } from 'react'
import arrow from '../assets/arrow.svg'

export default function RecipePage(props) {
    const {recipeId} = useParams()
    const { mongoData } = props

    const currentRecipe = mongoData.find(recipe => recipe._id === recipeId)

    console.log(currentRecipe)

    const [headerImage, setHeaderImageURL] = useState()

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

    return (
        <main className='recipe-page'>
            <Link to='/'>
                <div className='recipe-page-back-arrow-container'>
                    <img src={arrow} className="arrowHead back-arrowhead"/>
                    <div className='back-arrow'></div>
                </div>
            </Link>
            <h2 className='recipe-title'>{currentRecipe.recipeName}</h2>

            <div className='recipe-page-hero' style={{backgroundImage: `url(${currentRecipe.imgUrl})`}}>
                
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
                    <p>{currentRecipe.instructions}</p>
                </div>

            </section>

            <section className='notes-section'>
                        
                <h4 className='section-title'>Notes</h4>
                <div className='section-arrow-container'>
                    <img src={arrow} className="arrowHead section-arrowhead"/>
                </div>
                
                <div className='section-content-container'>
                    <p>{currentRecipe.notes}</p>
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