import { useNavigate } from 'react-router-dom'
import React, {useState} from 'react'
import "./SmallNavigation.css"
import axios from 'axios'

// icons
import MenuIcon from '../../assets/svg/MenuIcon'
import Base from '../../pages/Base/Base'

const SmallNavigation = ({ gender }) => {
    const navigate = useNavigate()

    const [panelToggled, setPanelToggled] = useState(false)

    function handlePanelToggle() {
        if (panelToggled) {
            setPanelToggled(false)
        } else {
            setPanelToggled(true)
        }
    }

    function handleLogout(event) {
        event.preventDefault()

        axios.post('https://aceburgundy.pythonanywhere.com/api/user/logout/', {
            'X-User-Id': sessionStorage.getItem('userId')
        })
        .then(response => {
            if (response.data.success) {
                handleNotification(response.data.success)
                navigate('/FitPulse/')
                sessionStorage.clear()
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

    function handleNotification(message) {
        Base.pillNotification(message)
    }

    return (
        <>
            <Base onNotification={(pillNotification) => Base.pillNotification = pillNotification} />
            <div className={panelToggled ? `small-navigation selected` : "small-navigation"}>
                <div id="small-navigation__toggle" onClick={handlePanelToggle}>
                    <MenuIcon id="small-navigation__toggle-icon" />
                </div>
                <div id="small-navigation__top">
                    <p id="small-navigation__top-title">FitPulse</p>
                </div>
                <button id="small-navigation__logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </>
  )
}

export default SmallNavigation