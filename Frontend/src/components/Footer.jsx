import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "/logo.png";

export default function Footer() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const logout = () => {
        axios
            .post(
                `http://localhost:3000/auth/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then(() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                navigate("/");
                window.location.reload();
            })
            .catch((error) => {
                console.error("There was an error logging out:", error);
            });
    };

    return (
        <>
            <div className="bg-[#05071a] text-white flex flex-col justify-center items-center fixed z-[-1] bottom-0 h-[300px] w-full font-['Exo']">
                <div className="flex flex-row items-center justify-around w-full py-10">
                    <div className="text-3xl font-['Montserrat']">
                        Let&apos;s stay in touch!
                    </div>
                    <div>
                        <form className="flex gap-10" action="">
                            <input
                                className="p-2 px-5 bg-gray-800 rounded-xl"
                                type="text"
                                name=""
                                id=""
                                placeholder="Enter your Email"
                            />
                            <button
                                type="submit"
                                className="p-3 px-5 font-light text-white bg-blue-500 rounded-xl"
                            >
                                Suscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex items-center justify-center w-full gap-10 px-28">
                    <hr className="w-full" />
                    <div className="flex w-[50%] justify-center items-center gap-4">
                        <Link
                            target="blank"
                            to="https://www.facebook.com/kaushik.verma.10?mibextid=ZbWKwL"
                        >
                            <div className="w-10 h-10 transition-transform duration-300 hover:scale-110">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="fill-white hover:fill-[#3b5998] transition-colors duration-300"
                                >
                                    <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z"></path>
                                </svg>
                            </div>
                        </Link>
                        <Link
                            target="blank"
                            to="https://www.instagram.com/kaushikverma_19?igsh=MXhhN3phY2VscnFlYw=="
                        >
                            <div className="w-10 h-10 transition-transform duration-300 hover:scale-110">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className={`fill-white hover:fill-[#E4405F] transition-colors duration-300`}
                                >
                                    <path d="M13.0281 2.00073C14.1535 2.00259 14.7238 2.00855 15.2166 2.02322L15.4107 2.02956C15.6349 2.03753 15.8561 2.04753 16.1228 2.06003C17.1869 2.1092 17.9128 2.27753 18.5503 2.52503C19.2094 2.7792 19.7661 3.12253 20.3219 3.67837C20.8769 4.2342 21.2203 4.79253 21.4753 5.45003C21.7219 6.0867 21.8903 6.81337 21.9403 7.87753C21.9522 8.1442 21.9618 8.3654 21.9697 8.58964L21.976 8.78373C21.9906 9.27647 21.9973 9.84686 21.9994 10.9723L22.0002 11.7179C22.0003 11.809 22.0003 11.903 22.0003 12L22.0002 12.2821L21.9996 13.0278C21.9977 14.1532 21.9918 14.7236 21.9771 15.2163L21.9707 15.4104C21.9628 15.6347 21.9528 15.8559 21.9403 16.1225C21.8911 17.1867 21.7219 17.9125 21.4753 18.55C21.2211 19.2092 20.8769 19.7659 20.3219 20.3217C19.7661 20.8767 19.2069 21.22 18.5503 21.475C17.9128 21.7217 17.1869 21.89 16.1228 21.94C15.8561 21.9519 15.6349 21.9616 15.4107 21.9694L15.2166 21.9757C14.7238 21.9904 14.1535 21.997 13.0281 21.9992L12.2824 22C12.1913 22 12.0973 22 12.0003 22L11.7182 22L10.9725 21.9993C9.8471 21.9975 9.27672 21.9915 8.78397 21.9768L8.58989 21.9705C8.36564 21.9625 8.14444 21.9525 7.87778 21.94C6.81361 21.8909 6.08861 21.7217 5.45028 21.475C4.79194 21.2209 4.23444 20.8767 3.67861 20.3217C3.12278 19.7659 2.78028 19.2067 2.52528 18.55C2.27778 17.9125 2.11028 17.1867 2.06028 16.1225C2.0484 15.8559 2.03871 15.6347 2.03086 15.4104L2.02457 15.2163C2.00994 14.7236 2.00327 14.1532 2.00111 13.0278L2.00098 10.9723C2.00284 9.84686 2.00879 9.27647 2.02346 8.78373L2.02981 8.58964C2.03778 8.3654 2.04778 8.1442 2.06028 7.87753C2.10944 6.81253 2.27778 6.08753 2.52528 5.45003C2.77944 4.7917 3.12278 4.2342 3.67861 3.67837C4.23444 3.12253 4.79278 2.78003 5.45028 2.52503C6.08778 2.27753 6.81278 2.11003 7.87778 2.06003C8.14444 2.04816 8.36564 2.03847 8.58989 2.03062L8.78397 2.02433C9.27672 2.00969 9.8471 2.00302 10.9725 2.00086L13.0281 2.00073ZM12.0003 7.00003C9.23738 7.00003 7.00028 9.23956 7.00028 12C7.00028 14.7629 9.23981 17 12.0003 17C14.7632 17 17.0003 14.7605 17.0003 12C17.0003 9.23713 14.7607 7.00003 12.0003 7.00003ZM12.0003 9.00003C13.6572 9.00003 15.0003 10.3427 15.0003 12C15.0003 13.6569 13.6576 15 12.0003 15C10.3434 15 9.00028 13.6574 9.00028 12C9.00028 10.3431 10.3429 9.00003 12.0003 9.00003ZM17.2503 5.50003C16.561 5.50003 16.0003 6.05994 16.0003 6.74918C16.0003 7.43843 16.5602 7.9992 17.2503 7.9992C17.9395 7.9992 18.5003 7.4393 18.5003 6.74918C18.5003 6.05994 17.9386 5.49917 17.2503 5.50003Z"></path>
                                </svg>
                            </div>
                        </Link>
                        <Link target="blank" to="https://x.com/SilentK68296830">
                            <div className="w-10 h-10 transition-transform duration-300 hover:scale-110">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className={`fill-white duration-300`}
                                >
                                    <path d="M18.2048 2.25H21.5128L14.2858 10.51L22.7878 21.75H16.1308L10.9168 14.933L4.95084 21.75H1.64084L9.37084 12.915L1.21484 2.25H8.04084L12.7538 8.481L18.2048 2.25ZM17.0438 19.77H18.8768L7.04484 4.126H5.07784L17.0438 19.77Z"></path>
                                </svg>
                            </div>
                        </Link>
                        <Link
                            target="blank"
                            to="https://www.linkedin.com/in/kaushik-verma-2b5515254/"
                        >
                            <div className="w-10 h-10 transition-transform duration-300 hover:scale-110">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className={`fill-white hover:fill-[#0f57de] transition-colors duration-300`}
                                >
                                    <path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z"></path>
                                </svg>
                            </div>
                        </Link>
                        <Link target="blank" to="https://github.com/kaushik-2318">
                            <div className="w-10 h-10 transition-transform duration-300 hover:scale-110">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className={`fill-white duration-300`}
                                >
                                    <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
                                </svg>
                            </div>
                        </Link>
                    </div>
                    <hr className="w-full" />
                </div>
                <div className="flex items-center justify-around w-full pt-10 pb-6">
                    <div className="flex font-['Catamaran']">
                        <div className="px-3 border-r-2 border-zinc-700">
                            <Link to="/">Home</Link>
                        </div>
                        {isLoggedIn ? (
                            <>
                                <div className="px-3 border-r-2 border-zinc-700">
                                    <Link to="/upload">Upload</Link>
                                </div>
                                <div className="px-3 border-r-2 border-zinc-700">
                                    <Link to="/contact">Contact US</Link>
                                </div>
                                <div className="pl-3 text-red-500">
                                    <Link onClick={logout} to="/">
                                        Logout
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="px-3 border-r-2 border-zinc-700">
                                    <Link to="/signup">Sign Up</Link>
                                </div>
                                <div className="px-3 border-r-2 border-zinc-700">
                                    <Link to="/signin">Sign In</Link>
                                </div>
                                <div className="pl-3">
                                    <Link to="/contact">Contact US</Link>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="">
                        <img className="w-96" src={logo} alt="" />
                    </div>

                    <div className='text-zinc-500 font-["Catamaran"]'>
                        Copyright © 2024 All rights reserved
                    </div>
                </div>
            </div>
        </>
    );
}
