import { useRef } from 'react';
import types from '../../providers/type';
import './header.css'

export default function Header({ setElements }) {
    const fileRef = useRef();

    const uploadClick = () => {
        fileRef.current.click();
    }

    const onFileSelect = () => {
        const reader = new FileReader();
            reader.readAsDataURL(fileRef.current.files[0]);
            reader.onload = () => setElements(elements => {
                elements.push({
                    type: types.IMAGE,
                    src: reader.result,
                    x: 0,
                    y: 0,
                    w: -1,
                    h: -1,
                });
                console.log(elements);
                return elements;
            });
    }

    return <div id="header">
                <span>Sketch</span>
                <input type="file" hidden="true" onChange={onFileSelect} accept="image/x-png,image/gif,image/jpeg" ref={fileRef}/>
                <button onClick={uploadClick}>Upload</button>
                <button>Download</button>
            </div>;
};