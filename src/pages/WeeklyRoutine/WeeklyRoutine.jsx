import ArrowWithBodyIcon from "../../assets/svg/ArrowWithBodyIcon"
import WeekCard from "../../components/WeekCard/WeekCard"
import React, { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import Base from "../Base/Base"
import "./WeeklyRoutine.css"
import axios from "axios"

const WeeklyRoutine = () => {

    const { workout_id } = useParams()
    const [weeks, setWeeks] = useState([])
    const [workoutName, setWorkoutName] = useState("")
    const [gender, setGender] = useState("")
    const hashed_id = sessionStorage.getItem("userId")

    useEffect(() => {
        axios
        .get(`http://aceburgundy.pythonanywhere.com/api/workout-plans/${workout_id}/${hashed_id}/week/list/`)
        .then((response) => {
            const { data } = response
            setWeeks(data.data)
            setWorkoutName(data.workoutName)
            setGender(data.gender)
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
    }, [workout_id, hashed_id])

  function handleNotification(message) {
    Base.pillNotification(message)
  }

  return (
    <>
        <Base onNotification={(pillNotification) => Base.pillNotification = pillNotification} />
        <div id="weekly-plans">
            <div className={`weekly-plans__navigation ${gender}`}>
                <Link to="/workout-plans"><ArrowWithBodyIcon id="weekly-plans__navigation-icon" /></Link>
                <p id="weekly-plans__navigation-workout-name">{workoutName}</p>
            </div>
            <div id="weekly-plans__week-container">
                {weeks.map((week, index) => (
                    <WeekCard 
                        key={index} 
                        currentWeek={week.current_week} 
                        finished={week.finished} 
                        week_id={week.id} 
                        weekCount={index + 1}
                        workout_id={workout_id} 
                        handleNotification={handleNotification}
                    />
                ))}
            </div>
        </div>
    </>
  )
}

export default WeeklyRoutine
