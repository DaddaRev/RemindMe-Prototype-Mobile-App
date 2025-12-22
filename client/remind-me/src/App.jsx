import './App.css'
import HomePage from './components/HomePage'
import DefaultLayout from './components/DefaultLayout'
import NewPlanPage from './components/NewPlanPage'
import { Route, Routes } from "react-router"
import PersonalizationStep from './components/PersonalizationStep_1'
import PersonalizationStep_2 from './components/PersonalizationStep_2'
import HelpPage from './components/HelpPage'
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
        <Route path="/newPlan" element={<NewPlanPage/>} />
        <Route path="/newPlan/personalization/1" element={<PersonalizationStep/>} />
        <Route path="/newPlan/personalization/2" element={<PersonalizationStep_2/>} />



        
        <Route path="/help" element={<HelpPage />} />
      </Route>
    </Routes>
  )
}

export default App