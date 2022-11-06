import React from "react";

const DisplayRounds = (props) => {
    return (
        <><span>Rounds: </span><span className="numbers rounds">{props.rounds}</span></>
    );
};

export default DisplayRounds;
