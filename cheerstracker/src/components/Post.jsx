import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'; 
import ReactQuill from "react-quill";
import '../assets/scss/post.scss';
import { TbPaperclip } from "react-icons/tb";

const Post = () => {
    const quillRef = useRef(null);

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = async () => {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const quill = quillRef.current.getEditor();
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', reader.result);
                quill.setSelection(range.index + 1);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const fileHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.onchange = () => {
            const file = input.files[0];
            if (file) {
                console.log('파일 선택:', file);
            }
        };
        input.click();
    };

    const modules = {
        toolbar: {
            container: [
                ["image", 'file'],
                ["bold", 'italic', "underline"],
                [{ 'color': [] }, { 'background': [] }],
                [{ header: [1, 2, 3, 4, 5, false] }],
            ],
            handlers: {
                image: imageHandler,
                file: fileHandler,
            },
        },
    };

    const addCustomButton = () => {
        const toolbar = quillRef.current.getEditor().getModule('toolbar');
        const button = toolbar.container.querySelector('.ql-file');

        button.innerHTML = ''; 

        const icon = document.createElement('span');
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.className = 'icon-container';

        ReactDOM.render(<TbPaperclip />, icon);
        
        button.appendChild(icon);
        button.onclick = fileHandler;
    };

    useEffect(() => {
        if (quillRef.current) {
            addCustomButton();
        }
    }, [quillRef.current]);

    return (
        <>
            <ReactQuill
                className='post_write'
                ref={quillRef}
                modules={modules}
            />
        </>
    )
}

export default Post