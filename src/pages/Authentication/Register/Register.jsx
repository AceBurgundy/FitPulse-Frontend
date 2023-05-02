import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Base from '../../Base/Base'
import axios from 'axios'
import "./Register.css"

// icons
import UserIcon from '../../../assets/svg/PersonIcon'
import LockIcon from '../../../assets/svg/LockIcon'
import ThinArrowRightIcon from '../../../assets/svg/ThinArrowRightIcon'
import LetterIcon from "../../../assets/svg/LetterIcon"

function Register() {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }
    
    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleNotification(message) {
        Base.pillNotification(message)
    }

    function handleRegister(event) {
        event.preventDefault()
        axios.post('https://aceburgundy.pythonanywhere.com/api/user/create/', {
            username,
            email,
            password
        })
        .then(response => {
            if (response.data.success) {
                navigate('/FitPulse/')
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
            <div id="register">
                <form id="register__form" onSubmit={handleRegister}>
                    <p id="register__form-welcome">Create Account</p>
                    <div id="register__form-inputs">
                        <div className="register__form-input-block">
                            <UserIcon className="register-svg" />
                            <input onChange={handleUsernameChange} type="text" className="register__form-input-block-input" placeholder="Username" name="username" />
                        </div>
                        <div className="register__form-input-block">
                            <LetterIcon className="register-svg" />
                            <input onChange={handleEmailChange} type="email" className="register__form-input-block-input" placeholder="Email" name="email" />
                        </div>
                        <div className="register__form-input-block">
                            <LockIcon className="register-svg" />
                            <input onChange={handlePasswordChange} type="password" className="register__form-input-block-input" placeholder="Password" name="password" />
                        </div>
                    </div>
                    <div id="register__form-bottom">
                        <p id="register__form-tag">Register</p>
                        <button id="register__form-submit">
                            <ThinArrowRightIcon className="register-svg" />
                        </button>
                    </div>
                </form>
                <Link id="register__redirect" to="/FitPulse/">Login</Link>
            </div>
        </>
    )
}

export default Register