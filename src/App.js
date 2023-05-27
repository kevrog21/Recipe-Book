import './App.css';
import { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Homescreen from './components/Homescreen'
import TempRecipeComponent from './components/TempRecipeComponent'
import data from './data'

export default function App() {

  const [recipes, setRecipes] = useState(data)

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
              handleFavoriteToggle={handleFavoriteToggle}
              handleRequestToggle={handleRequestToggle}
              handleSelectedRecipe={handleSelectedRecipe}
            />} />

          <Route path="/:recipeId" element={
            <TempRecipeComponent 
              data={recipes}
              handleFavoriteToggle={handleFavoriteToggle}
              handleRequestToggle={handleRequestToggle}
              handleSelectedRecipe={handleSelectedRecipe}
            />} />
        </Routes>
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
