import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react' 
import RecipeDataService from '../services/recipeList'

const RecipesList = props => {

    const [recipeData, setRecipeData] = useState([])

    useEffect(() => {
        retrieveRecipes()
    }, [])

    const retrieveRecipes = () => {
        RecipeDataService.getAll()
            .then(response => {
                console.log(response.data)
                setRecipeData(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const list = recipeData ? recipeData.map(recipe => <h4>{recipe.recipeName}</h4>) : ""

    return (
        <div>
            <h2>All Recipes</h2>
            {list}

        </div>
    )
}

export default RecipesList