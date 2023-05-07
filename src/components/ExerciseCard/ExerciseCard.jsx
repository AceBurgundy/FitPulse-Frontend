import { Link } from "react-router-dom"
import "./ExerciseCard.css"
import React from 'react'

// icons
import PlayIcon from "../../assets/svg/PlayIcon"

const ExerciseCard = ({exercise, gender}) => {
  
    const videoId = exercise.link.split("/").pop().split("?")[0];

    const watchLink = `https://www.youtube.com/watch?v=${videoId}`;

    return (
    <div className="exercise-item">
        <div className="exercise-item__left"></div>
        <div className="exercise-item__center">
            <p className="exercise-item__center-exercise-name">{exercise.name}</p>
            {
                exercise.time_based ? 

                    <div className="exercise-item__center-exercise-settings">
                        <p className="exercise-settings">
                            {
                                exercise.no_time_limit ?
                                    "No time limit"
                                :
                                    exercise.time
                            }
                        </p>
                    </div>
                :
                    <div className="exercise-item__center-exercise-settings">
                        <p className="exercise-settings">
                            <span className="exercise-settings-data">
                                {exercise.sets}
                            </span>
                        </p>
                        x
                        <p className="exercise-settings">
                            <span className="exercise-settings-data">
                                {exercise.reps}
                            </span>
                        </p>
                    </div>
                }
        </div>
        <div className="exercise-item__right">
            <Link class={`exercise-item__right-link ${gender}`} to={watchLink}>
                <PlayIcon class="exercise-item__right-play-icon" />
            </Link>
        </div>
    </div>
  )
}

export default ExerciseCard