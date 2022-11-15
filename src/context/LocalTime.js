import { useContext, useState } from "react";
import { useInterval } from "../hooks";
import { AppContext } from "./ContextProvider";

const Timer = ({ duration, index, type }) => {
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
        <button onClick={() => removeItem(index)} disabled={(active)? true : false}>Remove</button>

        Timer: {type} - Duration: {duration} 
        {active && <span><em> (Progress: {time})</em></span>}
      </div>
    );
};

export default Timer;
