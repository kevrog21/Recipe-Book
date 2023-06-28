import { useState, useEffect } from 'react' 
import RecipeDataService from '../services/recipeList'
import image from '../assets/grilled-cheese-tomato-soup.jpg'

const RecipesList = props => {

    const [recipeData, setRecipeData] = useState([])
    // const [initialRender, setInitialRender] = useState(false)
    const [imageUrls, setImageUrls] = useState([])

    useEffect(() => {
        retrieveRecipes()
    }, [])

    useEffect(() => {
        if (recipeData.length > 0) {
            const urls =[]
            recipeData.forEach((recipe) => {
                if (recipe.imgUrl) {
                    urls.push({
                        id: recipe._id,
                        url: recipe.imgUrl
                    })
                }
            })
            setImageUrls(urls)
            console.log('image urls', urls)
            urls.forEach((imageUrl) => {
                const img = new Image()
                img.src = imageUrl.url
            })
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
            const matchedImageUrl = imageUrls.find((url) => url.id == recipe._id)
            console.log('matchedImageUrl', matchedImageUrl)

            return (
                <div key={recipe._id} className='tempDatabaseView'>
                    <h4>{recipe.recipeName}</h4>
                    { matchedImageUrl ? (
                            <img className='tempImgPreview' src={matchedImageUrl.url} alt="recipe" />
                        ) : (
                            <img className='tempImgPreview' src={imageUrl} alt="recipe" />
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