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

  // const [recipes, setRecipes] = useState(data)

  const [recipeData, setRecipeData] = useState([])
  const [itemCount, setItemCount] = useState(recipeData.length)

  const retrieveRecipes = () => {
    RecipeDataService.getAll()
    .then(response => {
        setRecipeData(response.data)
        setItemCount(response.data.length)
        console.log('recipes retrieved')
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

    const handleMongoFavoriteToggle = async (recipeID, recipeName, prevFavoritedStatus) => {
      console.log('mongo favorite toggle is running', recipeID, recipeName, prevFavoritedStatus)
      // database fetch request

      try {
        const response = await fetch(`http://localhost:5000/recipes/toggleFavorite/${recipeID}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipeName: recipeName,
            isFavorited: prevFavoritedStatus
          })
        })

        if (response.ok) {
          console.log('successfuly updated the favorited status')
          retrieveRecipes()
        }

      } catch (error) {
        console.log(error)
      }
    }

  return (
    <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={
            <Homescreen 
              // data={recipes}
              mongoData={recipeData}
              // handleFavoriteToggle={handleFavoriteToggle}
              // handleRequestToggle={handleRequestToggle}
              handleSelectedRecipe={handleSelectedRecipe}
              handleMongoFavoriteToggle={handleMongoFavoriteToggle}
            />} />

          <Route path="/:recipeId" element={
            <RecipePage 
              // data={recipes}
              mongoData={recipeData}
              // handleFavoriteToggle={handleFavoriteToggle}
              // handleRequestToggle={handleRequestToggle}
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
