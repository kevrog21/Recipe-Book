import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react' 
import RecipeDataService from '../services/recipeList'

const RecipesList = props => {

    // const [recipeData, setRecipeData] = useState([])

    // useEffect(() => {
    //     retrieveRecipes()
    // }, [])

    // const retrieveRecipes = () => {
    //     RecipeDataService.getAll()
    //         .then(response => {
    //             console.log(response.data)
    //             setRecipeData(response.data.recipes)
    //         })
    //         .catch(e => {
    //             console.log(e)
    //         })
    // }

    return (
        <div>
            <h2>All Recipes</h2>
            {/* <h4>{recipeData}</h4> */}

        </div>
    )
}

export default RecipesList