import React from "react";

const myStyle = {
    paddingLeft: '5px'
}

const DisplayTime = (props) => {
  
    return (
        <><span style={myStyle}>Time: </span><span className="numbers">{props.time}</span></>
    );
};

export default DisplayTime;
