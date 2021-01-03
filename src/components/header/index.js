import { useRef, createElement } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import types from '../../providers/type';

import './header.css'

export default function Header({ elements, setElements, headerRef, activeElement, setActiveElement, canvasRef }) {
    const fileRef = useRef();
    const downloadRef = useRef();

    const uploadClick = () => {
        fileRef.current.click();
    }

    const onFileSelect = () => {
        const reader = new FileReader();
        reader.readAsDataURL(fileRef.current.files[0]);
        reader.onload = () => 
            setElements(elements => [...elements, {
                type: types.IMAGE,
                src: reader.result,
                x: 0,
                y: 0,
                w: -1,
                h: -1,
            }]);
    }

    const deleteElement = () => {
        setElements(elements => {
            const elems = elements.filter((_, i) => i !== activeElement);
            return [...elems];
        });
        setActiveElement(-1);
    }

    const onWidthChange = (e) => {
        const elems = elements.map((elem, i) => {
            if (i === activeElement) elem.w = parseInt(e.target.value);
            return elem;
        });
        setElements(elems);
    }

    const onHeightChange = (e) => {
        const elems = elements.map((elem, i) => {
            if (i === activeElement) elem.h = parseInt(e.target.value);
            return elem;
        });
        setElements(elems);
    }

    const bringForward = () => {
        if (activeElement === elements.length - 1) return;
        // swapping current element with element after it
        [elements[activeElement + 1], elements[activeElement]] = [elements[activeElement], elements[activeElement + 1]];
        setElements([...elements]);
    }

    const sendBack = () => {
        if (activeElement === 0) return;
        // swapping current element with element after it
        [elements[activeElement - 1], elements[activeElement]] = [elements[activeElement], elements[activeElement - 1]];
        setElements([...elements]);
    }

    const download = () => {
        console.log({canvasRef});
        let dt = canvasRef.current.toDataURL('image/png');
        /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
        dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
      
        /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
        dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
      
        downloadRef.current.href = dt;
        // TODO: take it from input field
        downloadRef.current.download = 'illustration.png'; 
        downloadRef.current.click();

    }

    return <div id="header" ref={headerRef}>
                <span className="vertical-center title-badge">Sketch</span>
                <input type="file" hidden={true} onChange={onFileSelect} accept="image/x-png,image/gif,image/jpeg" ref={fileRef}/>
                <span className="float-right vertical-center">
                    { 
                        activeElement !== -1 
                        ? <span id="actions">
                            <span className="hand small-text padding-x" onClick={bringForward}>Forward</span>
                            <span className="hand small-text padding-x" onClick={sendBack}>Backward</span>
                            w: <input type="number" value={elements[activeElement].w} onChange={onWidthChange}/>
                            h: <input type="number" value={elements[activeElement].h} onChange={onHeightChange}/>
                            <FiTrash2 className="hand" onClick={deleteElement}/>
                          </span> 
                        : null
                    }
                    <button onClick={uploadClick}>Upload</button>
                    <button onClick={download}>Download</button>
                    <a className="hidden" ref={downloadRef}></a>
                </span>
            </div>;
};