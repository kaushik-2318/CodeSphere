import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { modalContext } from "../context/ModelContext";
import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";
import Checkbox from "@mui/joy/Checkbox";
import Mail from "/icons/mail-fill.svg";
import Lock from "/icons/lock-fill.svg";
import close from "/icons/close-large-fill.svg";
import { loginapi } from "../services/api";


function Model({ open }) {
    const { setIsOpen } = useContext(modalContext);
    const navigate = useNavigate();

    const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm({ defaultValues: { rememberMe: true } });

    const handleInputChange = () => {
        clearErrors();
    };

    const onSubmit = async (data) => {
        setError("serverError", null);
        try {
            const response = await loginapi(data);
            localStorage.setItem("token", response.data.token);

            toast.success("Logged In Successfully");
            setIsOpen(false);
            window.location.reload();
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Login failed";
            setError("serverError", { message: errorMessage });
        }
    };



    return (
        <>
            {open && (
                <div className="fixed h-screen w-full flex justify-center items-center text-white backdrop-blur-sm z-[99] overflow-y-hidden">
                    <div className="w-10 absolute top-10 right-10">
                        <img
                            src={close}
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(false);
                                navigate("/");
                            }}
                            alt="Close Icon"
                        />
                    </div>
                    <div
                        className={`text-white font-['Geist'] p-7 w-[400px] mt-10 slideright bg-[#111928] rounded-[12px] border-[1px] border-[#ffffff20]`}
                    >
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            onChange={handleInputChange}
                        >
                            <div>
                                <div className="mb-2 text-3xl">Login to our platform</div>
                                <div className="text-md">
                                    Login here using your username and password
                                </div>
                            </div>
                            <div className="py-3">
                                {errors.serverError && (
                                    <div className="text-red-500">
                                        {errors.serverError.message}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex flex-col pb-7">
                                    <label
                                        className="flex justify-between items-center"
                                        htmlFor="email"
                                    >
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
                                                    value:
                                                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                    message: "Please enter a valid email",
                                                },
                                            })}
                                            className="p-2 bg-[#1f2a37] rounded-r-md w-full h-full border-[1px] border-[#ffffff20] hover:border-blue-600 focus:border-blue-600 outline-none duration-500"
                                            type="email"
                                            placeholder="example@company.com"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col pb-7">
                                    <label
                                        className="flex justify-between items-center"
                                        htmlFor="password"
                                    >
                                        Your Password
                                        {errors.password && (
                                            <div className="text-red-500">
                                                {errors.password.message}
                                            </div>
                                        )}
                                    </label>
                                    <div className="flex bg-[#1f2a37] justify-center items-end h-12 rounded-md mt-1">
                                        <span className="h-full w-[20%] flex justify-center items-center border-[1px] rounded-l-md border-[#ffffff20]">
                                            <img className="w-5" src={Lock} alt="Lock" />
                                        </span>
                                        <input
                                            {...register("password", {
                                                required: "Password is required",
                                            })}
                                            className="p-2 bg-[#1f2a37] rounded-r-md w-full h-full border-[1px] border-[#ffffff20] hover:border-blue-600 focus:border-blue-600 outline-none duration-500"
                                            type="password"
                                            placeholder="Password"
                                        />
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
                                <Button
                                    disabled={isSubmitting}
                                    className="bg-[#0064d7] w-full rounded-lg h-full py-2 font-normal tracking-wider disabled:bg-[#0064d769] disabled:cursor-not-allowed"
                                    type="submit"
                                >
                                    Log In
                                </Button>
                            </div>
                            <div>
                                <div>
                                    Not registered?{" "}
                                    <span className="text-blue-500 duration-500 cursor-pointer hover:text-blue-800">
                                        <Link onClick={(e) => { e.preventDefault(); navigate('/signup'); setIsOpen(false); }}>Create account</Link>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Model;
