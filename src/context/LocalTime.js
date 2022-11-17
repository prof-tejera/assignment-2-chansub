import { useContext, useState } from "react";
import { useInterval } from "../hooks";
import { AppContext } from "./ContextProvider";

import DisplayTime  from "../components/generic/DisplayTime.js";
import { convertToMinSec } from "../utils/helpers";
import Button from "../components/generic/Button";
import Panel from "../components/generic/Panel";
import DisplayRounds from "../components/generic/DisplayRounds";

const Timer = ({ duration, rounds, index, type, isHome }) => {
  const { activeIndex, paused, setPaused, setActiveIndex, removeItem, queue} = useContext(AppContext);
  const [time, setTime] = useState(0);
  const [activeRound, setActiveRound] = useState(1);
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

        // //todo: set rounds here
        // if(type==='XY'){
        //   if (parseInt(time) > 0) {
        //     setTime((c) => c + 1);
        //     if (time === 1 && activeRound > 1) {
        //       setTime(0);
        //       setActiveRound(activeRound - 1);
        //     }
        //   }
        // }
        // else{
        //   setTime((c) => c + 1);
        // }
    }
  }, 1000);

  function DisplayRoundsTime(){
    if(type === 'XY'||(type === 'Tabata')){
      return <><DisplayRounds rounds={rounds} /> x <DisplayTime time={convertToMinSec(duration/rounds)} /></>
    }
    else{
      return <><DisplayTime time={convertToMinSec(duration)}/></>
    }
  }

  function DisplayProgress(){
    if(!active) return;

    if(active && type === 'Countdown'){
      return (<span> (Progress: {convertToMinSec(duration-time)})</span>)
    }
    else if(active && (type==='XY' || type==='Tabata')){
      return (<span> (1 of {rounds} Progress: {convertToMinSec(time)})</span>)
    }
    else{
      return (<span> (Progress: {convertToMinSec(time)})</span>)
    }
  }
 

  return (

      <Panel id={'q'+index} className={active ? "yellowBG" : "whiteBG"}>

      
        <Button onClick={() => removeItem(index)} style={{display: (isHome === 'no') ? 'inline-block' : 'none'}} text="Remove"/>
        
        {type} -

        <DisplayRoundsTime/>

        <DisplayProgress/>

      
      </Panel>
  );
};

export default Timer;
