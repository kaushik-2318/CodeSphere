import { useEffect, useState } from "react";
import styles from "./css/otpverification.module.css";
import Otp from "./Otp";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import { sendEmailOtp, verifyEmailOtp } from '../services/api';

function OtpVerification() {
    const [emailOtp, setEmailOtp] = useState(null);
    const [timer, setTimer] = useState(120);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        sendOtp();
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(countdown);
                    setIsResendDisabled(false);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const sendOtp = () => {
        sendEmailOtp()
            .then((res) => {
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleResendOtp = () => {
        sendOtp();
        setTimer(120);
        setIsResendDisabled(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        verifyEmailOtp(emailOtp)
            .then(() => {
                setIsSubmitting(false);
                navigate('/');
                window.location.reload();
                toast.success("Email Verified");
            })
            .catch((err) => {
                setIsSubmitting(false);
                console.log(err.response.status);
                if (err.response.status === 401) {
                    navigate('/signup');
                }
                if (err.response) {
                    const errorMessage = err.response.data.message || 'An error occurred';
                    toast.error(errorMessage);
                }
                else {
                    toast.error('Something went wrong');
                }
            });
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={` ${styles.card} text-white font-['Geist'] p-10 w-[460px] mt-10 slideright flex flex-col`}>
            <div className="text-3xl">Enter One Time Password</div>

            <div className="text-red-500 py-3"></div>

            <div className="flex flex-col">
                <div>Send on Email</div>
                <div className="pl-3 mt-4">
                    <Otp onOtpSubmit={setEmailOtp} disable={false} />
                </div>

                <div className="text-right text-[#ffffffae] mt-4">
                    {timer > 0 ? (
                        <span className="text-sm font-['Exo'] cursor-not-allowed">
                            Resend OTP in: {formatTime(timer)}
                        </span>
                    ) : (
                        <button
                            className="text-sm font-['Exo'] cursor-pointer"
                            onClick={handleResendOtp}
                            disabled={isResendDisabled}
                        >
                            Resend OTP
                        </button>
                    )}
                </div>
                <Button disabled={isSubmitting} className="bg-blue-500 rounded-xl mt-5 disabled:bg-blue-400 disabled:cursor-not-allowed" onClick={handleSubmit}>
                    Submit OTP
                </Button>
            </div>
        </div>
    );
}

export default OtpVerification;
