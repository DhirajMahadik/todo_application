import axios from 'axios'
import { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Header/Navbar'
import { ArrowRepeat } from 'react-bootstrap-icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CompletedTask = () => {

  const [tasks, setTasks] = useState([])
  let auth_token = localStorage.getItem('auth_token')
  const navigate = useNavigate()

  const getUsersCompletedTasks = () => {
    if (auth_token) {
      axios({ method: 'POST', url: 'http://127.0.0.1:5500/api/completed-tasks', headers: { 'authorization': `Bearer ${JSON.parse(auth_token)}` } })
        .then((response) => {
          setTasks(response.data)
        }).catch((error) => {

          if (error.response) {
            toast.error(error.response.data.error)
          } else {
            toast.error(error.message)
          }
        })
    } else {
      navigate('/')
    }
  }

  const clearCompletedTask = () => {
    if (auth_token) {
      axios({ method: 'POST', url: `${process.env.REACT_APP_URL}/api/clear-completed-tasks`, headers: { 'authorization': `Bearer ${JSON.parse(auth_token)}` } })
        .then((response) => {
          getUsersCompletedTasks()
          toast.success(response.data.message)
        }).catch((error) => {
          if (error.response) {
            toast.error(error.response.data.error)
          } else {
            toast.error(error.message)
          }
        })
    } else {
      navigate('/')
    }
  }


  useEffect(() => {
    getUsersCompletedTasks()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <ToastContainer autoClose={1500} position='top-left' theme='light' />
      <Navbar />
      <div className='container py-4'>
        <div className='tasks d-flex flex-column'>
          <div className='py-3'>
            <h2 className='text-center'>Your completed tasks</h2>
          </div>
          <div className='my-2'>
            <h6 className='text-center' role='button' onClick={clearCompletedTask}>Clear history <ArrowRepeat /></h6>
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