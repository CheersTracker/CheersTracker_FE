import React, { useRef, useCallback, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../assets/scss/post.scss';
import { TbPaperclip } from "react-icons/tb";

const Post = ({ content, setContent, setImages }) => {
    const quillRef = useRef(null);

    const handleTextChange = useCallback((value) => {
        setContent(value);
    }, [setContent]);

    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (quillRef.current) {
                        const quill = quillRef.current.getEditor();
                        const range = quill.getSelection();
                        if (range) {
                            quill.insertEmbed(range.index, 'image', reader.result);
                            quill.setSelection(range.index + 1);
                            setImages(prevImages => [...prevImages, reader.result]);
                        } else {
                            console.warn('Editor range is not valid.');
                        }
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    }, [setImages]);

    const fileHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.onchange = () => {
            const file = input.files[0];
            if (file) {
                console.log('파일 선택:', file);
            }
        };
        input.click();
    }, []);

    const modules = useMemo(() => ({
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
    }), [imageHandler, fileHandler]);

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
    }, []);


    return (
        <ReactQuill
            className='post_write'
            ref={quillRef}
            value={content}
            modules={modules}
            onChange={handleTextChange}
            theme="snow"
        />
    );
};

export default Post;
