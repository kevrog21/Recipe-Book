import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Homescreen from './components/Homescreen'
import TempRecipeComponent from './components/TempRecipeComponent'

export default function App() {
  return (
    <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homescreen />} />

          <Route path="/:recipeId" element={<TempRecipeComponent />} />
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
