import './App.css'
import HomePage from './components/HomePage'
import DefaultLayout from './components/DefaultLayout'
import { Route, Routes } from "react-router"

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout/>}>
        <Route path="/" element={<HomePage/>}>

        </Route>
      </Route>
    </Routes>
  )
}

export default App
