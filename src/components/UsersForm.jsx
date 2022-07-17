import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UsersForm = ({ getUsers, userSelected, deselectUser }) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthday, setBirthday] = useState('')

    useEffect(() => {
        if (userSelected != null) {
            setFirstName(userSelected.first_name)
            setLastName(userSelected.last_name)
            setEmail(userSelected.email)
            setPassword(userSelected.password)
            setBirthday(userSelected.birthday)
        } else {
            clearInputs()
        }
    }, [userSelected])

    const clearInputs = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setBirthday('')
    }

    const submit = e => {
        e.preventDefault();

        const newUser = {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            birthday
        }

        if (userSelected != null) {
            axios
                .put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, newUser)
                .then(() => {
                    deselectUser()
                    getUsers()
                })
                .catch((error) => console.log(error.response))
        } else {
            axios
                .post('https://users-crud1.herokuapp.com/users/', newUser)
                .then(() => {
                    deselectUser()
                    getUsers()
                    clearInputs()
                })
                .catch((error) => console.log(error.response))
        }
    }

    return (
        <div onSubmit={submit} className='form-container'>
            <form>
                <h2 className='marginless' style={{ marginLeft: '1.69rem' }}>
                    {userSelected != null ? `Editing User ${userSelected.id}` : 'New User'}
                </h2>

                <div className='name-inputs'>
                    <div className='label-container'>
                        <label
                            className='form-label'
                            htmlFor="firstName">
                            <i className="fa-solid fa-user"></i>
                        </label>
                    </div>
                    <div className='container-2-inputs'>
                        <input
                            className='input-2-inputs generic-input'
                            id='firstName'
                            type="text"
                            placeholder='First name'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <input
                            className='input-2-inputs generic-input'
                            type="text"
                            placeholder='Last name'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                <div className='single-input'>
                    <div className='label-container'>
                        <label
                            className='form-label'
                            htmlFor="email">
                            <i className="fa-solid fa-envelope"></i>
                        </label>
                    </div>
                    <input
                        id='email'
                        className='single-input-input generic-input'
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className='single-input'>
                    <div className='label-container'>
                        <label
                            className='form-label'
                            htmlFor="password">
                            <i className="fa-solid fa-lock"></i>
                        </label>
                    </div>
                    <input
                        id='password'
                        className='single-input-input generic-input'
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className='single-input'>
                    <div className='label-container'>
                        <label
                            className='form-label'
                            htmlFor="birthDay">
                            <i className="fa-solid fa-cake-candles"></i>
                        </label>
                    </div>
                    <input
                        id='birthDay'
                        className='single-input-input  date-input'
                        type="date"
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                    />
                </div>

                <div className='form-buttons-container'>
                    <button
                        className='submit-btn'
                    >
                        {userSelected != null ? 'Edit' : 'Submit'}
                    </button>
                    <button
                        type='button'
                        className='clear-btn'
                        onClick={() => clearInputs()}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UsersForm;