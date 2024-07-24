import React from 'react'
import Post from '../components/Post'

const PostPage = () => {
    return (
        <div className="postpg_container_all">
            <section className='postpg_sec1'>
                <span>글쓰기</span>
                <div className="postpg_btns">
                    <button className='postpg_btn cancel_btn'>취소하기</button>
                    <button className='postpg_btn upload_btn'>업로드하기</button>
                </div>
            </section>
            <div className='postpg_container'>
                <section className='postpg_sec2'>
                    <select name="subject" className="postpg_subject">
                        <option value="">주제 선택</option>
                        <option value="drinking">음주</option>
                        <option value="non-drinking">금주</option>
                        <option value="qna">Q&A</option>
                    </select>
                    <br />
                    <input type="text" className='postpg_title' placeholder='제목을 입력해주세요.' />
                </section>
                <Post />
            </div>
        </div>
    )
}

export default PostPage