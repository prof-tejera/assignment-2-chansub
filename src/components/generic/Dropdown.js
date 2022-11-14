import React from "react";

const Dropdown = ({ddID}) => {

  //inspiration from: https://www.techiedelight.com/create-array-from-1-n-javascript/  
  const N = 10;
  const numbers60 = [...Array(N).keys()].map(x => ++x);
  
  return (
    <select key={ddID}>
        {
            numbers60.map((n,index) => {
                return (<option key={index}>{n}</option>);
            })
        }
    </select>
  )
};


export default Dropdown;
