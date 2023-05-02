import "./ExerciseCard.css"
import React from 'react'

const ExerciseCard = ({exercise}) => {
  
    return (
    <div className="exercise-item">
        <div className="exercise-item__left"></div>
        <div className="exercise-item__right">
            <p className="exercise-item__right-exercise-name">{exercise.name}</p>
            {
                exercise.time_based ? 

                    <div className="exercise-item__right-exercise-settings">
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
                    <div className="exercise-item__right-exercise-settings">
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
    </div>
  )
}

export default ExerciseCard