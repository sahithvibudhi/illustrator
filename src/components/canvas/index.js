import { useEffect, useRef, useState } from 'react';

import './canvas.css';

export default function Canvas({ selectedImages = [], setSelectedImages }) {
    const canvasRef = useRef();
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [grabbedElement, setGrabbedElement] = useState(-1);

    useEffect(() => {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
    }, []);

    useEffect(() => {
       const context = canvasRef.current.getContext('2d');
       context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
       selectedImages.map((img, i) => {
        if (img.imgCache) {
            context.drawImage(img.imgCache, img.x, img.y, img.w, img.h);
            return img;
        } 
        const base_image = new Image();
        base_image.src = img.src;
        base_image.onload = function(){
          img.imgCache = base_image;
          context.drawImage(base_image, img.x, img.y, img.w, img.h);
        }
        return img;
       });
    }, [selectedImages]);

    const mouseDown = (e) => {
        const { pageX, pageY } = e;
        const mouseX = pageX - canvasRef.current.offsetLeft;
        const mouseY = pageY - canvasRef.current.offsetTop;
        for (let i = 0; i < selectedImages.length; i++) {
            const elem = selectedImages[i];
            if (elem.x < mouseX && mouseX < (elem.x + elem.w) && elem.y < mouseY && mouseY < (elem.y + elem.h)) {
                setGrabbedElement(i);
                return;
            }
        }
    };

    const mouseUp = () => {
        setGrabbedElement(-1);
        setPos({});
    };

    const mouseMove = (e) => {
        if (grabbedElement === -1) return;
        const { pageX, pageY } = e;
        const mouseX = pageX - canvasRef.current.offsetLeft;
        const mouseY = pageY - canvasRef.current.offsetTop;
        if (pos && pos.x && pos.y) {
            const imgs = selectedImages.map((img, i) => i === grabbedElement ? { 
                ...img, 
                x: img.x + mouseX - pos.x, 
                y: img.y + mouseY - pos.y
            } : img);
            setSelectedImages(imgs);
        }
        setPos({x: mouseX, y: mouseY});
    };

    return <canvas width="100vw" height="100vh" id="main-canvas" ref={canvasRef} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp}></canvas>;
}