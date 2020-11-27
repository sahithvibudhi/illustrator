import { useState, useRef } from 'react';

import Canvas from './components/canvas'
import Header from './components/header'
import data from './providers/data';

import './App.css';

function App() {
  const [elements, setElements] = useState(data);
  const [activeElement, setActiveElement] = useState(-1);
  const headerRef = useRef();

  return (
    <div className="App">
      <Header 
        elements={elements} 
        setElements={setElements} 
        headerRef={headerRef} 
        activeElement={activeElement}
        setActiveElement={setActiveElement} 
        />
      <Canvas 
        elements={elements} 
        setElements={setElements} 
        headerRef={headerRef} 
        activeElement={activeElement}
        setActiveElement={setActiveElement} />
    </div>
  );
}

export default App;
