import { useEffect, useRef, useState } from 'react';

import './canvas.css';

export default function Canvas({ elements = [], setElements }) {
    const canvasRef = useRef();
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [grabbedElement, setGrabbedElement] = useState(-1);

    // make canvas take full height & width
    useEffect(() => {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
    }, []);

    // draw all the elements on the canvas everytime elements list changes
    useEffect(() => {
       const context = canvasRef.current.getContext('2d');
       context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
       elements.map((img, i) => {
        if (img.imgCache) {
            context.drawImage(img.imgCache, img.x, img.y, img.w, img.h);
            return img;
        } 
        const base_image = new Image();
        base_image.src = img.src;
        base_image.onload = function(){
          img.imgCache = base_image;
          // set height & width if not already set
          let nh = base_image.naturalHeight;
          let nw = base_image.naturalWidth;
          img.w = img.w === -1 ? nw : img.w;
          img.h = img.h === -1 ? nh : img.h;
          context.drawImage(base_image, img.x, img.y, img.w, img.h);
        }
        return img;
       });
    }, [elements]);

    // check if this is on an element
    const mouseDown = (e) => {
        const { pageX, pageY } = e;
        const mouseX = pageX - canvasRef.current.offsetLeft;
        const mouseY = pageY - canvasRef.current.offsetTop;
        for (let i = 0; i < elements.length; i++) {
            const elem = elements[i];
            if (elem.x < mouseX && mouseX < (elem.x + elem.w) && elem.y < mouseY && mouseY < (elem.y + elem.h)) {
                setGrabbedElement(i);
                return;
            }
        }
    };

    // user left the element, dont move/grab the element anymore
    const mouseUp = () => {
        setGrabbedElement(-1);
        setPos({});
    };

    // check and move grabbed element
    const mouseMove = (e) => {
        if (grabbedElement === -1) return;
        const { pageX, pageY } = e;
        const mouseX = pageX - canvasRef.current.offsetLeft;
        const mouseY = pageY - canvasRef.current.offsetTop;
        if (pos && pos.x && pos.y) {
            const imgs = elements.map((img, i) => i === grabbedElement ? { 
                ...img, 
                x: img.x + mouseX - pos.x, 
                y: img.y + mouseY - pos.y
            } : img);
            setElements(imgs);
        }
        setPos({x: mouseX, y: mouseY});
    };

    return <canvas width="100vw" height="100vh" id="main-canvas" ref={canvasRef} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp}></canvas>;
}