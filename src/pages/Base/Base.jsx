import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import "./Base.css"

function Base({ onNotification }) {
  const [notifications, setNotifications] = useState([])

  Base.pillNotification = (message) => {
    setNotifications((notifications) => [...notifications, message])
  }  

  useEffect(() => {
    let intervalId
    if (notifications.length > 0) {
      intervalId = setInterval(() => {
        setNotifications((notifications) => {
          if (notifications.length > 0) {
            return notifications.slice(1)
          }
          return notifications
        })
      }, 2000)
    }
    return () => clearInterval(intervalId)
  }, [notifications])

  useEffect(() => {
    onNotification && onNotification(Base.pillNotification)
  }, [onNotification])
  
  return (
    <div id="errors">
      {notifications.map((message) => (
        <div className="error" key={uuidv4()}>{message}</div>
      ))}
    </div>
  )
  
}

export default Base
