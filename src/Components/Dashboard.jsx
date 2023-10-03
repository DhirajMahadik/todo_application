import { useEffect, useState } from 'react'
import Navbar from './Header/Navbar'
import axios from 'axios'
import { TrashFill, PencilSquare, Check } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import CustomAlert from './CustomAlert'
import EditTask from './EditTask'

const Dashboard = () => {

  const [tasks, setTasks] = useState([])
  const [editData, setEditData] = useState({task:'', task_id:''})
  const [showAlert, setShowAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [newTask, setNewTask] = useState('')
  const navigate = useNavigate()
  let auth_token = localStorage.getItem('auth_token')

  console.log(editData)

  const getUsersTask = () => {
    if (auth_token) {
      axios({ method: 'POST', url: 'http://127.0.0.1:5500/api/tasks', headers: { 'authorization': `Bearer ${JSON.parse(auth_token)}` } })
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

  const addTask = (e) => {
    e.preventDefault();
    axios({ method: 'POST', url: 'http://127.0.0.1:5500/api/add-task', data: { task: newTask }, headers: { 'Authorization': `Bearer ${JSON.parse(auth_token)}` } }).then((response) => {
      setAlert({ type: 'success', message: response.data.message })
      setShowAlert(true)
      getUsersTask()
      setTimeout(() => {
        setShowAlert(false)
      }, 4000)
    }).catch((error) => {
      setAlert({ type: 'danger', message: error.response.data.error })
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        localStorage.removeItem('auth_token')
        navigate('/')
      }, 4000)
    })
  }

  const setDataTobeEdited = (e) =>{
    setEditData(e)
    setShowEditDialog(true)
  } 

  const updateChange = (e) =>{
    setEditData({...editData, task:e.target.value})
  }

  const updateTask = (e) => {
    e.preventDefault();
    axios({ method: 'POST', url: 'http://127.0.0.1:5500/api/update-task', data: { task: editData.task, task_id : editData.task_id  }, headers: { 'Authorization': `Bearer ${JSON.parse(auth_token)}` } }).then((response) => {
      setAlert({ type: 'success', message: response.data.message })
      setShowAlert(true)
      getUsersTask()
      setShowEditDialog(false)
      setTimeout(() => {
        setShowAlert(false)
      }, 4000)
    }).catch((error) => {
      setAlert({ type: 'danger', message: error.response.data.error })
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 4000)
    })
  }

  useEffect(() => {
    getUsersTask();
    // eslint-disable-next-line
  }, [])

  return (
    <>
    {showEditDialog &&  <EditTask data={editData} onClose={()=> setShowEditDialog(false)} updateChange={updateChange} updateTask={updateTask}/>}
      <Navbar />
      {showAlert && <CustomAlert type={alert.type} message={alert.message} />}
      <div className='container py-4'>
        <div className='addTaskForm d-flex'>
          <form onSubmit={addTask} className='d-flex m-auto w-50'>
            <input className='form-control' type="text" placeholder='Task' name='task' onChange={(e) => setNewTask(e.target.value)} />
            <button type='submit' className='btn btn-success mx-2'>ADD</button>
          </form>
        </div>
        <div className='tasks d-flex flex-column'>
          <div className='py-3'>
            <h2 className='text-center'>Your pending tasks</h2>
          </div>
          <div>
            <table className='table table-striped w-50 m-auto'>
              <thead>
                <tr>
                  <th>Sr.NO</th>
                  <th>Task</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 1 ? tasks.map((element, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.task}</td>
                    <td> <PencilSquare color='gold' onClick={()=>setDataTobeEdited(element)} /> <Check color='green' size={30} className='mx-2' /> <TrashFill color='red' /></td>
                  </tr>
                }) : <tr>
                  <td colSpan={2}>Please add some task</td>
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