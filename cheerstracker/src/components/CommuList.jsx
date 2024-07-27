import React, { useState } from 'react'
import { GoPerson } from "react-icons/go";
import { AiOutlineEye } from "react-icons/ai";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { LiaComment } from "react-icons/lia";

const CommuList = () => {
    const [clickHeart, setClickHeart] = useState(false);

    const handleClickHeart = () => {
        setClickHeart(!clickHeart);
    };

    return (
        <div className='community_list_container'>
            <section className='list_sec1'>
                <div className='list_category'>음주</div>
                <div className="list_title">이정도면 음주 습관 안 좋은 편인가요?</div>
            </section>
            <section className='list_sec2'>
                <div className="list_nick">
                    <GoPerson /> &nbsp;
                    레몬나르고빚갚으리오
                </div>
                <div className="list_box">
                    <div className="box_time">3분전</div>
                    <div className="box_content">
                        <div className="content_item view_item">
                            <AiOutlineEye />
                            <span>127</span>
                        </div>
                        <div className="content_item heart_item">
                            {clickHeart ? (
                                <GoHeartFill className='fillheart' onClick={handleClickHeart} />
                            ) : (
                                <GoHeart className='heart' onClick={handleClickHeart} />
                            )}
                            <span>14</span>
                        </div>
                        <div className="content_item comment_item">
                            <LiaComment />
                            <span>4</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CommuList