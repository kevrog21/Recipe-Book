import { useParams } from 'react-router-dom' 

export default function TempRecipeComponent() {
    const {recipeId} = useParams()
    

    return (
        <div><h2>Okay here is recipe {recipeId}</h2>
        <h2>Okay here is recipe {recipeId}</h2>
        <h2>Okay here is recipe {recipeId}</h2>
        <h2>Okay here is recipe {recipeId}</h2>
        <h2>Okay here is recipe {recipeId}</h2></div>
        
    )
}