import { useState, useEffect } from 'react' 
import RecipeDataService from '../services/recipeList'
import image from '../assets/grilled-cheese-tomato-soup.jpg'

const RecipesList = props => {

    const [recipeData, setRecipeData] = useState([])
    const [initialRender, setInitialRender] = useState(false)
    let imageUrls = []

    useEffect(() => {
        retrieveRecipes()
    }, [])

    useEffect(() => {
        if (initialRender) {
            recipeData.forEach((recipe) => {
                console.log('hello')
                if (recipe.imageId) {
                    imageUrls.push({
                        id: recipe._id,
                        url: `https://res.cloudinary.com/dot31xj56/image/upload/${recipe.imgTimestamp}/${recipe.imageId}.jpg`
                    })
                }
            })
            console.log('image urls', imageUrls)
            imageUrls.forEach((imageUrl) => {
                const img = new Image()
                img.src = imageUrl.url
            })
        } else {
            setInitialRender(true)
        }
    }, [recipeData])

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

    const imageUrl = 'https://res.cloudinary.com/dot31xj56/image/upload/v1686782748/kzmuby62ud8hneqi33nu.jpg'
    // const imageUrl = 'https://res.cloudinary.com/dot31xj56/image/upload/timestamp/imageId.jpg'
    const imageUrl2 = 'https://res.cloudinary.com/dot31xj56/image/upload/v1686785261/fp9n74kbdc8dokkiadjk.jpg'
    // add onerror to image load and add a picture of an empty plate with crumbs or something to indicate no image for the recipe

    const list = recipeData ? 
        recipeData.map(recipe => {
            const matchedImageUrl = imageUrls.find((url) => url.id === recipe._id)
            console.log('matchedImageUrl', matchedImageUrl)

            return (
                <div key={recipe._id} className='tempDatabaseView'>
                    <h4>{recipe.recipeName}</h4>
                    { matchedImageUrl ? (
                            <img className='tempImgPreview' src={matchedImageUrl.url} alt="recipe image" />
                        ) : (
                            <img className='tempImgPreview' src={imageUrl} alt="recipe image" />
                        )
                    }
                    
                </div>
            )
        })
    : ""

    return (
        <div>
            <h2>All Recipes in MongoDB</h2>
            {list}
        </div>
    )
}

export default RecipesList