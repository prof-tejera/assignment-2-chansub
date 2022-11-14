import { useContext, useState } from "react";
import { useInterval } from "./hooks";
import { AppContext } from "./ContextProvider";

const Timer = ({ duration, index }) => {
  const { activeIndex, paused, setActiveIndex } = useContext(AppContext);
  const [time, setTime] = useState(0);
  const active = activeIndex === index;

  useInterval(() => {
    if (paused || !active) return;

    if (time === duration) {
      setActiveIndex(index + 1);
    } else {
      setTime((c) => c + 1);
    }
  }, 1000);

  return (
    <div
      style={{
        backgroundColor: active ? "red" : "white"
      }}
    >
      Timer - Duration: {duration} -{" "}
      {active && <span>Progress: {time}</span>}
    </div>
  );
};

export default Timer;
