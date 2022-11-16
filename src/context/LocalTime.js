import { useContext, useState } from "react";
import { useInterval } from "../hooks";
import { AppContext } from "./ContextProvider";

import DisplayTime  from "../components/generic/DisplayTime.js";
import { convertToMinSec } from "../utils/helpers";
import Button from "../components/generic/Button";

const Timer = ({ duration, index, type, isHome }) => {
  const { activeIndex, paused, setPaused, setActiveIndex, removeItem, queue} = useContext(AppContext);
  const [time, setTime] = useState(0);
  const active = activeIndex === index; //when activeIndex === index, set active = true

  useInterval(() => {
    //if end has reached, reset 
    if(activeIndex === queue.length){
      console.log("End reached!");
      setPaused(true);
      setActiveIndex(0);
      setTime(0);
      return;
    }
    
    if (paused || !active) return;
    
    if (`${time}` === `${duration}`){
        setActiveIndex(index + 1);
    } 
    else {
        setTime((c) => c + 1);
    }
  }, 1000);

  return (

      <div id={'q'+index}
        style={{
          backgroundColor: active ? "yellow" : "white"
        }}
      >
        <Button onClick={() => removeItem(index)} style={{display: (isHome === 'no') ? 'inline-block' : 'none'}} text="Remove"/>
        
        {/* Todo: if XY or Tabata, show Round + Time together */}
        {type} -       
        <DisplayTime time={convertToMinSec(duration)}/>


        {
            (() => {
                if(active && type !== 'Countdown'){return (<span> (Progress: {convertToMinSec(time)})</span>)}
                if(active && type === 'Countdown'){return (<span> (Progress: {convertToMinSec(duration-time)})</span>)}
            })()  
        }  

        
      </div>
  );
};

export default Timer;
