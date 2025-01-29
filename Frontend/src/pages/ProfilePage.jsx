import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";
import { modalContext } from "../context/ModelContext.jsx";
import pin from "/icons/map-pin-fill.svg";
import setting from "/icons/settings-fill.svg";
import like from "/icons/heart-3-fill.svg";
import bookmark from "/icons/bookmark-fill.svg";
import more from "/icons/more-fill.svg";
import pencil from "/icons/pencil-fill.svg";
import Chart from "../components/Chart.jsx";
import Modal from "../components/Model.jsx";

import styles from "./css/profilepage.module.css";

import { getLoginUserProfileapi, logoutapi, updateLoginUserProfileapi } from "../services/api.js";


export default function ProfilePage() {
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const { isOpen, setIsOpen } = useContext(modalContext);
    const [bioLength, setBioLength] = useState(0);
    const [templates, setTemplates] = useState([]);
    const [totalTemplates, setTotalTemplates] = useState(0);

    const { register, clearErrors, handleSubmit, formState: { isSubmitting } } = useForm();

    const getProfile = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast("Token not found in localStorage.");
            setIsOpen(true);
            return;
        }

        getLoginUserProfileapi()
            .then((res) => {
                setIsOpen(false);
                setProfile(res.data.user);
                setTemplates(res.data.user.templates);
                setTotalTemplates(res.data.user.templates.length);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    setIsOpen(true);
                    toast.error("Unauthorized access. Please log in again.");
                } else {
                    toast(err.message);
                    setIsOpen(true);
                }
            });
    };

    const updateProfile = (data) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsOpen(true);
            return;
        }
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("username", data.username);
        formData.append("location", data.location);
        formData.append("bio", data.bio);

        if (data.coverphoto && data.coverphoto.length > 0) {
            formData.append("coverphoto", data.coverphoto[0]);
        }
        if (data.profilepicture && data.profilepicture.length > 0) {
            formData.append("profilepicture", data.profilepicture[0]);
        }

        updateLoginUserProfileapi(formData)
            .then((response) => {
                setEditMode(false);
                setProfile(response.data.user);
                toast.success("Profile updated successfully");
                getProfile();
                window.location.reload();
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    toast.error(err.response.data.message || "Error updating profile");
                }
                if (err.response && err.response.status === 401) {
                    setIsOpen(true);
                    toast.error("Unauthorized access. Please log in again.");
                } else if (err.response) {
                    toast.error(
                        `Error: ${err.response.data.message || "Something went wrong"}`
                    );
                } else {
                    toast.error(`Error: ${err.message}`);
                }
            });
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

    const handleProfileUpdate = (data) => {
        if (editMode) {
            updateProfile(data);
        } else {
            setEditMode(true);
        }
    };

    const handleProfileUpdateErrors = (errors) => {
        if (errors.username) {
            toast.error(errors.username.message);
        }
        if (errors.serverError) {
            toast.error(errors.serverError.message);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setEditMode(!editMode);
    };

    const handleBioChange = (e) => {
        const bio = e.target.value;
        setBioLength(bio.length);
    };
    const handleInputChange = () => {
        clearErrors();
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <>
            {isOpen && <Modal open={isOpen} />}
            <form onSubmit={handleSubmit(handleProfileUpdate, handleProfileUpdateErrors)} onChange={handleInputChange}>
                <div className="bg-[#1d2734] mb-[300px] flex min-h-screen">
                    <div className="bg-[#19212d] w-[300px]">
                        <div className={`pb-4 gap-4 flex justify-center items-center flex-col pt-[100px] ${styles.backgroundleft} text-white text-center`}>
                            <div>
                                <img className="rounded-full w-[60px] h-[60px] border-[1px] object-cover" src={profile?.profilepicture} alt="Profile" />
                            </div>
                            <div>
                                {editMode ? (
                                    <input {...register("name", { required: true })} defaultValue={profile.name} className="bg-transparent border-[1px] rounded-md border-gray-500 px-2 py-1 outline-none w-28 text-center" placeholder={profile.name || "No name available"} type="text" />
                                ) : (
                                    <div className="py-1 outline-none w-28 text-center">
                                        {profile && profile.name}
                                    </div>
                                )}
                            </div>
                            <button onClick={handleCancel} className="border-[1px] px-2 w-24 py-1 rounded-xl shadow-2xl backdrop-blur-md">
                                {editMode ? "Cancel" : "Edit Profile"}
                            </button>
                        </div>

                        <div className="h-full font-['Exo']">
                            <ul className="flex flex-col text-white text-xl">
                                <li className="flex cursor-pointer gap-3 justify-start items-center mx-8 pl-1 py-5 duration-300 border-2 border-transparent hover:border-b-gray-700">
                                    <img width={15} src={setting} alt="" />
                                    <span>Setting</span>
                                </li>
                                <Link to="/bookmark">
                                    <li className="flex cursor-pointer gap-3 justify-start items-center mx-8 pl-1 py-5 duration-300 border-2 border-transparent hover:border-b-gray-700">
                                        <img width={20} src={bookmark} alt="" />
                                        Bookmarks
                                    </li>
                                </Link>
                                <li className="flex cursor-pointer gap-3 justify-start items-center mx-8 pl-1 py-5 duration-300 border-2 border-transparent hover:border-b-gray-700">
                                    <img width={20} src={like} alt="" />
                                    Likes
                                </li>
                                <l onClick={logout} className="flex cursor-pointer gap-3 justify-start items-center mx-8 pl-1 py-5 duration-300 border-2 border-transparent hover:border-b-gray-700 hover:text-red-500 group/hover"   >
                                    <div className="w-[20px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`fill-white group-hover/hover:fill-red-500 duration-300`}   >
                                            <path d="M5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2ZM9 11V8L4 12L9 16V13H15V11H9Z"></path>
                                        </svg>
                                    </div>
                                    Sign Out
                                </l>
                            </ul>
                        </div>
                    </div>

                    {/* PROFILE SECTION START */}
                    <div className=" flex w-full justify-between">
                        {profile && profile.coverphoto ? (
                            <div
                                className={`bg-no-repeat bg-center bg-cover bg-fixed  items-center absolute h-[340px] w-[1200px]`}
                                style={{
                                    backgroundImage: `linear-gradient(90deg, rgba(29,39,52,0.3) 0%, rgba(29,39,52,0.6) 40%, rgba(29,39,52,0.9) 67%, rgba(29,39,52,1) 100%), url(${profile.coverphoto})`,
                                }}
                            ></div>
                        ) : (
                            <div
                                className={`bg-no-repeat bg-cover bg-center bg-fixed items-center absolute h-[340px]`}
                                style={{
                                    backgroundImage: `linear-gradient(90deg, rgba(29,39,52,0.3) 0%, rgba(29,39,52,0.6) 40%, rgba(29,39,52,0.9) 67%, rgba(29,39,52,1) 100%)`,
                                }}
                            ></div>
                        )}
                        <div className="w-full z-[1] pt-[90px] pl-20 p-5 pr-20">
                            <div className="uppercase border-b-[1px] mb-10 text-2xl tracking-wider font-bold pb-4 border-gray-600 text-[#f04f58] flex justify-between items-center">
                                Profile
                                {editMode && (
                                    <div className="grid text-white font-['Exo'] font-light max-w-sm items-center gap-1.5">
                                        <label
                                            className="font-normal rounded-md border-gray-400 border-2 text-white text-sm hover:bg-blue-500 hover:border-blue-500 duration-200 py-1 px-3"
                                            htmlFor="coverbackground"
                                        >
                                            Change Background
                                        </label>
                                        {/* <input hidden {...register("coverphoto")} onChange={(e) => setPreviewCover(URL.createObjectURL(e.target.files[0]))} accept="image/*" id='coverbackground' type="file" /> */}
                                        <input
                                            hidden
                                            {...register("coverphoto")}
                                            accept="image/*"
                                            id="coverbackground"
                                            type="file"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex">
                                <div className="h-[100px] w-[100px] flex justify-center items-center border-white" style={editMode ? { display: "none" } : { display: "block" }}>
                                    <img className="rounded-full h-[90px] w-[90px] object-cover" src={profile?.profilepicture} alt="Profile" />
                                </div>

                                {editMode && (
                                    <>
                                        <label className="h-[100px] w-[100px] border-white cursor-pointer relative" htmlFor="profilepicture"        >
                                            <img className="rounded-full h-[90px] w-[90px] border-2 object-cover" src={profile.profilepicture} alt="Profile Picture" />
                                            <div className="w-[20px] h-[20px] bg-blue-500 absolute right-2 bottom-2 rounded-md flex justify-center items-center">
                                                <img className="w-[15px] h-[15px]" src={pencil} alt="Edit Icon" />
                                            </div>
                                        </label>
                                        {/* <input hidden {...register("profilepicture")} onChange={(e) => setProfilePicture(URL.createObjectURL(e.target.files[0]))} type="file" id='profilepicture' accept="image/*" /> */}
                                        <input
                                            hidden
                                            {...register("profilepicture")}
                                            type="file"
                                            id="profilepicture"
                                            accept="image/*"
                                        />
                                    </>
                                )}
                                <div className="pl-10  flex flex-row justify-between w-full pr-20">
                                    <div>
                                        <div className="text-2xl tracking-wide text-[#f04f58] font-bold">
                                            {editMode ? (
                                                <div>
                                                    <input defaultValue={profile.username}
                                                        {...register("username", {
                                                            required: "Username is required",
                                                            minLength: {
                                                                value: 5,
                                                                message: "Minimum Length is 5",
                                                            },
                                                            maxLength: {
                                                                value: 15,
                                                                message: "Maximum Length is 15",
                                                            },
                                                            pattern: {
                                                                value: /^[a-zA-Z0-9_]+$/,
                                                                message:
                                                                    "Username can only contain letters, numbers, and underscores",
                                                            },
                                                        })} className="bg-transparent border-[1px] rounded-md border-gray-500 px-2 py-1 outline-none mb-3" placeholder={profile.username} type="text" />
                                                </div>
                                            ) : (
                                                <div className="px-2 py-1" style={editMode ? { border: "1px solid #27272a" } : { border: "1px solid transparent" }}      >
                                                    {profile && <div>{profile.username}</div>}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-sm tracking-wide flex justify-start gap-1 items-center text-white font-light mb-2 ">
                                            <img width={12} src={pin} alt="Location Icon" />
                                            {editMode ? (
                                                <input defaultValue={profile.location} {...register("location")} className="bg-transparent border-[1px] rounded-md border-gray-500 px-2 py-1 outline-none" placeholder={profile.location} type="text" />
                                            ) : (
                                                <div className="px-2 w-full h-full py-1 border-[1px] border-transparent">
                                                    {profile && (
                                                        <div>
                                                            {" "}
                                                            {profile && <div>{profile.location}</div>}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="h-[70px]">
                                            <div className="text-sm text-white font-light text-justify min-w-[35rem] max-w-[38rem] h-[70px]">
                                                {editMode ? (
                                                    <div className="h-full w-full">
                                                        <textarea defaultValue={profile.bio} {...register("bio")} maxLength={340} onChange={handleBioChange} className="bg-transparent border-[1px] rounded-md border-gray-500 px-2 py-1 outline-none h-full w-full" placeholder={profile.bio} type="text" />
                                                    </div>
                                                ) : (
                                                    <div className="px-2 py-1 mb-3 h-full w-full" style={editMode ? { border: "1px solid #27272a" } : { border: "1px solid transparent" }}   >
                                                        {profile && <div>{profile.bio}</div>}
                                                    </div>
                                                )}
                                            </div>
                                            {editMode && (
                                                <div className="text-right text-white font-light text-sm mt-2">
                                                    Remaining Character: {340 - bioLength}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-center ">
                                        <div className="text-7xl text-[#f04f58] font-bold">
                                            {totalTemplates}
                                        </div>
                                        <div className="text-white text-sm font-light">
                                            Total Number of Posts
                                        </div>
                                        {editMode && (
                                            <Button disabled={isSubmitting} type="submit" className="text-white rounded-md border-[1px] mt-3 hover:bg-blue-500 hover:border-blue-500 duration-200 disabled:bg-blue-100">
                                                Update Profile
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={`mt-10 flex justify-center items-center border-gray-600 border-b-[1px] ${styles.graphbackground}`}>
                                {totalTemplates > 0 &&
                                    <>
                                        <Chart />
                                    </>
                                }
                            </div>
                            <div>
                                <div className="uppercase text-2xl tracking-wider text-[#f04f58] mt-5">
                                    Your Posts
                                </div>
                                {templates.length > 0 ? (

                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 py-10 gap-10">
                                            {templates.map((template, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-center w-96"
                                                >
                                                    <Card template={template} profile={profile} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>) : (
                                    <div className="text-white text-center py-10 font-['Exo']">
                                        No posts available. <Link className="italic hover:underline duration-200 hover:text-blue-500" to='/upload'>  Create your first post!</Link>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    </div>

                </div >
            </form >
        </>
    );
}

export const Card = ({ template, profile }) => {
    const handleClick = (e) => {
        e.preventDefault();
        setModel(!model);
    };

    const [model, setModel] = useState(false);

    return (
        <>
            <div className="rounded-2xl h-full overflow-hidden border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative p-4 w-[23rem] flex flex-col gap-5 text-white font-['Catamaran'] z-50 bg-[#11192833] backdrop-blur-[27px] backdrop-saturate-[57%]">
                <div className="relative z-50">
                    <div >
                        <div className="absolute right-6 top-4">
                            <button onClick={handleClick}>
                                <img className="w-7" src={more} alt="" />
                            </button>
                        </div>

                        {model && (
                            <>
                                <div className={`absolute z-[1000] top-12 ${styles.dropdownbox} right-2 rounded-md font-['Exo'] text-red-500 border-2 border-[#ffffff20] bg-[#11192869] p-2 backdrop-blur-md cursor-pointer`}>
                                    Delete Template
                                </div>
                            </>
                        )}

                        <div >
                            <img className="w-full rounded-2xl h-52" src={template.thumbnail} alt="image" />
                        </div>

                        <div className="flex flex-row items-center justify-start gap-4 mt-4">
                            <div className="w-10 h-10 rounded-full">
                                <img className="w-10 h-10 rounded-full" src={profile.profilepicture} alt="Profile Picture" />
                            </div>
                            <div className="flex flex-col justify-center items-start">
                                <div className="font-['Montserrat'] text-zinc-100 tracking-wide">
                                    {template.title}
                                </div>
                                <div>
                                    @
                                    <span className="font-['Montserrat'] italic">
                                        {profile.username}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3">
                            <Button className="bg-[#0064d7]  rounded-lg h-full py-2 font-normal tracking-wider disabled:bg-[#0064d769] disabled:cursor-not-allowed">
                                Discover
                            </Button>
                            <div className="flex items-center justify-center gap-2">
                                Total Like: {template.likeCount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};