import React, {useContext, useState} from "react";
import { useLocation, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import HomeView from "./views/HomeView";

import LocalTime from "./context/LocalTime";
import AppProvider, { AppContext } from "./context/ContextProvider";
import Dropdown, {DropdownTime, DropdownRounds} from "./components/generic/Dropdown";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;
const myStyle = {
  listStyleType: "none"
}
const QueueStyle = {
  fontSize: "14px"
}


const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Body = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
  width: 500px;
  text-align: center;
  background-color: lightgrey;
  border-radius: 3%;
`;


const Nav = () => {
  //idea from https://medium.com/how-to-react/add-an-active-classname-to-the-link-using-react-router-b7c350473916
  
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const {pathname} = location;

    //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  return (
    <nav>                     
      <ul style={myStyle}>
        <li className={(splitLocation[1] === '' ? 'active':'')}>
          <Link to="/">Home</Link>
        </li>
        <li className={(splitLocation[1] === 'add' ? 'active':'')}>
          <Link to="/add">Add</Link>
        </li>
        <li className={(splitLocation[1] === 'timers' ? 'active':'')}>
          <Link to="/timers">Timers</Link>
        </li>
        <li className={(splitLocation[1] === 'docs' ? 'active':'')}>
          <Link to="/docs">Documentation</Link>
        </li>

      </ul>
    </nav>
  );
};

const Timer = LocalTime;

const Inner = () => {
  const initialSeconds = 5;
  const { queue, addItem, paused, setPaused, reset, clear} = useContext(AppContext);
  const [secondsStopwatch, setSecondsStopwatch] = useState(initialSeconds);
  const [secondsCountdown, setSecondsCountdown] = useState(initialSeconds);

  return (
    <>

    <div>
      XY <DropdownRounds id="selectXY" />
       &nbsp; @ &nbsp;  
      <DropdownTime id="selectStopwatch" value={secondsStopwatch} onChange={(e) => {
        
        setSecondsStopwatch(e.target.value);
      } } />  each
      <button
        onClick={() => {
          addItem({
            duration: secondsStopwatch,
            type: 'XY'
          });
        } }
      >
        Add
      </button>
    </div>


    <div>
      Stopwatch <DropdownTime id="selectStopwatch" value={secondsStopwatch} onChange={(e) => {
        
        setSecondsStopwatch(e.target.value);
      } } /> 
      <button
        onClick={() => {
          console.log("stopwatch set", secondsStopwatch);

          addItem({
            duration: secondsStopwatch,
            type: 'Stopwatch'
          });
        } }
      >
        Add
      </button>
    </div>

    <div>
      Countdown <DropdownTime id="selectCountdown" value={secondsCountdown} onChange={(e) => {
        setSecondsCountdown(e.target.value);
      } } /> 
      <button
        onClick={() => {
          addItem({
            duration: secondsCountdown,
            type: 'Countdown'
          });
        } }
      >
        Add
      </button>
    </div>
        
    <div>
        <button
          onClick={() => {
            setPaused(!paused);
          } }
          disabled={(queue.length < 1)}
        >
          {paused ? "Run" : "Pause"}
        </button>
        
        <button onClick={reset}>Reset</button>

        <button onClick={clear}>Clear</button>

        <div className="queue" style={QueueStyle}>
          {queue.map((t, i) => (
            <Timer key={i} index={i} duration={t.duration} type={t.type} isHome="no"/>
          ))}
        </div>
      </div></>
  );
};

const InnerHome = () => {
  const { queue, addItem, paused, setPaused, reset, clear} = useContext(AppContext);

  return (
    <>
        
    <div>
        <button
          onClick={() => {
            setPaused(!paused);
          } }
          disabled={(queue.length < 1)}
        >
          {paused ? "Run" : "Pause"}
        </button>
        
        <button onClick={reset}>Reset</button>

        <button onClick={clear}>Clear</button>

        <div className="queue" style={QueueStyle}>
          {queue.map((t, i) => (
            <Timer key={i} index={i} duration={t.duration} type={t.type} isHome="yes"/>
          ))}
        </div>
      </div></>
  );
};

const App = () => {
  return (
    <AppProvider>
    <Container>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<BodyContainer><Body><InnerHome /></Body></BodyContainer>} />
          <Route path="/docs" element={<DocumentationView />} />
          <Route path="/timers" element={<TimersView />} />
          <Route path="/add" element={<BodyContainer><Body><Inner /></Body></BodyContainer>} />
        </Routes>
      </Router>
    </Container>
    </AppProvider>
  );
};

export default App;
