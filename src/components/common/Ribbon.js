import React from "react";
import './css/ribbon.css';

const Ribbon = (props) => {
    return (
        <div className="ribbon-wrapper">
            <div className="ribbon">{props.title}</div>
        </div>
    )
}

export default Ribbon;