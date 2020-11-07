import { useState, useRef } from 'react';

import Canvas from './components/canvas'
import Header from './components/header'
import data from './providers/data';

import './App.css';

function App() {
  const [elements, setElements] = useState(data);
  const headerRef = useRef();

  return (
    <div className="App">
      <Header setElements={setElements} headerRef={headerRef}/>
      <Canvas elements={elements} setElements={setElements} headerRef={headerRef}/>
    </div>
  );
}

export default App;
