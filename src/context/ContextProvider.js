import React, { useState } from "react";

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [paused, setPaused] = useState(true);
  const [message, setMessage] = useState('hello');
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <AppContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        paused,
        setPaused,
        reset: () => setActiveIndex(0),
        addItem: (item) => setQueue((q) => [...q, item]),
        queue,
        setQueue,
        message,
        setMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
