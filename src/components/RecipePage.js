import { useParams } from 'react-router-dom'

export default function RecipePage(props) {
    
    const { recipeId } = useParams()
    console.log(recipeId)

    // const currentRecipe = props.data.find(recipe => recipe.id === recipeId)

    return (
        <div>
            <h2>Now Showing a recipe page!</h2>
        </div>
    )
}