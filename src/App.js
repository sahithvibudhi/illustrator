import Canvas from './components/canvas'
import './App.css';

function App() {
  const selectedImages = [{
    src: 'https://lh3.googleusercontent.com/proxy/OiXkrYhmhYi5-AjdGaqMqBEY1_9N4r1gCe5xTTbd7fLP4m468vu_L8qZCnmcbPU3jpWp_yVlyfuYItcpdTOmr6VQMLW10mKaRCWjs0BDg0PspWgv6eaLdR7uSBc4DeZbOQ8J5XHHn6Z-OgQ',
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
  }];
  return (
    <div className="App">
      <Canvas selectedImages={selectedImages} />
    </div>
  );
}

export default App;
