import './App.css'
import HomePage from './components/HomePage'
import DefaultLayout from './components/DefaultLayout'
import { Route, Routes } from "react-router"
import SchedulePage from './components/SchedulePage'
import { useState } from 'react'

function App() {

  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => setEditMode(prev => !prev);

  return (
    <Routes>
      <Route element={<DefaultLayout/>}>
        <Route path="/" element={<HomePage editMode={editMode} toggleEditMode={toggleEditMode}/>} />
        <Route path="/schedule" element={<SchedulePage editMode={editMode} toggleEditMode={toggleEditMode}/>} />
      </Route>
    </Routes>
  )
}

export default App