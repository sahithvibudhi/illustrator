import Canvas from './components/canvas'
import './App.css';
import { useState } from 'react';

function App() {

  const [selectedImages, setSelectedImages] = useState([{
    src: 'https://www.pngarts.com/files/3/Hat-PNG-Image.png',
    x: 0,
    y: 0,
    w: 150,
    h: 150,
  }, {
    src: 'https://toppng.com/uploads/preview/t-shirt-picsart-t-shirt-11563273533yrctixk3vb.png',
    x: 200,
    y: 100,
    w: 150,
    h: 150,
  }]);

  return (
    <div className="App">
      <Canvas selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>
    </div>
  );
}

export default App;
