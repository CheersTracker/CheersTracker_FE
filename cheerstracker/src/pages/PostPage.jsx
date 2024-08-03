import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import Post from '../components/Post';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/scss/post.scss';

const PostPage = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([])

    useEffect(() => {
        if (postId) {
            axios.get(`/api/alcom/${postId}`)
                .then(response => {
                    setTitle(response.data.title);
                    setSubject(response.data.category);
                    setContent(response.data.content);
                    setIsEditing(true);
                })
                .catch(error => {
                    console.error('글 불러오기 오류:', error);
                });
        } else {
            setTitle('');
            setSubject('');
            setContent('');
            setIsEditing(false);
        }
    }, [postId]);

    // 텍스트와 이미지 분리
    const extractTextAndImages = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const images = Array.from(doc.querySelectorAll('img')).map(img => img.src);
        const text = doc.body.innerHTML.replace(/<img[^>]*>/g, '');
        return { text, images };
    };

    const updatePost = async () => {
        try {
            const { text, images } = extractTextAndImages(content);
            await axios.put(`http://127.0.0.1:8000/community/posts/${postId}/`, {
                title,
                category: subject,
                content: text,
                images,
            });
            alert('글이 성공적으로 수정되었습니다!');
            navigate('/community');
        } catch (error) {
            console.error('글 수정 실패:', error);
            alert('글 수정에 실패했습니다.');
        }
    };

    const handlePost = async () => {
        try {
            const { text, images } = extractTextAndImages(content);
            await axios.post('http://127.0.0.1:8000/community/posts/', {
                title,
                category: subject,
                content: text,
                images,
            });
            alert('글이 성공적으로 업로드되었습니다!');
            navigate('/community');
            setTitle('');
            setSubject('');
            setContent('');
            setImages([]);
        } catch (error) {
            console.error('글 업로드 실패:', error);
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
                    <span>{isEditing ? '글 수정' : '글쓰기'}</span>
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
                            <option value="drinking">음주</option>
                            <option value="non-drinking">금주</option>
                            <option value="qna">Q&A</option>
                        </select>
                        <br />
                        <input type="text" className='postpg_title' placeholder='제목을 입력해주세요.'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </section>
                    <Post
                        content={content}
                        setContent={setContent}
                        setImages={setImages}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostPage;
