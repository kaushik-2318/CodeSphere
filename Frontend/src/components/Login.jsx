import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGSAP } from "@gsap/react";
import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";
import Checkbox from "@mui/joy/Checkbox";
import gsap from "gsap";
import Mail from "/icons/mail-fill.svg";
import Lock from "/icons/lock-fill.svg";
import axios from "axios";
import styles from "./css/layout.module.css";
import { loginapi } from "../services/api";

function Login() {
    const pathname = useLocation();
    const navigate = useNavigate();

    useGSAP(() => {
        gsap.from(".slideright", {
            x: 500,
            duration: 2,
            ease: "power4.out",
        });
    }, [pathname]);

    const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm({ defaultValues: { rememberMe: true } });

    const handleInputChange = () => {
        clearErrors();
    };

    const onSubmit = async (data) => {
        try {
            loginapi(data)
                .then((res) => {
                    const responseData = res.data;
                    localStorage.setItem("token", responseData.token);
                    toast.success("Login Successfully");
                    navigate("/");
                    window.location.reload();
                })
                .catch((err) => {
                    setError("serverError", { message: err.response.data.message });
                })
        } catch (err) {
            setError("serverError", { message: err.message });

        }
    }

    return (
        <div
            className={`${styles.card} text-white font-['Geist'] p-10 w-[460px] mt-10 slideright`}
        >
            <form onSubmit={handleSubmit(onSubmit)} onChange={handleInputChange}>
                <div>
                    <div className="mb-2 text-3xl">Login to our platform</div>
                    <div className="text-md">
                        Login here using your username and password
                    </div>
                </div>
                <div className="py-3">
                    {errors.serverError && (
                        <div className="text-red-500">{errors.serverError.message}</div>
                    )}
                </div>
                <div>
                    <div className="flex flex-col pb-7">
                        <label className="flex justify-between items-center" htmlFor="email"  >
                            Your Email
                            {errors.email && (
                                <div className="text-red-500">{errors.email.message}</div>
                            )}
                        </label>
                        <div className="flex bg-[#1f2a37] justify-center items-end h-12 rounded-md mt-1">
                            <span className=" h-full w-[20%] flex justify-center items-center border-[1px] border-[#ffffff20] rounded-l-md">
                                <img className="w-5" src={Mail} alt="mail" />
                            </span>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                        message: "Please enter a valid email",
                                    },
                                })}
                                className="p-2 bg-[#1f2a37] rounded-r-md w-full h-full border-[1px] border-[#ffffff20] hover:border-green-600 focus:border-green-600 outline-none duration-500"
                                type="email"
                                placeholder="example@company.com"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col pb-7">
                        <label className="flex justify-between items-center" htmlFor="password">
                            Your Password
                            {errors.password && (
                                <div className="text-red-500">{errors.password.message}</div>
                            )}
                        </label>
                        <div className="flex bg-[#1f2a37] justify-center items-end h-12 rounded-md mt-1">
                            <span className=" h-full w-[20%] flex justify-center items-center border-[1px] rounded-l-md border-[#ffffff20]">
                                <img className="w-5" src={Lock} alt="Lock" />
                            </span>
                            <input {...register("password", { required: "Password is required" })} className="p-2 bg-[#1f2a37] rounded-r-md w-full h-full border-[1px] border-[#ffffff20] hover:border-green-600 focus:border-green-600 outline-none duration-500" type="password" placeholder="Password" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                        <Checkbox {...register("rememberMe")} defaultChecked />
                        Remember Me
                    </div>
                    <div className="text-blue-500 duration-500 cursor-pointer hover:text-blue-800">
                        Forgotten Password?
                    </div>
                </div>

                <div className="text-center my-7">
                    <Button disabled={isSubmitting} className="bg-[#0064d7] w-full rounded-lg h-full py-2 font-normal tracking-wider disabled:bg-[#0064d769] disabled:cursor-not-allowed" type="submit">
                        Log In
                    </Button>
                </div>

                <div>
                    <div>
                        Not registered?{" "}
                        <span className="text-blue-500 duration-500 cursor-pointer hover:text-blue-800">
                            <Link to="/signup">Create account</Link>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
