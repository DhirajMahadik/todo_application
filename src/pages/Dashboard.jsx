import { useEffect, useState } from 'react'
import Navbar from '../Header/Navbar'
import axios from 'axios'
import { TrashFill, PencilSquare, Check } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import EditTask from '../Components/EditTask'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Dashboard = () => {

  const [tasks, setTasks] = useState([])
  const [editData, setEditData] = useState({ task: '', task_id: '' })
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newTask, setNewTask] = useState('')
  const navigate = useNavigate()
  let auth_token = localStorage.getItem('auth_token')

  const getUsersTask = () => {
    if (auth_token) {
      axios({ method: 'POST', url: `${process.env.REACT_APP_URL}/api/tasks`, headers: { 'authorization': `Bearer ${JSON.parse(auth_token)}` } })
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

  const addTask = (e) => {
    e.preventDefault();
    if(newTask !== ''){
      axios({ method: 'POST', url: `${process.env.REACT_APP_URL}/api/add-task`, data: { task: newTask }, headers: { 'Authorization': `Bearer ${JSON.parse(auth_token)}` } }).then((response) => {
        setNewTask('')
        getUsersTask()
        toast.success(response.data.message)
      }).catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error)
        } else {
          toast.error(error.message)
        }
      })
    }else{
      toast.warning('Can not add empty task')
    }
    
  }

  const setDataTobeEdited = (e) => {
    setEditData(e)
    setShowEditDialog(true)
  }

  const updateChange = (e) => {
    setEditData({ ...editData, task: e.target.value })
  }

  const updateTask = (e) => {
    e.preventDefault();
    axios({ method: 'POST', url: `${process.env.REACT_APP_URL}/api/update-task`, data: { task: editData.task, task_id: editData.task_id }, headers: { 'Authorization': `Bearer ${JSON.parse(auth_token)}` } }).then((response) => {
      getUsersTask()
      setShowEditDialog(false)
      toast.success(response.data.message)
    }).catch((error) => {
      if (error.response) {
        toast.error(error.response.data.error)
      } else {
        toast.error(error.message)
      }
    })
  }
  const completeTask = (e) => {
    axios({ method: 'POST', url: `${process.env.REACT_APP_URL}/api/complete-task`, data: { task: e.task, task_id: e.task_id }, headers: { 'Authorization': `Bearer ${JSON.parse(auth_token)}` } }).then((response) => {
      getUsersTask()
      setShowEditDialog(false)
      toast.success(response.data.message)
    }).catch((error) => {
      if (error.response) {
        toast.error(error.response.data.error)
      } else {
        toast.error(error.message)
      }
    })
  }

  const deleteTask = (e) => {
    axios({ method: 'POST', url: `${process.env.REACT_APP_URL}/api/delete-task`, data: { task_id: e.task_id }, headers: { 'Authorization': `Bearer ${JSON.parse(auth_token)}` } }).then((response) => {
      getUsersTask()
      setShowEditDialog(false)
      toast.success(response.data.message)
    }).catch((error) => {
      if (error.response) {
        toast.error(error.response.data.error)
      } else {
        toast.error(error.message)
      }

    })
  }

  useEffect(() => {
    getUsersTask();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <ToastContainer autoClose={1500} position='top-left' theme='light' />
      {showEditDialog && <EditTask data={editData} onClose={() => setShowEditDialog(false)} updateChange={updateChange} updateTask={updateTask} />}
      <Navbar />
      <div className='container py-4'>
        <div className='addTaskForm d-flex'>
          <form onSubmit={addTask} className='d-flex m-auto col-md-6'>
            <input className='form-control' type="text" placeholder='write a task' name='task' value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            <button type='submit' className='btn btn-success mx-2'>ADD</button>
          </form>
        </div>
        <div className='tasks  d-flex flex-column'>
          <div className='py-3'>
            <h2 className='text-center'>Your pending tasks</h2>
          </div>
          <div>
            <table className='table table-bordered table-striped w-75 text-center m-auto'>
              <thead>
                <tr>
                  <th>Sr.NO</th>
                  <th>Task</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length >= 1 ? tasks.map((element, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.task}</td>
                    <td> <PencilSquare role='button' color='gold' onClick={() => setDataTobeEdited(element)} /> <Check role='button' color='green' size={30} className='mx-2' onClick={() => completeTask(element)} /> <TrashFill role='button' color='red' onClick={() => deleteTask(element)} /></td>
                  </tr>
                }) : <tr>
                  <td className='text-center' colSpan={3}>Please add some task</td>
                </tr>}

              </tbody>
            </table>
          </div>
        </div>

      </div>


    </>
  )
}

export default Dashboard