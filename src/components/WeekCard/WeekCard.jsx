import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../Api"
import axios from "axios"
import "./WeekCard.css"

// icons
import ThinArrowRightIcon from "../../assets/svg/ThinArrowRightIcon"
import LightningIcon from "../../assets/svg/LightningIcon"
import TrophyIcon from "../../assets/svg/TrophyIcon"
import CheckIcon from "../../assets/svg/CheckIcon"

function currentDay() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const date = new Date()
    return daysOfWeek[date.getDay()]
}

const WeekCard = ({currentWeek, finished, week_id, weekCount, workout_id, handleNotification}) => {

    const [days, setDays] = useState([])
    const [gender, setGender] = useState('')
    const hashed_id = sessionStorage.getItem("userId")

    useEffect(() => {
        api
        .get(`/api/workout-plans/week/${week_id}/${hashed_id}/day/list/`)
        .then((response) => {
            const { data } = response
            setGender(data.gender)
            setDays(data.data)
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
    }, [week_id, hashed_id, handleNotification])

  return (
    <div className={finished ? `week_card finished` : "week_card"}>
        <div className="week_card__left">
            <div className="week_card__left-circle">
                { finished ? 
                    <CheckIcon className="week_card__check-icon" /> : 
                    <LightningIcon className="week_card__lightning-icon" />
                }
            </div>
            <div className={ 
                finished ? 
                    `week_card__left-line ${gender}` : 
                    "week_card__left-line gray"
            }></div>
        </div>
        <div className="week_card__right">
            <p className="week_card__right-title">Week {weekCount}</p>
            <div className={
                    finished ?
                        `week_card__right-days ${gender}`
                    : currentWeek ?
                        "week_card__right-days current"
                    :
                        "week_card__right-days locked"}>

                { days.map(day => {

                    let circleClass = "week_card__right-days-day-circle"

                    if (day.finished) {
                        circleClass += ` marked ${gender}`
                    } else if (day.name === currentDay()) {
                        currentWeek ? 
                            circleClass += ` dashed-${gender}` 
                        :
                            circleClass += " gray"
                    } else {
                        circleClass += " gray"
                    }

                    return (
                        <>
                            <Link
                                to={`/FitPulse/workout-plans/${workout_id}/week/day/${day.id}/list`}
                                key={day.id} 
                                className={circleClass}
                            >
                                {   
                                    day.finished ? 
                                        <CheckIcon className="check-icon" /> 
                                    : 
                                        day.number 
                                }
                            </Link>
                            <ThinArrowRightIcon className={finished ? "week_card__day-right-icon finished" : "week_card__day-right-icon"} />
                        </>
                    )
                })}
                { 
                    finished ? 
                        <TrophyIcon className={gender === "female" ? "week-trophy yellow highlighted": "week-trophy yellow"} /> 
                    : 
                        <TrophyIcon className="week-trophy gray" /> 
                }   
            </div>
        </div>
    </div>
  )
}

export default WeekCard