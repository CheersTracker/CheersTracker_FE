import React, { useState } from 'react';
import { FaComment, FaEdit, FaTrashAlt, FaEllipsisV } from 'react-icons/fa';

const PostTest = () => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <h2>음주</h2>
        <h3>이정도면 음주 습관 안 좋은 편인가요?</h3>
        <div className="post-meta">
          <span>레모나르코빛자료회로</span>
          <span>2024.7.21 18:10</span>
          <span>127</span>
        </div>
      </div>
      <div className="post-content">
        <p>
          제목 그대로 제 음주 습관에 대한 내용입니다. <br />
          일주일에 3~4번 정도 친구들 만나서 술자리에 가는데 못해도 최소한 소주 1병반 이상은 마시는 편인 것 같아요. 
          친구가 좀 많아서인지 주변 다른 친구들과도 많이 마시는 편인 것 같더라고요. 예전엔 신경 안 썼는데 요즘 들어서 
          회복이 잘 안 되다보니 해장에 더 신경쓰게 되고 다음 날 일정 수행할 때도 지장을 좀 미치는 것 같아서요. 
          이게 요즘 몸 상태가 안 좋은 건지, 아니면 제 음주 습관이 나쁜 건지 잘 모르겠어서 글 남깁니다.
          아무래도 성인이라 그런지 시간 맞추기가 어렵더라면 거의 밤에 만나게 되어서 만났다하면 술을 먹게 되는 것 같은데,
          밤에 만나도 술 안 먹고 시간 보내는 방법 있으시면 공유해주시면 감사할 것 같습니다. 금주 목표 세우기만 하면 
          상황상 자꾸 실패하게 되네요. 혼술은 안 한지 한참 되었는데...
        </p>
      </div>
      <div className="post-actions">
        <button><FaEdit /> 수정하기</button>
        <button><FaTrashAlt /> 삭제하기</button>
        <button><FaEllipsisV /> URL 복사</button>
      </div>
      <div className="post-footer">
        <button onClick={toggleComments}>
          <FaComment /> 댓글 추가
        </button>
        <span>14</span>
        <span>4</span>
      </div>
      {showComments && (
        <div className="comments-section">
          <div className="comment">
            <span>참아버지의클래식시계</span>
            <p>
              저는 대학고 1, 2학년 때는 그랬던 것 같은데 건강도 건강이지만 아무리 약바해도 금세 통증이 덩덩 비어서 
              음주 습관을 바꿀 수 밖에 없더라고요. 지금까지 쭉 그렇게 해오셨는데 요즘 들어서 회복이 잘 안 되는 거면 
              이제는 줄이시는 게 맞는 듯 싶습니다. 여전히 만나는 것도 좋고 톨이셔 만남 시간 조율이 쉬워서 낮에 만나기 좋아요.
            </p>
            <span>3</span>
            <span>2</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostTest;
