import { Link } from 'react-router-dom'
import "./WorkoutPlanCard.css"

function formatDate(datetimeString) {
  const date = new Date(datetimeString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

function WorkoutPlanCard({ address, object, gender }) {
  return (
      <Link 
        className={
          gender ? 
            object.finished ? 
                `card ${gender} completed` 
              : 
                `card ${gender}`
          : 
            'card'}
        
        to={address}>
        <p className="card__text">{object.name}</p>
        {
          object.date_created ? 
            <p className='card__p'>
              {formatDate(object.date_created)} -
              {object.finished ? " Completed" : " Not Completed"}
            </p> 
          : 
            <p className='card__p'>{object.finished ? "Completed" : "Not Completed"}</p>
        }
        <p className='card__start'>{object.finished ? "Completed" : object.started ? "Continue" : "Start"}</p>
      </Link>
  )
}

export default WorkoutPlanCard
