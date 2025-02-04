import { useContext, useEffect, useState } from "react";
import setting from "/icons/settings-fill.svg";
import bookmark from "/icons/bookmark-fill.svg";
import styles from "./css/profilepage.module.css";
import dashbaord from "/icons/dashboard-fill.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getLoginUserProfileapi, logoutapi } from "../services/api.js";
import { toast } from "react-toastify";
import { modalContext } from "../context/ModelContext.jsx";
import Dashboard from "../components/Dashboard.jsx";
import Settings from "../components/Setting.jsx";
import BookMark from "../components/Bookmark.jsx"

export default function ProfilePage() {
    const navigate = useNavigate();
    const loaction = useLocation();
    const [profile, setProfile] = useState({});
    const [editMode, setEditMode] = useState(false);
    const { isOpen, setIsOpen } = useContext(modalContext);

    const getProfile = () => {
        getLoginUserProfileapi()
            .then((res) => {
                setIsOpen(false);
                setProfile(res.data.user);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    setIsOpen(true);
                    toast.error("Unauthorized access. Please log in again.");
                } else {
                    toast(err.message);
                    setIsOpen(true);
                }
            }
            );
    };
    const logout = () => {
        logoutapi()
            .then(() => {
                localStorage.removeItem("token");
                navigate("/");
                window.location.reload();
            })
            .catch((error) => {
                toast.error("There was an error logging out:", error);
            });
    };

    useEffect(() => {
        getProfile();
    }, []);

    const handleCancel = (e) => {
        e.preventDefault();
        setEditMode(!editMode);
    };

    return (
        <>
            <div className="bg-[#0f172a] mb-[300px] flex min-h-screen">
                <div className="bg-[#19212d] w-[300px]">
                    <div className={`pb-4 gap-4 flex justify-center items-center flex-col pt-[100px] ${styles.backgroundleft} text-white text-center`}>
                        <div>
                            <img className="rounded-full w-[60px] h-[60px] border-[1px] object-cover" src={profile?.profilepicture} alt="Profile" />
                        </div>
                        <div>
                            <div className="py-1 outline-none w-28 text-center">
                                {profile && profile.name}
                            </div>
                        </div>
                        <button onClick={handleCancel} className="border-[1px] px-2 w-24 py-1 rounded-xl shadow-2xl backdrop-blur-md">
                            {editMode ? "Cancel" : "Edit Profile"}
                        </button>
                    </div>

                    <div className="h-full font-['Exo']">
                        <ul className="flex flex-col text-white text-xl">
                            <Link to={`/dashboard`}>
                                <li className={`flex cursor-pointer gap-3 justify-start items-center mx-8 pl-1 py-5 duration-300 border-2 border-transparent ${loaction.pathname === "/dashboard" ? "border-b-gray-700" : "hover:border-b-gray-700"}`}>
                                    <img width={15} src={dashbaord} alt="Dashboard Icon" />
                                    <span>Dashboard</span>
                                </li>
                            </Link>
                            <Link to={`/bookmark`}>
                                <li className={`flex cursor-pointer gap-3 justify-start items-center mx-8 pl-1 py-5 duration-300 border-2 border-transparent ${loaction.pathname === "/bookmark" ? "border-b-gray-700" : "hover:border-b-gray-700"}`}>
                                    <img width={20} src={bookmark} alt="bookmaek icon" />
                                    Bookmarks
                                </li>
                            </Link>
                            <Link to={`/setting`}>
                                <li className={`flex cursor-pointer gap-3 justify-start items-center mx-8 pl-1 py-5 duration-300 border-2 border-transparent ${loaction.pathname === "/setting" ? "border-b-gray-700" : "hover:border-b-gray-700"}`}>
                                    <img width={15} src={setting} alt="setting icon" />
                                    <span>Setting</span>
                                </li>
                            </Link>
                            <li onClick={logout} className="flex cursor-pointer gap-3 justify-start items-center mx-8 pl-1 py-5 duration-300 border-2 border-transparent hover:border-b-gray-700 hover:text-red-500 group/hover"   >
                                <div className="w-[20px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`fill-white group-hover/hover:fill-red-500 duration-300`}   >
                                        <path d="M5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2ZM9 11V8L4 12L9 16V13H15V11H9Z"></path>
                                    </svg>
                                </div>
                                Sign Out
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full">
                    {loaction.pathname === "/dashboard" && (
                        <Dashboard editMode={editMode} setEditMode={setEditMode} isOpen={isOpen} setIsOpen={setIsOpen} />
                    )}
                    {loaction.pathname === "/setting" && <Settings />}
                    {loaction.pathname === "/bookmark" && <BookMark />}
                </div>
            </div >
        </>
    );
}