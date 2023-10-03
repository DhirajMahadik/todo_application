import { Link, useNavigate } from 'react-router-dom'
import { LoginRegisterStyled } from '../Styled/LoginRegisterStyled'
import CustomAlert from './CustomAlert'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {

    const [user, setUser] = useState({ email: "", password: "" });
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState({ type: '', message: '' })
    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5500/api/login',user).then((response)=>{
            localStorage.setItem('auth_token', JSON.stringify(response.data.token))
                    navigate('/dashboard')
    
        }).catch((error)=>{
            localStorage.removeItem('auth_token')
            let errorMsg = error.response.data.error
            setAlert({type:'danger',message:errorMsg})
            setShowAlert(true)
            setTimeout(()=>{
                setShowAlert(false)
            },4000)
        })
    }

    return (
        <LoginRegisterStyled className='d-flex align-items-center justify-content-center flex-column'>
            {showAlert && <CustomAlert type={alert.type} message={alert.message} />}
            <div className='main-box m-4 py-4'>
                <h6 className='text-center fst-italic'>To Do Application</h6>
                <div className='p-3'>
                    <h2 className='text-center fw-bold'>LOGIN</h2>
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
                        <div className='submit d-flex align-items-center justify-content-center flex-column my-2'>
                            <button className='btn btn-primary ' type="submit">Login</button>
                            <span className='my-1'> <Link to={'/register'}>Create account</Link> </span>
                        </div>


                    </form>
                </div>
            </div>
        </LoginRegisterStyled>
    )
}

export default Login