import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Base from '../../Base/Base'
import api from '../../../../Api'
import axios from 'axios'
import "./Login.css"

// icons
import UserIcon from '../../../assets/svg/PersonIcon'
import LockIcon from '../../../assets/svg/LockIcon'
import ThinArrowRightIcon from '../../../assets/svg/ThinArrowRightIcon'

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleNotification(message) {
        Base.pillNotification(message)
    }

    function handleLogin(event) {
        event.preventDefault()
        api.post('/api/user/login/', {
          username,
          password
        })
        .then(response => {
            const { data } = response
            
            sessionStorage.setItem('userId', data.userHashedId)
            if (data.success) {
                if (data.hasWorkoutPlans) {
                    navigate("/FitPulse/workout-plans")
                } else {
                    navigate("/FitPulse/gender-prompt")
                }
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
            <div id="login">
                <form id="login__form" onSubmit={handleLogin}>
                    <p id="login__form-welcome">Welcome</p>
                    <div id="login__form-inputs">
                        <div className="login__form-input-block">
                            <UserIcon className="login-svg" />
                            <input onChange={handleUsernameChange} type="text" className="login__form-input-block-input" placeholder="Username" name="username" />
                        </div>
                        <div className="login__form-input-block">
                            <LockIcon className="login-svg" />
                            <input onChange={handlePasswordChange} type="password" className="login__form-input-block-input" placeholder="Password" name="password" />
                        </div>
                    </div>
                    <div id="login__form-bottom">
                        <button id="login__form-submit">
                            <ThinArrowRightIcon id="login-svg" />
                        </button>
                    </div>
                </form>
                <Link id="login__redirect" to="/FitPulse/register">Create Account</Link>
            </div>
        </>
    )
}

export default Login
