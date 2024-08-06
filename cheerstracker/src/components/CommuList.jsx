import React, { useEffect, useState } from 'react'
import { GoPerson } from "react-icons/go";
import { AiOutlineEye } from "react-icons/ai";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { LiaComment } from "react-icons/lia";
import axios from 'axios';

const CommuList = ({ post, postid }) => {
    const [clickHeart, setClickHeart] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [commentLength, setCommentLength] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleCountHeart = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://127.0.0.1:8000/community/posts/${postid}/like/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            if (response.status === 200) {
                console.log("likecount", response.data)
                const { is_liked, likes_count } = response.data;
                setClickHeart(is_liked);
                setLikeCount(likes_count);
            }
        } catch (error) {
            console.error('좋아요 처리 중 오류 발생:', error);
        }
    };


    const handleClickHeart = () => {
        setClickHeart(!clickHeart);
    };

    const fetchCommentList = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/community/comments/`);

            const filteredComments = response.data.filter(comment => comment.post === postid);
            if (filteredComments.length > 0) {
                setCommentList(filteredComments);
                setCommentLength(filteredComments.length);
                console.log("Filtered comments:", filteredComments);
            } else {
                console.log("해당 포스트에 댓글이 없습니다.");
                setCommentList([]);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchCommentList();
        handleCountHeart();
    }, [postid]);

    return (
        <div className='community_list_container'>
            <section className='list_sec1'>
                <div className='list_category'>{post.category}</div>
                <div className="list_title">{post.title}</div>
            </section>
            {post.image && (
                <img src={post.image} alt="" style={{ width: "10%", height: "100%", border: "0.5px solid #5f5f5f", borderRadius: "20px" }} />
            )}
            <section className='list_sec2'>
                <div className="list_nick">
                    <GoPerson /> &nbsp;
                    {post.author.nickname}
                </div>
                <div className="list_box">
                    <div className="box_time">{formatDate(post.updated_at)}</div>
                    <div className="box_content">
                        <div className="content_item heart_item">
                            {clickHeart ? (
                                <GoHeartFill className='fillheart' onClick={handleClickHeart} />
                            ) : (
                                <GoHeart className='heart' onClick={handleClickHeart} />
                            )}
                            <span>{ likeCount }</span>
                        </div>
                        <div className="content_item comment_item">
                            <LiaComment />
                            <span>{ commentLength }</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CommuList