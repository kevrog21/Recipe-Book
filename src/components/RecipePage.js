import { useParams } from 'react-router-dom' 
import { useState, useEffect } from 'react'

export default function RecipePage(props) {
    const {recipeId} = useParams()
    const { data } = props
    const currentRecipe = data.find(recipe => recipe.id === recipeId)

    const [headerImage, setHeaderImageURL] = useState()

    useEffect(() => {
        const importImage = async () => {
            const imageModule = await import(`../assets/${currentRecipe.recipeImage}`)
            setHeaderImageURL(imageModule.default)
        }
    
        importImage()
        console.log(currentRecipe.recipeImage)
    }, [])

    return (
        <main>
            <h2>Okay here is recipe {recipeId}</h2>
            <h2>Okay here is recipe {recipeId}</h2>
            <h2>Okay here is recipe {recipeId}</h2>
            <h2>Okay here is recipe {recipeId}</h2>
            <h2>Okay here is recipe {recipeId}. It is the recipe with the name of {currentRecipe.recipeHeader}</h2>
            <img className="header-img" src={headerImage} alt="" />
            {/* <img src={require(imagePath).default} /> */}
            {/* <img src={`../assets/${headerImage}.jpg`} /> */}
        </main>
    )
}