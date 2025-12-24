import './App.css'
import HomePage from './components/HomePage'
import DefaultLayout from './components/DefaultLayout'
import NewPlanPage from './components/NewPlanPage'
import { Navigate, Route, Routes } from "react-router"
import PersonalizationStep_1 from './components/PersonalizationStep_1'
import PersonalizationStep_2 from './components/PersonalizationStep_2'
import HelpPage from './components/HelpPage'
import SchedulePage from './components/SchedulePage'
import { useState } from 'react'
import SetupPage from './components/SetupPage'
import UpdatePage from './components/UpdatePage'
//import QR_Scan from './components/QR_Scan'

function App() {

  const [editMode, setEditMode] = useState(false);
  const [hasPlan, setHasPlan] = useState(true); //TO SET FALSE AND THEN TRUE
  const toggleEditMode = () => setEditMode(prev => !prev);

  return (
    <Routes>
      <Route element={<DefaultLayout/>}>
        <Route path="/" element={hasPlan ? <HomePage editMode={editMode} toggleEditMode={toggleEditMode}/> : <Navigate replace to= "/setup" />} />
        <Route path="/plans/:planId/scheduled/:medicineId" element={<UpdatePage />} />
        <Route path="/schedule" element={<SchedulePage editMode={editMode} toggleEditMode={toggleEditMode}/>} />
        <Route path="/setup" element={!hasPlan ? <SetupPage/> : <Navigate replace to ="/" />}></Route>
        <Route path="/newPlan">
          <Route index element={<NewPlanPage/>} />
          <Route path="step1" element={<PersonalizationStep_1/>} />
          <Route path="step2" element={<PersonalizationStep_2/>} />
        </Route>
        <Route path="/help" element={<HelpPage/>} />
      </Route>
    </Routes>
  )
}

//          <Route path='step3' element={<QR_Scan/>} /> 

export default App