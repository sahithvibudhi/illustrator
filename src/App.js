import { useState, useRef } from 'react';

import Canvas from './components/canvas'
import Header from './components/header'
import data from './providers/data';
import { isMobile } from './helpers/mobile';

import './App.css';
import MobileBanner from './components/mobileBanner';

function App() {
  const [elements, setElements] = useState(data);
  const [activeElement, setActiveElement] = useState(-1);
  const headerRef = useRef();
  const canvasRef = useRef();

  return (
    <div className="App">
      { isMobile() 
        ? <MobileBanner></MobileBanner>
        : <>
            <Header 
              elements={elements} 
              setElements={setElements} 
              headerRef={headerRef} 
              activeElement={activeElement}
              setActiveElement={setActiveElement} 
              canvasRef={canvasRef}
              />
            <Canvas 
              elements={elements} 
              setElements={setElements} 
              headerRef={headerRef} 
              activeElement={activeElement}
              setActiveElement={setActiveElement} 
              canvasRef={canvasRef}
              />
          </>
      }
    </div>
  );
}

export default App;
