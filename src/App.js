import React, { useEffect, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import './App.css';
import Map from './Map';
import axios from 'axios'

function App() {
  const [orientation, setOrientation] = useState('portrait');

  axios.defaults.baseURL = "https://aceburgundy.pythonanywhere.com/";

  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      setOrientation(isPortrait ? 'portrait' : 'landscape');
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  if (orientation === 'landscape') {
    return  (
      <div id="App__warning">
        <p>This app only works best on your phone, portrait or on responsive design mode</p>
        <p id="App__shortcut">Ctrl + Shift + M</p>
      </div>
    )
  }

  return (
    <div className="App">
      <SkeletonTheme 
        baseColor="#ebebeb"
        highlightColor="#f5f5f5">

        <Map />
        
      </SkeletonTheme>
    </div>
  );
}

export default App;
