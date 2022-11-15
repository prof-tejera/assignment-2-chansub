import { useContext, useState } from "react";
import { useInterval } from "../hooks";
import { AppContext } from "./ContextProvider";

import DisplayTime  from "../components/generic/DisplayTime.js";
import { convertToMinSec } from "../utils/helpers";

const Timer = ({ duration, index, type, isHome }) => {
  const { activeIndex, paused, setActiveIndex, removeItem} = useContext(AppContext);
  const [time, setTime] = useState(0);
  const active = activeIndex === index;

  useInterval(() => {
    if (paused || !active) return;
       
    //If end has reached, reset everything
    // if((queue.length-1) === activeIndex) {
    //   console.log("End reached!");
    //   setActiveIndex(0);
    //   setPaused(true);
    //   return;
    // } 

    if (`${time}` === `${duration}`){
        setActiveIndex(index + 1);
      } else {
        setTime((c) => c + 1);
      }
    }, 1000);

    return (
      <div id={'q'+index}
        style={{
          backgroundColor: active ? "yellow" : "white"
        }}
      >
        <button onClick={() => removeItem(index)} style={{display: (!isHome) ? 'inline-block' : 'none'}}>Remove</button>

        {type} -       
        <DisplayTime time={convertToMinSec(duration)}/>
        {
            (() => {
                if(active && type==='Stopwatch'){return (<span> (Progress: {convertToMinSec(time)})</span>)}
                if(active && type==='Countdown'){return (<span> (Progress: {convertToMinSec(duration-time)})</span>)}
            })()  
        }  

        
      </div>
    );
};

export default Timer;
