import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import Post from '../components/Post';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../assets/scss/post.scss';

const PostPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const { isEditing } = location.state || {};
    const postId = window.location.pathname.split('/').filter(segment => segment !== '').pop();
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [userInfo, setUserInfo] = useState([])

    useEffect(() => {
        if (isEditing && postId) {
            axios.get(`http://127.0.0.1:8000/community/posts/${postId}/`)
                .then(response => {
                    console.log(response.data)
                    setTitle(response.data.title);
                    setSubject(response.data.category);
                    setContent(response.data.content);
                    setImages(response.data.image);
                    console.log(response.data.image)
                })
                .catch(error => {
                    console.error('글 불러오기 오류:', error);
                });
        } else {
            setTitle('');
            setSubject('');
            setContent('');
        }
    }, [postId, isEditing]);

    const extractTextAndImages = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const images = Array.from(doc.querySelectorAll('img')).map(img => img.src);
        const text = doc.body.innerHTML;
        return { text, images };
    };

    const updatePost = async () => {
        try {
            const token = localStorage.getItem('token');
            const { text, images } = extractTextAndImages(content);

            const updateData = new FormData();
            updateData.append('title', title);
            updateData.append('category', subject);
            updateData.append('content', text);

            if (images.length > 0) {
                images.forEach((image, index) => {
                    const blob = dataURLtoBlob(image);

                    const mimeString = image.split(',')[0].split(':')[1].split(';')[0];
                    const extension = mimeString.split('/')[1];

                    const fileName = `image_${index + 1}.${extension}`;
                    updateData.append('image', blob, fileName);
                });
            }
            console.log('전달되는 데이터:', updateData);

            await axios.put(`http://127.0.0.1:8000/community/posts/${postId}/`, updateData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('글이 성공적으로 수정되었습니다!');
            navigate('/community');
        } catch (error) {
            console.error('글 수정 실패:', error);
            alert('글 수정에 실패했습니다.');
        }
    };

    const dataURLtoBlob = (dataURL) => {
        const byteString = atob(dataURL.split(',')[1]);
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    const handlePost = async () => {
        try {
            const token = localStorage.getItem('token');
            const { text, images } = extractTextAndImages(content);

            const postData = new FormData();
            postData.append('title', title);
            postData.append('category', subject);
            postData.append('content', text);

            if (images.length > 0) {
                images.forEach((image, index) => {
                    const blob = dataURLtoBlob(image);

                    const mimeString = image.split(',')[0].split(':')[1].split(';')[0];
                    const extension = mimeString.split('/')[1];

                    const fileName = `image_${index + 1}.${extension}`;
                    postData.append('image', blob, fileName);
                });
            }
            console.log('전달되는 데이터:', postData);

            await axios.post('http://127.0.0.1:8000/community/posts/', postData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('글이 성공적으로 업로드되었습니다!');
            navigate('/community');
            setTitle('');
            setSubject('');
            setContent('');
            setImages([]);
        } catch (error) {
            console.error('글 업로드 실패:', JSON.stringify(error.response.data));
            alert('글 업로드에 실패했습니다.');
            setTitle('');
            setSubject('');
            setContent('');
            setImages([]);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <SideBar />
            <div className="postpg_container_all">
                <section className='postpg_sec1'>
                    <span>{isEditing ? '글수정' : '글쓰기'}</span>
                    <div className="postpg_btns">
                        <button className='postpg_btn cancel_btn' onClick={() => navigate('/community')}>취소하기</button>
                        <button className='postpg_btn upload_btn' onClick={isEditing ? updatePost : handlePost}>
                            {isEditing ? '수정하기' : '업로드하기'}
                        </button>
                    </div>
                </section>
                <div className='postpg_container'>
                    <section className='postpg_sec2'>
                        <select name="subject" className="postpg_subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}>
                            <option value="">주제 선택</option>
                            <option value="음주">음주</option>
                            <option value="금주">금주</option>
                            <option value="Q&A">Q&A</option>
                        </select>
                        <br />
                        <input type="text" className='postpg_title' placeholder='제목을 입력해주세요.'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </section>
                    <Post
                        content={content}
                        images={images}
                        setContent={setContent}
                        setImages={setImages}
                        isEditing={isEditing}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostPage;
