import axios from 'axios'
import  { useEffect, useState,  } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Header/Navbar'
import CustomAlert from './CustomAlert'
import {ArrowRepeat} from 'react-bootstrap-icons'

const CompletedTask = () => {

  const [tasks,setTasks] = useState([])
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [showAlert, setShowAlert] = useState(false);
  let auth_token = localStorage.getItem('auth_token')
  const navigate = useNavigate()

  const getUsersCompletedTasks = () => {
    if (auth_token) {
      axios({ method: 'POST', url: 'http://127.0.0.1:5500/api/completed-tasks', headers: { 'authorization': `Bearer ${JSON.parse(auth_token)}` } })
        .then((response) => {
          setTasks(response.data)
        }).catch((error) => {
          setAlert({ type: 'warning', message: error.response.data.error })
          setShowAlert(true)
          setTimeout(() => {
            setShowAlert(false)
            localStorage.removeItem('auth_token')
            navigate('/')
          }, 3000)

        })
    } else {
      console.log('token not found')
      navigate('/')
    }
  }

  const clearCompletedTask = () =>{
    if (auth_token) {
      axios({ method: 'POST', url: 'http://127.0.0.1:5500/api/clear-completed-tasks', headers: { 'authorization': `Bearer ${JSON.parse(auth_token)}` } })
        .then((response) => {
          setAlert({ type: 'success', message:response.data.message })
          getUsersCompletedTasks()
          setShowAlert(true)
          setTimeout(() => {
            setShowAlert(false)
          }, 3000)
        }).catch((error) => {
          setAlert({ type: 'warning', message: error.response.data.error })
          setShowAlert(true)
          setTimeout(() => {
            setShowAlert(false)
          }, 3000)

        })
    } else {
      console.log('token not found')
      navigate('/')
    }
  }
  

  useEffect(()=>{
    getUsersCompletedTasks()
    // eslint-disable-next-line
  },[])

  return (
    <>
      <Navbar />
      {showAlert && <CustomAlert type={alert.type} message={alert.message} close = {()=> setShowAlert(false)} />}
      <div className='container py-4'>  
        <div className='tasks d-flex flex-column'>
          <div className='py-3'>
            <h2 className='text-center'>Your completed tasks</h2> 
          </div>
          <div className='my-2'>
              <h6 className='text-center' role='button' onClick={clearCompletedTask}>Clear history <ArrowRepeat/></h6>
          </div>
          <div>
            <table className='table table-striped table-bordered w-50 m-auto'>
              <thead>
                <tr>
                  <th>Sr.NO</th>
                  <th>Task</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length >= 1 ? tasks.map((element, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.task}</td>
                  </tr>
                }) : <tr>
                  <td className='text-center' colSpan={2}>You don't have any completed tasks</td>
                </tr>}

              </tbody>
            </table>
          </div>
        </div>
       
      </div>

     
    </>
  )
}

export default CompletedTask