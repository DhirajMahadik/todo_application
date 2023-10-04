import React from 'react'
import { Link  , useNavigate} from 'react-router-dom'


const Navbar = () => {

    const navigate = useNavigate()

    const logoutHandler = () =>{
        localStorage.removeItem('auth_token')
        navigate('/')
    }

    return (
        <>
            <nav className="navbar nav-underline navbar-expand-lg bg-primary text-light">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light fw-bold fst-italic mx-2" to="#" >TO DO APP</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav mx-2 ">
                            <li className="nav-item ">
                                <Link className="nav-link text-light fw-bold mx-1" to="/dashboard">Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light fw-bold mx-1" to="/completed-tasks">Completed</Link>
                            </li>
                        </ul>
                        <div className='mx-3 align-items-center'>
                            <button className='btn btn-warning' onClick={logoutHandler}>
                            Logout 
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar