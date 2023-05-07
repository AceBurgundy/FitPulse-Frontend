import React, { useState } from 'react';

const GlobalContext = React.createContext();

const GlobalContextProvider = (props) => {
  const [sharedData, setSharedData] = useState({
    mode: 'day'
  });

  const updateSharedData = (newData) => {
    setSharedData({ ...sharedData, ...newData });
  };

  return (
    <GlobalContext.Provider value={{ sharedData, updateSharedData }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
