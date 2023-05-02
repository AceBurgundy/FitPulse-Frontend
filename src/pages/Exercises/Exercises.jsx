import ExerciseCard from "../../components/ExerciseCard/ExerciseCard"
import ExercisePanel from "./../ExercisePanel/ExercisePanel"
import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Base from "../Base/Base"
import api from "../../../Api"
import "./Exercises.css"

// icons
import ArrowWithBodyIcon from "../../assets/svg/ArrowWithBodyIcon"

const Exercises = () => {
  const { workout_id, day_id } = useParams()
  const [exercises, setExercises] = useState([])
  const [dayName, setDayName] = useState("")
  const [gender, setGender] = useState("")
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(null)
  const [isStarted, setIsStarted] = useState(false)
  const hashed_id = sessionStorage.getItem("userId")

  useEffect(() => {
    api
      .get(
        `/api/workout-plans/week/day/${day_id}/${hashed_id}/exercises/list/`
      )
      .then((response) => {
        const { data } = response
        setExercises(data.data)
        setDayName(data.dayName)
        setGender(data.gender)
        setCurrentExerciseIndex(0) // Set the first exercise as the current exercise
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
  }, [day_id, hashed_id])

  function handleNotification(message) {
    Base.pillNotification(message)
  }

  function handleStartExercise() {
    setCurrentExerciseIndex(0)
  }

  if (currentExerciseIndex === null) {
    return (
      <>
        <Base
          onNotification={(pillNotification) =>
            (Base.pillNotification = pillNotification)
          }
        />
        <div id="exercise">
          <div
            className={`exercise__navigation ${gender}`}
          >
            <Link to={`/FitPulse/workout-plans/${workout_id}/week/list`}>
              <ArrowWithBodyIcon id="exercise-navigation-icon" />
            </Link>
            <p id="exercise__navigation-workout-name">
              {`${dayName} WORKOUT`}
            </p>
          </div>
          <div id="exercise__container">
            {exercises.map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise} />
            ))}
          </div>
          <button
            id="exercise__start-button"
            className={`exercise__start-button ${gender}`}
            onClick={handleStartExercise}
          >
            Start
          </button>
        </div>
      </>
    )
  }

  function handleBackButton() {
    setIsStarted(false)
  }

  return (
    <>
      <Base
        onNotification={(pillNotification) =>
          (Base.pillNotification = pillNotification)
        }
      />
      <div id="exercise">
        <div className={`exercise__navigation ${gender}`} >

          <Link to={`/FitPulse/workout-plans/${workout_id}/week/list`}>
            <ArrowWithBodyIcon id={"exercise-navigation-icon"} />
          </Link>

          <p id="exercise__navigation-workout-name">
            {`${dayName} WORKOUT`}
          </p>

        </div>

        {isStarted ? (
          <>
            <button className={`exercise__back-button ${gender}`} onClick={handleBackButton}>
              Go back
            </button>
            <ExercisePanel
              exerciseObjects={exercises}
              hashed_id={hashed_id}
              gender={gender}
              handleNotification={handleNotification}
            />
          </>
        ) : (
          <>
            <div id="exercise__container">
              {exercises.map((exercise, index) => (
                <ExerciseCard key={index} exercise={exercise} gender={gender} />
              ))}
            </div>
            <button
              className={`exercise__start-button ${gender}`}
              onClick={() => setIsStarted(true)}
            >
              Start
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default Exercises
