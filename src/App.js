import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Homescreen from './components/Homescreen'
import RecipePage from './components/RecipePage'

export default function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route exact path='/' element={<Homescreen />}/>
        <Route path={`/recipes/:id`} element={<RecipePage />}/>
      </Routes>

    </div>
  )
}
