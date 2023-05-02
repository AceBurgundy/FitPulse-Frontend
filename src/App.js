import React, { useEffect, useState } from 'react';
import './App.css';
import Map from './Map';

function App() {
  const [orientation, setOrientation] = useState('portrait');

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
    return <div className="App"><p>This app only works on portrait mode</p></div>;
  }

  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
