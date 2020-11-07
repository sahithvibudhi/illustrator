import { useEffect, useRef, useState } from 'react';
import drawHandler from './drawHandler';

import './canvas.css';
import types from '../../providers/type';

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
       elements.map((elem, i) => {
        if (elem.active) drawHandler(context, { ...elem, type: types.HIGHLIGHT });
        return drawHandler(context, elem);
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
                elements[i].active = true;
                setElements(elements);
                return;
            }
        }
    };

    // user left the element, dont move/grab the element anymore
    const mouseUp = () => {
        elements = elements.map(ele => {
            ele.active = false;
            return ele;
        });
        setElements(elements);
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