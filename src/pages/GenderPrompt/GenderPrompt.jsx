import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Base from '../Base/Base'
import "./GenderPrompt.css"
import axios from 'axios'

// icons
import CycleMaleIcon from '../../assets/svg/CycleMaleIcon'
import StandFemaleWorkoutIcon from '../../assets/svg/StandFemaleWorkoutIcon'


function GenderPrompt() {

  const [gender, setGender] = useState('')
  const navigate = useNavigate()

  const [maleStyles, setMaleStyles] = useState({
    width: '190%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-55%, -55%)',
    zIndex: 2
  })

  const [femaleStyles, setFemaleStyles] = useState({
    position: 'absolute',
    width: '120%',
    top: '50%',
    right: '50%',
    transform: 'translate(100%, -50%)',
    zIndex: 1,
    opacity: '40%'
  })

  function handleMaleButtonClick() {

    setMaleStyles({
      position: 'absolute',
      width: '180%',
      top: '50%',
      left: '50%',
      transform: 'translate(-55%, -50%)',
      zIndex: 2
    })

    setFemaleStyles({
      position: 'absolute',
      width: '100%',
      top: '50%',
      right: '50%',
      transform: 'translate(100%, -50%)',
      zIndex: 1,
      opacity: '10%'
    })

    setGender("male")
    handleNotification("male selected")
  }

  function handleFemaleButtonClick() {

    setMaleStyles({
      position: 'absolute',
      width: '80%',
      top: '50%',
      left: '50%',
      transform: 'translate(-100%, -50%)',
      zIndex: 1,
      opacity: '5%'
    })

    setFemaleStyles({
      position: 'absolute',
      width: '200%',
      top: '50%',
      right: '50%',
      transform: 'translate(70%, -53%)',
      zIndex: 2
    })

    setGender("female")
    handleNotification("female selected")
  }

  function handleNotification(message) {
      Base.pillNotification(message)
  }

  function updateGender(event) {
    event.preventDefault()
    
    if (gender !== "male" && gender !== "female") {
      handleNotification("Please selete a gender")
      return
    }
    
    axios.put('https//aceburgundy.pythonanywhere.com/api/user/gender/', {
      'X-User-Id': sessionStorage.getItem('userId'), // Include user ID in the request headers
      gender
    })
    .then(response => {
        const { data } = response        
        if (data.success) {
          navigate('/FitPulse/biometrics')
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

  return (
    <>
      <Base onNotification={(pillNotification) => Base.pillNotification = pillNotification} />
      <div id="gender-prompt">
        <div id="gender-prompt-message">
          <p id="gender-prompt-message-title">What's your gender?</p>
          <p id="gender-prompt-message-extra">Let us know you better</p>
        </div>
        <div id="gender-prompt-svg-container">
          <CycleMaleIcon style={maleStyles} id="male-workout-icon" />
          <StandFemaleWorkoutIcon style={femaleStyles} id="female-workout-icon" />
        </div>
        <div id="gender-prompt-button-container">
          <button className="gender-prompt-button-container-button" id="male" onClick={handleMaleButtonClick}>Male</button>
          <button className="gender-prompt-button-container-button" id="female" onClick={handleFemaleButtonClick}>Female</button>
          <p onClick={updateGender} className="gender-prompt-button-container-button" id="next-button" >Next</p>
        </div>
      </div>
    </>
  )
}

export default GenderPrompt
