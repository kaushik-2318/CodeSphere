import logo from "/logo.png";
import styles from "./css/layout.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Login from "../components/Login";
import Signin from "../components/Signup";
import { useLocation } from "react-router-dom";
import OtpVerification from "../components/OtpVerification";

gsap.registerPlugin(useGSAP);

function Layout() {
    const { pathname } = useLocation();

    const text = "Empowering the Next Tech Frontier";

    useGSAP(() => {
        gsap.from(".slideleft", {
            x: -300,
            duration: 2,
            opacity: 0,
            ease: "power4.out",
        });
        gsap.from(".word", {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            ease: "power1.out",
        });
    });

    return (
        <>
            <div className="mb-[300px] h-screen flex flex-row overflow-hidden">
                <div className={`h-screen w-[55%] ${styles.left} flex flex-col`}>
                    <div className="flex flex-col items-end justify-center h-full pr-48">
                        <img className="w-96 slideleft" src={logo} alt="logo" />
                        <p className="text-white font-['Exo'] text-center w-max">
                            {text.split(" ").map((word, index) => (
                                <span key={index} className="word">
                                    {word + " "}
                                </span>
                            ))}
                        </p>
                    </div>
                    <div className="text-right mr-[17rem] mb-5 text-gray-400">
                        Privacy Policy
                    </div>
                </div>
                <div
                    className={`bg-[#05071a] w-[45%] h-screen ${styles.right} flex justify-center items-center pr-20`}
                >
                    {pathname === "/signin" && <Login />}
                    {pathname === "/signup" && <Signin />}
                    {pathname === "/verification" && <OtpVerification />}
                </div>
            </div>
        </>
    );
}

export default Layout;
