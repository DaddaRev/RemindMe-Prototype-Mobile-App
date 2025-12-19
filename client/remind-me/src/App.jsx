import './App.css'
import HomePage from './components/HomePage'
import DefaultLayout from './components/DefaultLayout'
import { Route, Routes } from "react-router"
import SchedulePage from './components/SchedulePage'

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout/>}>
        <Route path="/" element={<HomePage/>} />
        <Route path="/schedule" element={<SchedulePage/>} />
      </Route>
    </Routes>
  )
}

export default App