import { Link, useNavigate } from 'react-router-dom'
import { LoginRegisterStyled } from '../Styled/LoginRegisterStyled'
import CustomAlert from './CustomAlert'
import { useState } from 'react'
import axios from 'axios'


const Register = () => {

    const [user, setUser] = useState({ email: "", password: "", confirmPasword: "" })
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState({ type: '', message: '' })

    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (user.password === user.confirmPasword) {
            axios.post('http://127.0.0.1:5500/api/auth/register', user)
            .then((response) => {
                if (response.data.affectedRows === 1) {
                    setAlert({ type: 'success', message: 'Registration successfull' })
                    setShowAlert(true)
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                } else {
                    setAlert({ type: 'danger', message: 'Something went wrong' })
                    setShowAlert(true)
                    setTimeout(() => {
                        setShowAlert(false)
                    }, 2000)
                }
            }).catch((error) => {
                let errorMsg = error.response.data.error
                setAlert({ type: 'danger', message: errorMsg })
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                }, 4000)
            })
        } else {
            setAlert({ type: 'danger', message: 'Password did not matched' })
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 4000)
        }


    }

    return (
        <LoginRegisterStyled className='d-flex align-items-center justify-content-center flex-column'>
            {showAlert && <CustomAlert type={alert.type} message={alert.message} />}
            <div className='main-box m-4 py-4'>
                <h6 className='text-center fst-italic'>To Do Application</h6>
                <div className='p-3'>
                    <h2 className='text-center fw-bold'>REGISTER</h2>
                </div>
                <div className='d-flex'>
                    <form className='m-auto w-75' onSubmit={onSubmitHandler}>
                        <div className='my-2'>
                            <label className='form-label' htmlFor="email">Email</label>
                            <input className='form-control' type="email" id='email' value={user.email} name='email' onChange={onChangeHandler} required />
                        </div>
                        <div className='my-2'>
                            <label className='form-label' htmlFor="password">Password</label>
                            <input className='form-control' type="password" id='password' value={user.password} name='password' onChange={onChangeHandler} required />
                        </div>
                        <div className='my-2'>
                            <label className='form-label' htmlFor="confirmPasword">Confirm password</label>
                            <input className='form-control' type="password" id='confirmPasword' value={user.confirmPasword} name='confirmPasword' onChange={onChangeHandler} required />
                        </div>
                        <div className='submit d-flex align-items-center justify-content-center flex-column my-2'>
                            <button className='btn btn-primary ' type="submit">Register</button>
                            <span className='my-1'> <Link to={'/'}>already have account login</Link> </span>
                        </div>


                    </form>
                </div>
            </div>
        </LoginRegisterStyled>
    )
}

export default Register