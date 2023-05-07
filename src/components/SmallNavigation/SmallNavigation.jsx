import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../AppMode'
import Base from '../../pages/Base/Base'
import "./SmallNavigation.css"
import axios from 'axios'

// icons
import MenuIcon from '../../assets/svg/MenuIcon'
import LitSunIcon from '../../assets/svg/LitSunIcon'
import UnlitSunIcon from '../../assets/svg/UnlitSunIcon'

const SmallNavigation = () => {
    const navigate = useNavigate()

    const [panelToggled, setPanelToggled] = useState(false)
    const [currentMode, setCurrentMode] = useState("")
    const { sharedData, updateSharedData } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMode(sharedData.mode)
    }, [sharedData.mode])

    function handlePanelToggle() {
        setPanelToggled((prevState) => !prevState)
    }

    function handleModeChange() {
        let mode = currentMode === "day" ? "night" : "day"
        updateSharedData({
            mode: mode
        });
        setCurrentMode(mode)
    }

    function handleLogout(event) {
        event.preventDefault()

        axios.post('/api/user/logout/', {
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
            <div id='small-navigation-background' style={panelToggled ? { opacity: 1, display: "block" } : {opacity: 0, display: "none"}}></div>
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
                <div id="small-navigation__mode-container" onClick={handleModeChange}>
                    {
                        currentMode === "day" ?
                            <LitSunIcon />
                        :
                            <UnlitSunIcon />
                    }
                </div>
            </div>
        </>
  )
}

export default SmallNavigation