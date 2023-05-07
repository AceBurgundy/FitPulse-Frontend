import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// /pages
import Register from './pages/Authentication/Register/Register'
import Login from './pages/Authentication/Login/Login'
import GenderPrompt from './pages/GenderPrompt/GenderPrompt'
import WeeklyGoals from './pages/WeeklyGoals/WeeklyGoals'
import Biometrics from './pages/Biometrics/Biometrics'
import WorkoutPlans from './pages/WorkoutPlans/WorkoutPlans'
import WeeklyRoutine from './pages/WeeklyRoutine/WeeklyRoutine'
import Exercises from './pages/Exercises/Exercises'

function Map() {
  return ( 
    <>
        <Router>
          <Routes>
            <Route path="/FitPulse/" element={<Login />} />
            <Route path="/FitPulse/register" element={<Register />} />
            <Route path="/FitPulse/gender-prompt" element={<GenderPrompt />} />
            <Route path="/FitPulse/biometrics" element={ <Biometrics />} />
            <Route path="/FitPulse/weekly-goals" element={ <WeeklyGoals />} />
            <Route path="/FitPulse/workout-plans" element={ <WorkoutPlans/>} />
            <Route path="/FitPulse/workout-plans/:workout_id/week/list" element={<WeeklyRoutine />} />
            <Route path="/FitPulse/workout-plans/:workout_id/week/day/:day_id/list" element={ <Exercises/>} />
          </Routes>
        </Router> 
    </>
  )
}

export default Map