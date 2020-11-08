import { useRef } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import types from '../../providers/type';

import './header.css'

export default function Header({ setElements, headerRef, activeElement, setActiveElement }) {
    const fileRef = useRef();

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

    return <div id="header" ref={headerRef}>
                <span>Sketch</span>
                <input type="file" hidden={true} onChange={onFileSelect} accept="image/x-png,image/gif,image/jpeg" ref={fileRef}/>
                <span className="float-right vertical-center">
                    { 
                        activeElement !== -1 
                        ? <span id="actions">
                            <FiTrash2 className="hand" onClick={deleteElement}/>
                          </span> 
                        : null
                    }
                    <button onClick={uploadClick}>Upload</button>
                    <button>Download</button>
                </span>
            </div>;
};