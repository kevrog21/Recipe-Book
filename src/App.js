import './App.css';
import { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Homescreen from './components/Homescreen'
import RecipePage from './components/RecipePage'
import AddRecipeForm from './components/AddRecipeForm'
import data from './data'
import RecipeDataService from './services/recipeList'

export default function App() {

  const [recipes, setRecipes] = useState(data)

  const [recipeData, setRecipeData] = useState([])
  const [itemCount, setItemCount] = useState(recipeData.length)

  const retrieveRecipes = () => {
    RecipeDataService.getAll()
    .then(response => {
        setRecipeData(response.data)
        setItemCount(response.data.length)
    })
    .catch(e => {
        console.log(e)
    })
  }

  useEffect(() => {
      retrieveRecipes()
  }, [])

//   useEffect(() => {
//     if (recipeData.length > 0) {
//         const urls =[]
//         recipeData.forEach((recipe) => {
//             if (recipe.imgUrl) {
//                 urls.push({
//                     id: recipe._id,
//                     url: recipe.imgUrl
//                 })
//             }
//         })
//         setImageUrls(urls)
//         console.log('image urls', urls)
//         urls.forEach((imageUrl) => {
//             const img = new Image()
//             img.src = imageUrl.url
//         })
//     } 
// }, [recipeData])

    const [selectedRecipe, setSelectedRecipe] = useState()

    const handleSelectedRecipe = (clickedRecipe) => {
        setSelectedRecipe(clickedRecipe)
    }

    const handleFavoriteToggle = (recipeID) => {
        // update database with new value and send an error if unsuccessful
        console.log(recipeID)
        setRecipes(prevRecipes => {
            return prevRecipes.map(recipe => {
                if (recipe.id === recipeID) {
                    return {
                        ...recipe,
                        isFavorited: !recipe.isFavorited
                    }
                }
                return recipe
            })
        })
        // or you can update database with new value if you want the UI to update quicker
    }

    const handleMongoFavoriteToggle = (recipeID) => {
      console.log('mongo favorite toggle is running', recipeID )
    }

    const handleRequestToggle = (recipeID) => {
        console.log(recipeID)
        setRecipes(prevRecipes => {
            return prevRecipes.map(recipe => {
                if (recipe.id === recipeID) {
                    return {
                        ...recipe,
                        isRequested: !recipe.isRequested
                    }
                }
                return recipe
            })
        })
    }

  return (
    <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={
            <Homescreen 
              data={recipes}
              mongoData={recipeData}
              handleFavoriteToggle={handleFavoriteToggle}
              handleRequestToggle={handleRequestToggle}
              handleSelectedRecipe={handleSelectedRecipe}
              handleMongoFavoriteToggle={handleMongoFavoriteToggle}
            />} />

          <Route path="/:recipeId" element={
            <RecipePage 
              data={recipes}
              mongoData={recipeData}
              handleFavoriteToggle={handleFavoriteToggle}
              handleRequestToggle={handleRequestToggle}
              handleSelectedRecipe={handleSelectedRecipe}
            />} />
          <Route path="/add-recipe" element={
            <AddRecipeForm 
              retrieveRecipes={retrieveRecipes}
            />
          } />
        </Routes>
        <Footer />
    </Router>

    // <div>
    //   <Header />

    //   <Routes>
    //     <Route exact path='/' element={<Homescreen />}/>
    //     <Route path={`/:recipeId`} element={<RecipePage />}/>
    //   </Routes>

    // </div>
  )
}
