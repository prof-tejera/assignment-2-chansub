import { useContext, useState } from "react";
import { useInterval } from "../hooks";
import { AppContext } from "./ContextProvider";

const Timer = ({ duration, index, type }) => {
  const { activeIndex, paused, setActiveIndex } = useContext(AppContext);
  const [time, setTime] = useState(0);
  const active = activeIndex === index;

  useInterval(() => {
    if (paused || !active) return;

    console.log("useInterval called time: ", time, "duration: ", duration);

  if (`${time}` === `${duration}`){
      console.log("time===durcation, moving up index");
      setActiveIndex(index + 1);
    } else {
      console.log("setTime called");
      setTime((c) => c + 1);

    }
  }, 1000);

  return (
    <div id={'q'+index}
      style={{
        backgroundColor: active ? "yellow" : "white"
      }}
    >
      Timer: {type} - Duration: {duration} 
      {active && <span><em> (Progress: {time}, ActiveIndex: {activeIndex})</em></span>}
    </div>
  );
};

export default Timer;
