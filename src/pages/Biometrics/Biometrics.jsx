import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Base from '../Base/Base'
import './Biometrics.css'
import axios from 'axios'

function Biometrics() {

  const [weight, setWeight] = useState("")
  const [weightUnit, setWeightUnit] = useState("lbs")
  const [height, setHeight] = useState("")
  const [heightUnit, setHeightUnit] = useState("cm")
  const navigate = useNavigate()

  const handleSubmit = (event) => {
      event.preventDefault()

      if (!weight || !height) {
        handleNotification("A healthy plan starts from accurate measurements")
        return
      }

      let userWeight = weightUnit === "lbs" ? convertWeightFromLbs(weight) : weight
      let userHeight = heightUnit === "in" ? convertHeightFromInches(height) : height

      axios.put('https://aceburgundy.pythonanywhere.com/api/user/biometrics/', {
        'X-User-Id': sessionStorage.getItem('userId'),
        userHeight,
        userWeight
      })
      .then(response => {
          const { data } = response          
          if (data.success) {
            navigate('/FitPulse/weekly-goals')
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

  function convertHeightFromInches(inches) {
    return inches * 2.54
  }
    
  function convertWeightFromLbs(lbs) {
    return lbs * 0.453592
  }

  function handleWeightChange(event) {
    setWeight(event.target.value)
  }

  function handleWeightUnitChange(event) {
    setWeightUnit(event.target.textContent)
  }

  function handleHeightChange(event) {
    setHeight(event.target.value)
  }

  function handleHeightUnitChange(event) {
    setHeightUnit(event.target.textContent)
  }

  function handleNotification(message) {
    Base.pillNotification(message)
  }

  return (
    <>
      <Base onNotification={(pillNotification) => Base.pillNotification = pillNotification} />
      <div id="biometrics">
        <div id="biometrics__navigation">
          <Link className="biometrics__nav-button" id="biometrics__navigation-button-previous" to="/FitPulse/gender-prompt">
            Previous
          </Link>
        </div>
        <div id="biometrics__prompt-message">
          <p id="biometrics__prompt-message-title">Let Us Know You Better</p>
          <p id="biometrics__prompt-message-extra">Let us know you better to help boost your workout results</p>
        </div>
        <form id="biometrics__form">
          <div className="biometrics__form-input-container">
            <label htmlFor="biometrics__form" className="biometrics__form-label">Weight</label>
            <div className="biometrics__form-input">
            <input 
              type="number" value={weight} onChange={handleWeightChange} className="biometrics__input" />
              <div value={weightUnit} className="biometrics__select">
                <div className={`select-item-left ${weightUnit === 'lbs' ? 'selected' : ''}`} onClick={handleWeightUnitChange} value="lbs">lbs</div>
                <div className={`select-item-right ${weightUnit === 'kg' ? 'selected' : ''}`} onClick={handleWeightUnitChange} value="kg">kg</div>
              </div>
            </div>
          </div>
          <div className="biometrics__form-input-container">
          <label htmlFor="biometrics__form" className="biometrics__form-label">Height</label>
          <div className="biometrics__form-input">
            <input 
              type="text" 
              value={height} 
              onChange={handleHeightChange} 
              className="biometrics__input"
              placeholder={
                heightUnit === "in" ?
                  "0.0"
                :
                  "000"
              } />
              <div value={heightUnit} className="biometrics__select">
                <div className={`select-item-left ${heightUnit === 'cm' ? 'selected' : ''}`}  onClick={handleHeightUnitChange} value="cm">cm</div>
                <div className={`select-item-right ${heightUnit === 'in' ? 'selected' : ''}`}  onClick={handleHeightUnitChange} value="in">in</div>
              </div> 
            </div>
          </div>
        </form>
        <div id="biometrics__button-container">
          <button onClick={handleSubmit} className="biometrics__nav-button" id="biometrics__button-container-button-next">
            Proceed
          </button>
        </div>
      </div>
    </>
  )
}

export default Biometrics