import React from 'react'

const CustomAlert = ({type,message, close}) => {
    return (
        <div className={`alert alert-${type} alert-dismissible fade show `} role="alert">
            {message}
            <button type="button" className="btn-close" onClick={()=> close()} ></button>
        </div>
    )
}

export default CustomAlert