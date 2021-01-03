import { useEffect, useState } from 'react';
import drawHandler from './drawHandler';

import './canvas.css';
import types from '../../providers/type';

export default function Canvas({ elements = [], setElements, headerRef, activeElement, setActiveElement, canvasRef }) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [grabbedElement, setGrabbedElement] = useState(-1);
    const marginAroundCanvas = 10;

    // make canvas take full height & width
    useEffect(() => {
        canvasRef.current.width = window.innerWidth - 2*marginAroundCanvas;
        canvasRef.current.height = window.innerHeight - headerRef.current.offsetHeight - 2*marginAroundCanvas;
        canvasRef.current.style.margin = `${marginAroundCanvas}px`;
        canvasRef.current.style.marginTop = headerRef.current.offsetHeight + marginAroundCanvas + "px";
    }, [headerRef, canvasRef]);

    // draw all the elements on the canvas everytime elements list changes
    useEffect(() => {
       const context = canvasRef.current.getContext('2d');
       context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
       elements.map((elem, i) => {
        if (elem.active) drawHandler(context, { ...elem, type: types.HIGHLIGHT });
        return drawHandler(context, elem);
       });
    }, [elements, canvasRef]);

    // check if this is on an element
    const mouseDown = (e) => {
        const { pageX, pageY } = e;
        const mouseX = pageX - canvasRef.current.offsetLeft;
        const mouseY = pageY - canvasRef.current.offsetTop;
        let clickedOnElem = false;

        // grab the element on top (i.e, towards end of the array)
        const elems = [];
        for (let i = elements.length - 1; i >= 0; i--) {
            const elem = elements[i];
            if (!clickedOnElem && elem.x < mouseX && mouseX < (elem.x + elem.w) && elem.y < mouseY && mouseY < (elem.y + elem.h)) {
                setGrabbedElement(i);
                setActiveElement(i);
                elem.active = true;
                clickedOnElem = true;
            } else {
                elem.active = false;
            }
            elems[i] = elem;
        }

        if (clickedOnElem) {
            setElements(elems);
            return;
        }

        setGrabbedElement(-1);
        setActiveElement(-1);
    };

    // when user left the element, dont move/grab the element anymore
    const mouseUp = () => {
        if (grabbedElement === -1) {
            // clicked outside an element, remove highlights
            elements = elements.map(ele => {
                ele.active = false;
                return ele;
            });
            setElements(elements);
        }
        setGrabbedElement(-1);
        // clear mouse position because element stops moving on moveUp
        setPos({});
    };

    // check and move grabbed element
    const mouseMove = (e) => {
        if (grabbedElement === -1) return;
        const { pageX, pageY } = e;
        // set mouse X, Y according to canvas start position
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