import React from 'react'

const CustomAlert = ({type,message, close}) => {
    return (
        <div className={`alert alert-${type} alert-dismissible fade show position-absolute w-100 z-1 `} role="alert">
            {message}
            <button type="button" className="btn-close" onClick={()=> close()} ></button>
        </div>
    )
}

export default CustomAlert