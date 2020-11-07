import Canvas from './components/canvas'
import './App.css';
import { useState } from 'react';
import data from './providers/data';

function App() {
  const [elements, setElements] = useState(data);

  return (
    <div className="App">
      <Canvas elements={elements} setElements={setElements}/>
    </div>
  );
}

export default App;
