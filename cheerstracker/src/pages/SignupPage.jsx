import React, { useState } from 'react'
import '../assets/scss/login.scss'
import Signup1 from '../components/Signup1';
import Signup2 from '../components/Signup2';
import logo_mini from '../assets/images/Logo/CheersTracker_logo_mini.png'

const SignupPage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        setCurrentStep(2);
    };

    const prevStep = () => {
        setCurrentStep(1);
    }

    return (
        <div className='signuppg_container'>
            <div style={{ width: '100%' }}>
                <section className='signuppg_sec1'>
                    <img src={logo_mini} className='logo_mini' />
                </section>
                <section>
                    {currentStep === 1 && <Signup1 onNext={nextStep} />}
                    {currentStep === 2 && <Signup2 onPrev={prevStep} />}
                </section>
            </div>
        </div>
    )
}

export default SignupPage