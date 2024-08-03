import React, { useState } from 'react'

const Signup1 = ({ onNext }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleRePasswordChange = (e) => {
        const value = e.target.value;
        setRePassword(value);
        setPasswordMatch(value === password);
    };

    const handleNext = () => {
        if (passwordMatch) {
            console.log(id);
            console.log(password);
            onNext({ id, password });
        }
    };

    return (
        <div className='signup_container'>
            <form className='login_sec1'>
                <div className="sec1_header">
                    <div style={{ width: "25px", height: "25px" }}></div>
                    <p className='login_title'>회원가입</p>
                    <div></div>
                </div>
                <div className='login_id_container'>
                    <p className='login_id_label'>아이디를 입력하세요.</p>
                    <div className="id_input_content">
                        <input type="text" id='id' value={id} onChange={(e) => setId(e.target.value)} required />
                        <button type='button' className='duplicate_btn'>중복 확인</button>
                    </div>
                </div>
                <div className='login_pw_container'>
                    <p className='login_pw_label'>비밀번호를 입력하세요.</p>
                    <div className="pw_input">
                        <input type="password" id='pw' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </div>
                <div className='login_pw_container'>
                    <p className='login_pw_label'>비밀번호를 다시 입력하세요.</p>
                    <div className="pw_input">
                        <input type="password" id='pw_re' value={rePassword} onChange={handleRePasswordChange} required />
                    </div>
                    {!passwordMatch && rePassword && (
                        <p className='pw_error_msg'>비밀번호를 다시 확인해주세요.</p>
                    )}
                </div>
                <button type="button" className="login_button" onClick={handleNext}>다음</button>
            </form>
            <section className='login_sec2'>
                <span>이미 계정이 있으신가요?</span>
                <a href="#">로그인하기</a>
            </section>
        </div>
    )
}

export default Signup1