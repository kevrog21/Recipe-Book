import './App.css';
import { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Homescreen from './components/Homescreen'
import RecipePage from './components/RecipePage'
import AddRecipeForm from './components/AddRecipeForm'
import EditRecipeForm from './components/EditRecipeForm'
import RecipeDataService from './services/recipeList'
import ScrollToTop from './components/ScrollToTop'
import Settings from './components/Settings'
import Blog from './components/Blog'

export default function App() {

  // const [recipes, setRecipes] = useState(data)

  const [recipeData, setRecipeData] = useState([])
  const [itemCount, setItemCount] = useState(recipeData.length)

  const retrieveRecipes = () => {
    RecipeDataService.getAll()
    .then(response => {
        setRecipeData(response.data)
        setItemCount(response.data.length)
        console.log('recipes retrieveddd')
        console.log(response.data)
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

    const addNewCookedDate = async (recipeID, recipeName, prevCookingHistoryArray) => {
      console.log(prevCookingHistoryArray)
      console.log('running check box click function')
      const currentDate = new Date()
      const currentUTCDate = currentDate.toISOString()
        try {
          const response = await fetch(`https://bastebook.com/recipes/addCookedDate/${recipeID}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipeName: recipeName,
              cookingHistoryArray: [...prevCookingHistoryArray, currentUTCDate]
            })
          })

          if (response.ok) {
            console.log('successfuly updated the cooking history array')
            retrieveRecipes()
          }

        } catch (error) {
          console.log(error)
        }
    }

    const handleMongoFavoriteToggle = async (recipeID, recipeName, prevFavoritedStatus) => {
      console.log('mongo favorite toggle is running', recipeID, recipeName, prevFavoritedStatus)
      // database fetch request

      try {
        const response = await fetch(`https://bastebook.com/recipes/toggleFavorite/${recipeID}`, {
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

    const handleMongoRequestToggle = async (recipeID, recipeName, prevRequestStatus) => {
      console.log('mongo favorite toggle is running', recipeID, recipeName, prevRequestStatus)
      // database fetch request

      try {
        const response = await fetch(`https://bastebook.com/recipes/toggleRequest/${recipeID}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipeName: recipeName,
            isRequested: prevRequestStatus
          })
        })

        if (response.ok) {
          console.log('successfuly updated the Request status')
          retrieveRecipes()
        }

      } catch (error) {
        console.log(error)
      }
    }

  return (
    <Router>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={
            <Homescreen 
              // data={recipes}
              mongoData={recipeData}
              // handleFavoriteToggle={handleFavoriteToggle}
              // handleRequestToggle={handleRequestToggle}
              handleSelectedRecipe={handleSelectedRecipe}
              handleMongoFavoriteToggle={handleMongoFavoriteToggle}
              handleMongoRequestToggle={handleMongoRequestToggle}
            />} />

          <Route path="/:recipeId" element={
            <RecipePage 
              // data={recipes}
              mongoData={recipeData}
              selectedRecipe={selectedRecipe}
              // handleFavoriteToggle={handleFavoriteToggle}
              // handleRequestToggle={handleRequestToggle}
              handleSelectedRecipe={handleSelectedRecipe}
              handleMongoFavoriteToggle={handleMongoFavoriteToggle}
              addNewCookedDate={addNewCookedDate}
            />} />
          <Route path="/add-recipe" element={
            <AddRecipeForm 
              retrieveRecipes={retrieveRecipes}
            />
          } />
          <Route path="/:recipeId/edit" element={
            <EditRecipeForm 
              mongoData={recipeData}
              selectedRecipe={selectedRecipe}
              // handleFavoriteToggle={handleFavoriteToggle}
              // handleRequestToggle={handleRequestToggle}
              handleSelectedRecipe={handleSelectedRecipe}
              retrieveRecipes={retrieveRecipes}
            />} />
          <Route path="/settings" element={
            <Settings 
            />} />
          <Route path="/blog" element={
            <Blog 
            />} />
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
