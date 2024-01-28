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
import ScrollToPosition from './components/ScrollToPosition'
import Settings from './components/Settings'
import HomeAppearance from './components/HomeAppearance';
import Blog from './components/Blog'
import DeletionMessage from './components/DeletionMessage'

export default function App() {

  // const [recipes, setRecipes] = useState(data)

  const [recipeData, setRecipeData] = useState([])
  const [itemCount, setItemCount] = useState(recipeData.length)
  
  const [selectedRecipe, setSelectedRecipe] = useState()

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

    

    const defaultTagWords = ['main', 'starter', 'dessert', 'breakfast', 'lunch', 'dinner', 'brunch', 'drinks', 
    'winter meals', 'summer meals', 'sides', 'quick', 'vegetarian', 'vegan', 'gluten free', 'dairy free', 'basics']
    const moreTagWords = ['BBQ', 'seafood', 'holiday', 'halloween', 'thanksgiving', 'christmas', 'hanukkah', '4th of july', 
    'cost friendly', 'something light', 'pasta', 'healthy', "dad's recipe" , 'the balcony', 'snacks', 'salads', 'sauce', 'instapot', 'slow cooker', 'air fryer', 'baking']

    const [homeScreenScrollPositionY, setScrollPositionY] = useState(0)

    const [homeScreenSectionScrollX, setHomeScreenSectionScrollX] = useState() 

    const [scrollPositionsX, setScrollPositionsX] = useState()

    // const allHomeScreenCardSectionContainers = Array.from(document.querySelectorAll(".cardsScrollContainer"))

    useEffect(() => {

      console.log("on mount the scrollPositionX is ", scrollPositionsX)
      // const initialScrollPositions = allHomeScreenCardSectionContainers.reduce((acc, sectionContainer) => {
      //   const distanceScrolled = sectionContainer.scrollLeft

      //   acc[sectionContainer.id] = distanceScrolled
      //   return acc
      // }, {})
      
      // setScrollPositionsX(initialScrollPositions)

    }, [])

    

    // useEffect(() => {
    //   console.log("allHomeScreenCardSectionContainers", allHomeScreenCardSectionContainers)

    //   if (allHomeScreenCardSectionContainers.length > 0) {
    //     const targetElement = allHomeScreenCardSectionContainers[1]

    //     allHomeScreenCardSectionContainers[1].addEventListener('scroll', () => {
    //       console.log('scrolled')
    //     })
    //     console.log(allHomeScreenCardSectionContainers[1])
    //   }
    // }, [allHomeScreenCardSectionContainers])

    const [updatedScrollPositions, setUpdatedScrolPositions] = useState()

    function getUpdatedScrollPosition() {
      const allHomeScreenCardSectionContainers = Array.from(document.querySelectorAll(".cardsScrollContainer"))

      setUpdatedScrolPositions(() => {
        return allHomeScreenCardSectionContainers.reduce((acc, sectionContainer) => {
          const distanceScrolled = sectionContainer.scrollLeft

          acc[sectionContainer.id] = distanceScrolled
          return acc
        }, {})
      })
    }

    useEffect(() => {
      getUpdatedScrollPosition()
    }, [])

    const updateScrollOnClick = () => {

      console.log("running updateScroll function")
      setScrollPositionY(window.scrollY)

      getUpdatedScrollPosition()

    }

    useEffect(() => {
      console.log("updated Scroll positions to", updatedScrollPositions)
      setScrollPositionsX(updatedScrollPositions)
    }, [updatedScrollPositions])

    useEffect(() => {
      console.log("scrollPositionsX", scrollPositionsX)
    }, [scrollPositionsX])

    // const [homeScreenSectionScrollX, setHomeScreenSectionScrollX] = useState()

    // const [allSCrollContainers, setAllScrollContainers] = useState()

    // useEffect(() => {
    //   setAllScrollContainers(document.querySelectorAll(".cardSectionContainer"))
    // }, [])

    // useEffect(() => {
    //   if (Array.isArray(allSCrollContainers)) {
    //     // const initialScrollPositions = allSCrollContainers.reduce((acc, container) => {
    //     //   acc[container] = 0
    //     //   return acc
    //     // }, {})
    //     console.log(allSCrollContainers)
    //   }
    //   else {
    //     console.log(allSCrollContainers)
    //   }
      
    // }, [allSCrollContainers])


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

    const mountThenRemoveDeletionMessage = () => {
      const deleteMessageEl = document.getElementById('successful-delete-msg')
      deleteMessageEl.classList.remove('hide')
      setTimeout(() => {
          deleteMessageEl.classList.add('hide')
      }, 2000)
  }

  return (
    <Router>
        <Header 
          setScrollPositionY={setScrollPositionY}
        />
        <ScrollToPosition 
          homeScreenScrollPositionY={homeScreenScrollPositionY}
          scrollPositionsX={scrollPositionsX}
          setScrollPositionsX={setScrollPositionsX}
          setScrollPositionY={setScrollPositionY}
        />
        <DeletionMessage />
        <Routes>
          <Route exact path="/" element={
            <Homescreen 
              // data={recipes}
              mongoData={recipeData}
              // handleFavoriteToggle={handleFavoriteToggle}
              // handleRequestToggle={handleRequestToggle}
              updateScrollOnClick={updateScrollOnClick}
              handleMongoFavoriteToggle={handleMongoFavoriteToggle}
              handleMongoRequestToggle={handleMongoRequestToggle}
              defaultTagWords={defaultTagWords}
              moreTagWords={moreTagWords}
              homeScreenScrollPositionY={homeScreenScrollPositionY}
              setScrollPositionY={setScrollPositionY}
              setScrollPositionsX={setScrollPositionsX}
            />} />

          <Route path="/:recipeId" element={
            <RecipePage 
              mongoData={recipeData}
              updateScrollOnClick={updateScrollOnClick}
              handleMongoFavoriteToggle={handleMongoFavoriteToggle}
              handleMongoRequestToggle={handleMongoRequestToggle}
              addNewCookedDate={addNewCookedDate}
            />} />
          <Route path="/add-recipe" element={
            <AddRecipeForm 
              retrieveRecipes={retrieveRecipes}
              defaultTagWords={defaultTagWords}
              moreTagWords={moreTagWords}
            />
          } />
          <Route path="/:recipeId/edit" element={
            <EditRecipeForm 
              mongoData={recipeData}
              selectedRecipe={selectedRecipe}
              // handleFavoriteToggle={handleFavoriteToggle}
              // handleRequestToggle={handleRequestToggle}
              updateScrollOnClick={updateScrollOnClick}
              retrieveRecipes={retrieveRecipes}
              mountThenRemoveDeletionMessage={mountThenRemoveDeletionMessage}
            />} />
          <Route path="/settings" element={
            <Settings 
            />} />
          <Route path="/settings/appearance" element={
            <HomeAppearance 
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
