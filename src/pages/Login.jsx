import { Link, useNavigate } from 'react-router-dom'
import { LoginRegisterStyled } from '../Styled/LoginRegisterStyled'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {

    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate()
    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_URL}/api/auth/login`,user).then((response)=>{
            localStorage.setItem('auth_token', JSON.stringify(response.data.token))
                    navigate('/dashboard')
    
        }).catch((error)=>{
            localStorage.removeItem('auth_token')
            if(error.response){
                toast.error(error.response.data.error)
            }else{
                toast.error(error.message)
            }
        })
    }

    return (
        <>
        <ToastContainer autoClose={1500} position='top-left' theme='light' />
        <LoginRegisterStyled className='d-flex align-items-center justify-content-center flex-column'>
            <div className='main-box m-4 py-4'>
                <h6 className='text-center fst-italic'>To Do Application</h6>
                <div className='p-3'>
                    <h2 className='text-center fw-bold'>LOGIN</h2>
                </div>
                <div className='d-flex my-2'>
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
        </>
    )
}

export default Login