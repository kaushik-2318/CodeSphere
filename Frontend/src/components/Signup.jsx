import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
// import { toast } from "react-toastify";
import Mail from "/icons/mail-fill.svg";
import Lock from "/icons/lock-fill.svg";
import Name from "/icons/user-fill.svg";
import gsap from "gsap";

import styles from "./css/layout.module.css";

function Signin() {
    const [stage, setStage] = useState(1);

    const pathname = useLocation();
    const navigate = useNavigate();

    useGSAP(() => {
        gsap.from(".slideright", {
            x: 500,
            duration: 2,
            ease: "power4.out",
        });
    }, [pathname]);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm();

    const handleInputChange = () => {
        clearErrors();
    };

    const onSubmit = async (data) => {
        const requestBody = {
            name: data.name,
            email: data.email,
            password: data.password,
            username: data.username,
            contactnumber: data.contactnumber,
        };

        try {
            let r = await fetch(
                "http://localhost:3000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(requestBody),
                }
            );

            if (!r.ok) {
                const errorRes = await r.json();
                throw new Error(errorRes.message || "Registration failed");
            }

            const responseData = await r.json();
            localStorage.setItem("token", responseData.token);
            navigate("/verification");
        } catch (error) {
            setError("serverError", { message: error.message });
            console.log(error.message);
            window.location.reload(); 
            navigate("/signup");
        }
    };

    const handleStageOneSubmit = () => {
        setStage(2);
    };

    return (
        <div
            className={`${styles.card} text-white font-['Geist'] p-10 w-[460px] mt-10 slideright`}
        >
            <form
                onSubmit={handleSubmit(stage === 1 ? handleStageOneSubmit : onSubmit)}
                onChange={handleInputChange}
            >
                <div>
                    <div className="mb-2 text-3xl">Sign Up to our platform</div>
                    <div className="text-md">Create a new Account</div>
                </div>

                <div className="py-3">
                    {errors.serverError && (
                        <div className="text-red-500">{errors.serverError.message}</div>
                    )}
                </div>

                {stage === 1 && (
                    <div>
                        <div className="flex flex-col pb-5">
                            <label className="flex justify-between items-center">
                                Your Name
                                {errors.name && (
                                    <div className="text-red-500">{errors.name.message}</div>
                                )}
                            </label>
                            <div className="flex bg-[#1f2a37] justify-center items-end h-12 rounded-md mt-1">
                                <span className="h-full w-[20%] flex justify-center items-center border-[1px] border-[#ffffff20] rounded-l-md">
                                    <img className="w-5" src={Name} alt="Name" />
                                </span>
                                <input
                                    {...register("name", { required: "Name is required" })}
                                    className="p-2 bg-[#1f2a37] rounded-r-md w-full h-full border-[1px] border-[#ffffff20] hover:border-blue-600 focus:border-blue-600 outline-none duration-500"
                                    type="text"
                                    placeholder="Name"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col pb-5">
                            <label className="flex justify-between items-center">
                                Your Email
                                {errors.email && (
                                    <div className="text-red-500">{errors.email.message}</div>
                                )}
                            </label>
                            <div className="flex bg-[#1f2a37] justify-center items-end h-12 rounded-md mt-1">
                                <span className="h-full w-[20%] flex justify-center items-center border-[1px] border-[#ffffff20] rounded-l-md">
                                    <img className="w-5" src={Mail} alt="mail" />
                                </span>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Please enter a valid email",
                                        },
                                    })}
                                    className="p-2 bg-[#1f2a37] rounded-r-md w-full h-full border-[1px] border-[#ffffff20] hover:border-blue-600 focus:border-blue-600 outline-none duration-500"
                                    type="text"
                                    placeholder="example@company.com"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col pb-5">
                            <label className="flex justify-between items-center">
                                Your Password
                                {errors.password && (
                                    <div className="text-red-500">{errors.password.message}</div>
                                )}
                            </label>
                            <div className="flex bg-[#1f2a37] justify-center items-end h-12 rounded-md mt-1">
                                <span className="h-full w-[20%] flex justify-center items-center border-[1px] rounded-l-md border-[#ffffff20]">
                                    <img className="w-5" src={Lock} alt="Lock" />
                                </span>
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Minimum Length is 8" },
                                        maxLength: { value: 12, message: "Maximum Length is 12" },
                                    })}
                                    className="p-2 bg-[#1f2a37] rounded-r-md w-full h-full border-[1px] border-[#ffffff20] hover:border-blue-600 focus:border-blue-600 outline-none duration-500"
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="my-3 text-center">
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                className="bg-[#0064d7] w-full rounded-lg h-full py-2 font-normal tracking-wider disabled:bg-[#0064d769] disabled:cursor-not-allowed"
                            >
                                Continue...
                            </Button>
                        </div>
                    </div>
                )}

                {stage === 2 && (
                    <div className="h-full flex-col justify-center">
                        <div className="flex flex-col pb-5">
                            <label className="flex justify-between items-center">
                                Username
                                {errors.username && (
                                    <div className="text-red-500 text-right">
                                        {errors.username.message}
                                    </div>
                                )}
                            </label>
                            <div className="flex bg-[#1f2a37] justify-center items-end h-12 rounded-md mt-1">
                                <span className="h-full w-[20%] flex justify-center items-center border-[1px] rounded-l-md border-[#ffffff20]">
                                    <img className="w-5" src={Name} alt="UserName" />
                                </span>
                                <input
                                    {...register("username", {
                                        required: "Username is required",
                                        minLength: { value: 5, message: "Minimum Length is 5" },
                                        maxLength: { value: 15, message: "Maximum Length is 15" },
                                        pattern: {
                                            value: /^[a-zA-Z0-9_]+$/,
                                            message:
                                                "Username can only contain letters, numbers, and underscores",
                                        },
                                    })}
                                    className="p-2 bg-[#1f2a37] rounded-r-md w-full h-full border-[1px] border-[#ffffff20] hover:border-blue-600 focus:border-blue-600 outline-none duration-500"
                                    type="text"
                                    placeholder="Username"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col pb-5">
                            <label className="flex justify-between items-center">
                                Contact Number
                                {errors.contactnumber && (
                                    <div className="text-red-500">
                                        {errors.contactnumber.message}
                                    </div>
                                )}
                            </label>
                            <div className="flex bg-[#1f2a37] justify-center items-end h-12 rounded-md mt-1">
                                <span className="h-full w-[20%] flex justify-center items-center border-[1px] rounded-l-md border-[#ffffff20]">
                                    <img className="w-5" src={Lock} alt="Lock" />
                                </span>
                                <input
                                    {...register("contactnumber", {
                                        required: "Contact Number is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Please enter a valid 10-digit phone number",
                                        },
                                    })}
                                    className="p-2 bg-[#1f2a37] rounded-r-md w-full h-full border-[1px] border-[#ffffff20] hover:border-blue-600 focus:border-blue-600 outline-none duration-500"
                                    type="text"
                                    placeholder="Contact Number"
                                />
                            </div>
                        </div>

                        <div className="my-3 text-center">
                            <Button
                                disable={isSubmitting}
                                type="submit"
                                className="bg-[#0064d7] w-full rounded-lg h-full py-2 font-normal tracking-wider disabled:bg-[#0064d769] disabled:cursor-not-allowed"
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default Signin;
