import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Base from '../Base/Base'
import './WeeklyGoals.css'
import axios from 'axios'

function WeeklyGoals() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const [preferredDays, setPreferredDays] = useState([])
  const navigate = useNavigate()

  function handleDayButtonClick(day) {
    if (!preferredDays.includes(day)) {
      setPreferredDays([...preferredDays, day])
    }
  }

  const dayButtons = days.map((day) => {
    const className = `weekly-goals__day ${preferredDays.includes(day) ? 'selected' : ''}`

    return (
      <div className={className} key={day} onClick={() => handleDayButtonClick(day)}>
        {day}
      </div>
    )
  })

  function handleNotification(message) {
    Base.pillNotification(message)
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('/api/workout-plans/create/', {
      'X-User-Id': sessionStorage.getItem('userId'),
      preferredDays,
    })
      .then((response) => {
        if (response.data.success) {
          navigate('/FitPulse/workout-plans')
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
      <Base onNotification={(pillNotification) => (Base.pillNotification = pillNotification)} />
      <div className="weekly-goals" id="weekly-goals">
        <div id="weekly-goals__top">
          <div id="weekly-goals__navigation">
            <Link className="weekly-goals__nav-button" id="weekly-goals__navigation-button-previous" to="/FitPulse/biometrics">
              Previous
            </Link>
          </div>
          <div id="weekly-goals__prompt-message">
            <p id="weekly-goals__prompt-message-title">Set Your Weekly Goals</p>
            <p id="weekly-goals__prompt-message-extra">
              We recommend training at least 3 times weekly for better results
            </p>
          </div>
        </div>
        <div id="weekly-goals__day-container">
          <p id="weekly-goals__day-container-text">Weekly Training Days</p>
          <div id="weekly-goals__day-container-days">{dayButtons}</div>
        </div>
        <div id="weekly-goals__button-container">
          <p onClick={handleSubmit} className="weekly-goals__nav-button" id="weekly-goals__button-container-button-next">
            Proceed
          </p>
        </div>
      </div>
    </>
  )
}

export default WeeklyGoals
