import React from 'react'
import './Navbar.css'
import { useLogout } from '../hooks/useLogout'
// React-Router-Dom
import { Link, NavLink } from 'react-router-dom'

import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    return (
        <div className='navbar'>
            <div className='nav'>
                <Link to="/"> <h2>Gym Workouts</h2></Link>
                <ul>
                    {user && (
                        <>
                            <li>
                                <p>{user.email}</p>
                            </li>
                            <li>
                                <button className='logout' onClick={logout}>Logout</button>
                            </li>
                        </>
                    )}
                    {!user && (
                        <>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/signup">Signup</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar