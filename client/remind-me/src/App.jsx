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
import QR_Scan from './components/QR_Scan'

function App() {

  const [editMode, setEditMode] = useState(false);
  const [hasPlan, setHasPlan] = useState(false);
  const toggleEditMode = () => setEditMode(prev => !prev);

  //plan personalization states
  const [morning, setMorning] = useState(null); // '7-10' | '10-13' | null
  const [afternoon, setAfternoon] = useState(null); // '13-16' | '16-19' | null
  const [evening, setEvening] = useState(null); // '19-22' | '22-01' | null

  const [planId, setPlanId] = useState(null);

  return (
    <Routes>
      <Route element={<DefaultLayout/>}>
        <Route path="/" element={hasPlan ? <HomePage editMode={editMode} toggleEditMode={toggleEditMode} planId={planId} setPlanId={setPlanId} /> : <Navigate replace to= "/setup" />} />
        <Route path="/plans/:planId/scheduled/:medicineId" element={<UpdatePage editMode={editMode} setEditMode={setEditMode} toggleEditMode={toggleEditMode}/>} />
        <Route path="/schedule" element={<SchedulePage editMode={editMode} toggleEditMode={toggleEditMode} planId={planId} hasPlan={hasPlan} />} />
        <Route path="/setup" element={!hasPlan ? <SetupPage/> : <Navigate replace to ="/" />}></Route>
        <Route path="/newPlan">
          <Route index element={<NewPlanPage/>} />
          <Route path="step1" element={<PersonalizationStep_1 morning={morning} setMorning={setMorning} afternoon={afternoon} setAfternoon={setAfternoon} evening={evening} setEvening={setEvening} />} />
          <Route path="step2" element={<PersonalizationStep_2/>} />
          <Route path='step3' element={<QR_Scan morning={morning} setMorning={setMorning} afternoon={afternoon} setAfternoon={setAfternoon} evening={evening} setEvening={setEvening} planId={planId} setPlanId={setPlanId} hasPlan={hasPlan} setHasPlan={setHasPlan} />} />
        </Route>
        <Route path="/help" element={<HelpPage/>} />
      </Route>
    </Routes>
  )
}

export default App