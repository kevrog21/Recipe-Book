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

    const [formData, setFormData] = useState({
        recipeName: '',
        instructions: '',
        cooktime: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        const isNumericField = ["cooktime"].includes(name) //returns true if the target name is included in the array
        setFormData((prevData) => ({
            ...prevData,
            [name]: isNumericField ? parseInt(value) : value
        }))
        console.log(formData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const options = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch("http://localhost:5000/recipes/add", options)
            .then(res => res.json())
            .then(data => console.log(data))
    }

    // submitBtn.addEventListener("submit", submitRecipe)

    return (
        <div>
            <h2>Add Recipes</h2>
            {list}

            <form className="add-recipe-form" onSubmit={handleSubmit}>
                <label for="recipe-name">Recipe Name:</label>
                <input type="text" id="recipe-name" name="recipeName" value={formData.recipeName} onChange={handleChange}></input>
                <label for="instructions">Instructions:</label>
                <input type="text" id="instructions" name="instructions" value={formData.instructions} onChange={handleChange}></input>
                <label for="cooktime">Cooktime:</label>
                <input type="number" id="cooktime" name="cooktime" value={formData.cooktime} onChange={handleChange}></input>
                <button type="submit" className="submit-recipe-btn" id="submit" >Submit Recipe</button>
            </form>

        </div>
    )
}

export default RecipesList