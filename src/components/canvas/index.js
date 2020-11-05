import { useEffect, useRef, useState } from 'react';

import './canvas.css';

export default function Canvas({selectedImages = []}) {
    const canvasRef = useRef();
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [grabbed, setGrabbed] = useState(false);
    const [grabbedElement, setGrabbedElement] = useState({});

    useEffect(() => {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
    }, []);

    useEffect(() => {
       const context = canvasRef.current.getContext('2d');
       selectedImages.map(img => {
        const base_image = new Image();
        base_image.src = img.src;
        base_image.onload = function(){
          context.drawImage(base_image, img.x, img.y, img.w, img.h);
        }
        return base_image;
       });
    }, [selectedImages]);
    
    useEffect(() => grabbed ? console.log({pos, grabbedElement}): false, [pos, grabbed]);

    const mouseDown = (e) => {
        const { pageX, pageY } = e;
        const mouseX = pageX - canvasRef.current.offsetLeft;
        const mouseY = pageY - canvasRef.current.offsetTop;
        console.log(mouseY, mouseX);
        for (const elem of selectedImages) {
            console.log(elem);
            if (elem.x < mouseX && mouseX < (elem.x + elem.w) && elem.y < mouseY && mouseY < (elem.y + elem.h)) {
                setGrabbedElement(elem);
                setGrabbed(true);
                return;
            }
        }
    };

    const mouseUp = () => {
        setGrabbedElement({});
        setGrabbed(false);
    };

    const mouseMove = (e) => {
        if (!grabbed) return;
        const {screenX: x, screenY: y} = e;
        if (pos.x && pos.y) {
            setGrabbedElement({  });
        }
        setPos({x, y});
    };

    return <canvas width="100vw" height="100vh" id="main-canvas" ref={canvasRef} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp}></canvas>;
}