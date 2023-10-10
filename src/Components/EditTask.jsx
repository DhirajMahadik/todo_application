
const EditTask = ({ data, onClose, updateTask , updateChange}) => {
    
    return (
        <div className='d-flex position-absolute Z-index-1 h-100 w-100  ' style={{ backgroundColor: '#000000c9' }} >
            <div className='addTaskForm d-flex m-auto col-md-6  ' >
                <form onSubmit={(e) => updateTask(e)} className='d-flex flex-column m-auto col-md-6 justify-content-center align-items-center'>
                    <input className='form-control' type="text" placeholder='Task' name='task' value={data.task}  onChange={(e)=>updateChange(e)}/>
                    <button type='submit' className='btn btn-success mx-2  my-2' >ADD</button>
                    <button type='button' className='btn btn-danger mx-2 ' onClick={() => onClose()}>DISCARD</button>
                </form>
            </div>
        </div>
    )
}

export default EditTask