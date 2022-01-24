import React from "react"

const InputField = (props) => {
    return(
        <div className="custom-input-container">
            <input {...props} className={`custom-input`}/>
        </div>
    )
}

export default InputField;