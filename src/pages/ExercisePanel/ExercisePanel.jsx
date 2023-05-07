import React, { useState, useEffect } from "react"
import Draggable from 'react-draggable';
import Base from "../Base/Base"
import "./ExercisePanel.css"
import axios from 'axios'

// icons
import ThinArrowRightIcon from "../../assets/svg/ThinArrowRightIcon"
import PlayIcon from "../../assets/svg/PlayIcon"
import PauseIcon from "../../assets/svg/PauseIcon"

const ExercisePanel = ({ exerciseObjects , gender}) => {

   const [timerPaused, setTimerPaused] = useState(false)
   const [timerRunning, setTimerRunning] = useState(false)
   const [timerSeconds, setTimerSeconds] = useState(60)
   const [timerToggled, setTimerToggled] = useState(false)
   const [currentIndex, setCurrentIndex] = useState(0)
   const [position, setPosition] = useState({ x: 0, y: 0 });

   let steps = []
   
   function handleDrag(event, ui) {
    setPosition({ x: ui.x, y: ui.y });
  }
  
   let exerciseObject = exerciseObjects[currentIndex]

   exerciseObject.steps.map((step, index) => {
      return steps.push(
         <li key={index} className={`exercise-panel__data-steps-item ${gender}`}>
            {step}
         </li>
      )
   })

   function handleTimerShow() {
      setTimerToggled(true)
   }

   function hideTimePanel() {
      setTimerToggled(false)
   }

   const handleTimerButtonClick = () => {
      if (timerRunning) {
         setTimerRunning(false)
         setTimerPaused(true)
      } else {
         setTimerRunning(true)
      }
   }

   function handleNotification(message) {
      Base.pillNotification(message)
   }

   useEffect(() => {
      let intervalId
   
      if (timerRunning) {
         intervalId = setInterval(() => {
            setTimerSeconds((prevSeconds) => {
               if (prevSeconds === 1) {
                  clearInterval(intervalId)
                  setTimerRunning(false)
                  setTimerSeconds(60)
                  handleNotification("Exercise Completed!")
                  return 0
               } else {
                  return prevSeconds - 1
               }
            })
         }, 1000)
      }
   
      return () => clearInterval(intervalId)
   }, [timerRunning])
   
   const formatTime = () => {
      const remainingSeconds = timerSeconds
      const minutes = Math.floor(remainingSeconds / 60)
      const seconds = remainingSeconds % 60
      return `${minutes.toString().padStart(2, "0")}:${seconds
         .toString()
         .padStart(2, "0")}`
   }

   function setExerciseAsCompleted(exerciseObject_id) {

      axios.put('/api/exercise/finish/', {
         'X-User-Id': sessionStorage.getItem('userId'),
         exercise_id : exerciseObject_id
      })
      .then(response => {
            const { data } = response            
            if (data.success) {
               handleNotification("Exercise Completed")
            }
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
   }

   function handleNavigation(direction) {
      if (direction === "left") {
         if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
         } else {
            handleNotification("You're at the first")
         }
      } else if (direction === "right") {
         if (currentIndex < exerciseObjects.length - 1) {
            setCurrentIndex(currentIndex + 1)
            setExerciseAsCompleted(exerciseObject.id)
         } else {
            handleNotification("Last exercise for the day")
            setExerciseAsCompleted(exerciseObject.id)
         }
      }
   }

   return exerciseObject && (
      <>
         <Base onNotification={pillNotification => Base.pillNotification = pillNotification} />
         <div id="exercise-panel">
            <iframe id="exercise-video" width="100%" height="315" src={exerciseObject.link} title={exerciseObject.name} allowFullScreen />
            <div id="exercise-panel__bottom">
               <div id="exercise-panel__data">
                  <p className={`exercise-panel__data-name ${gender}`}>{exerciseObject.name}</p>
                  <p id="exercise-panel__date-description-text">Description</p>
                  <p className={`exercise-panel__data-description ${gender}`}>{exerciseObject.description}</p>
                  <p id="exercise-panel__date-steps-text">Steps</p>
                  <ul id="exercise-panel__data-steps">
                     {steps.map(step => step)}
                  </ul>
               </div>
                <Draggable position={position} onDrag={handleDrag}>
                  <div 
                    className={`exercise-panel__timer-opener ${gender} ${timerToggled ? 'timer-shown' : ''}`} 
                    onClick={handleTimerShow}
                  >
                    {timerRunning ? formatTime() : timerPaused ? <PauseIcon id="exercise-panel__timer-opener-pause-icon" /> : <PlayIcon id="exercise-panel__timer-opener-play-icon" />}
                  </div>
                </Draggable>
                <div className={timerToggled ? "exercise-panel__timer show" : "exercise-panel__timer"}>
                   <div id="exercise-panel__timer-close-button" onClick={hideTimePanel} dangerouslySetInnerHTML={{ __html: "&times" }} />
                   <button className={`exercise-panel__nav-button ${gender}`} onClick={() => handleNavigation("left")}><ThinArrowRightIcon className="exercise-panel__nav-button-icon" id="exercise-panel__nav-button-left" /></button>
                   <button className={`exercise-panel__timer-button ${gender}`} onClick={handleTimerButtonClick}>{timerRunning ? formatTime() : timerPaused ? "Paused" : "Start"}</button>
                   <button className={`exercise-panel__nav-button ${gender}`} onClick={() => handleNavigation("right")}><ThinArrowRightIcon className="exercise-panel__nav-button-icon" id="exercise-panel__nav-button-right" /></button>
                </div>
            </div>
         </div>
      </>
   )
   
}

export default ExercisePanel