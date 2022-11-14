import React from "react";

const Dropdown = ({ddID, ...props}) => {

  //inspiration from: https://www.techiedelight.com/create-array-from-1-n-javascript/  
  const N = 59;
  const numbers60 = [...Array(N).keys()].map(x => ++x);
  
  return (
    <select id={props.id} key={ddID} {...props}>
        <option>0</option>
        {
            numbers60.map((n,index) => {
                return (<option key={index}>{n}</option>);
            })
        }
    </select>
  )
};


export default Dropdown;
