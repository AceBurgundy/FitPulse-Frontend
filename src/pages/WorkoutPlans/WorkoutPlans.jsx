import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Base from "../Base/Base"
import api from "../../../Api"
import "./WorkoutPlans.css"

// icons
import WorkoutPlanCard from "../../components/WorkoutPlanCard/WorkoutPlanCard"
import SmallNavigation from "../../components/SmallNavigation/SmallNavigation"

const WorkoutPlans = () => {
    const [workoutPlans, setWorkoutPlans] = useState([])
    const [gender, setGender] = useState('')
    const [workoutsCompleted, setWorkoutsCompleted] = useState(false)
    const hashed_id = sessionStorage.getItem("userId")

    useEffect(() => {
        api
        .get(`/api/workout-plans/list/${hashed_id}/`)
        .then((response) => {
            const { data } = response
            setGender(data.gender)
            setWorkoutPlans(data.data)
            setWorkoutsCompleted(data.workouts_completed)
        })
        .catch (error => {
            const { response } = error
            if (response) {
                const { response } = error
                if (response) {
                    const { data } = response
                    Object.values(data).map(value => {
                        if (Array.isArray(value)) {
                            return value.map(value_item => {
                                return handleNotification(value_item)
                            })
                        } else {
                            return handleNotification(value)
                        }
                    })
                }
            }
        })
    }, [hashed_id])

    function handleNotification(message) {
        Base.pillNotification(message)
    }

  return (
    <>
        <SmallNavigation gender={gender}/>
        <Base onNotification={(pillNotification) => Base.pillNotification = pillNotification} />
        <div id="workout-plans">
            {workoutPlans.map((plan) => (
                <WorkoutPlanCard 
                    address={`/FitPulse/workout-plans/${plan.id}/week/list`} 
                    key={plan.id} 
                    object={plan}
                    gender={gender}
                />
            ))}
        </div>
        {
            workoutsCompleted && <Link id="toggle-create-workout" className={`${gender}`} to="/FitPulse/biometrics">Create New Workout</Link>
        }
    </>
  )
}

export default WorkoutPlans
