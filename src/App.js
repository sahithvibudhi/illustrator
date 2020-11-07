import { useState } from 'react';

import Canvas from './components/canvas'
import Header from './components/header'
import data from './providers/data';

import './App.css';

function App() {
  const [elements, setElements] = useState(data);

  return (
    <div className="App">
      <Header setElements={setElements}/>
      <Canvas elements={elements} setElements={setElements}/>
    </div>
  );
}

export default App;
