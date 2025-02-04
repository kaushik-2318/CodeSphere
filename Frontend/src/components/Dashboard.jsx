import { useEffect, useState } from "react";
import { deleteTemplateApi, getLoginUserProfileapi, updateLoginUserProfileapi } from "../services/api.js";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";
import pin from "/icons/map-pin-fill.svg";
import more from "/icons/more-fill.svg";
import pencil from "/icons/pencil-fill.svg";
import Chart from "../components/Chart.jsx";
import Modal from "../components/Model.jsx";
import close from "/icons/close-large-fill.svg";
import styles from "./css/dashboard.module.css";

export default function Dashboard({ editMode, setEditMode, isOpen, setIsOpen }) {

    const [profile, setProfile] = useState({});
    const [bioLength, setBioLength] = useState(0);
    const [templates, setTemplates] = useState([]);
    const [totalTemplates, setTotalTemplates] = useState(0);
    const [previewCover, setPreviewCover] = useState("");
    const [previewProfile, setPreviewProfile] = useState("");
    const [popup, setPopup] = useState(false);
    const [deleteTemp, setDeleteTemp] = useState("");

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
            {popup && <Popup setPopup={setPopup} popup={popup} deleteTemp={deleteTemp} getProfile={getProfile} />}
            {isOpen && <Modal open={isOpen} />}
            <form onSubmit={handleSubmit(handleProfileUpdate, handleProfileUpdateErrors)} onChange={handleInputChange}>
                <div className="flex w-full justify-between">
                    {profile && profile.coverphoto ? (
                        <div className={`bg-no-repeat bg-center bg-cover bg-fixed  items-center absolute h-[340px] w-[1269px]`} style={{ backgroundImage: `linear-gradient(90deg, rgba(29,39,52,0.3) 0%, rgba(29,39,52,0.6) 40%, rgba(29,39,52,0.9) 67%, rgba(29,39,52,1) 100%), url(${previewCover || profile.coverphoto})`, }}></div>
                    ) : (
                        <div className={`bg-no-repeat bg-cover bg-center bg-fixed items-center absolute h-[340px]`} style={{ backgroundImage: `linear-gradient(90deg, rgba(29,39,52,0.3) 0%, rgba(29,39,52,0.6) 40%, rgba(29,39,52,0.9) 67%, rgba(29,39,52,1) 100%)`, }}></div>
                    )}
                    <div className="w-full z-[1] pt-24 pl-20 p-5 pr-20">
                        <div className="uppercase border-b-[1px] mb-10 text-2xl tracking-wider font-bold pb-4 border-gray-600 text-[#f04f58] flex justify-between items-center">
                            Profile
                            {editMode && (
                                <div className="grid text-white font-['Exo'] font-light max-w-sm items-center gap-1.5">
                                    <label className="font-normal rounded-md border-gray-400 border-2 text-white text-sm hover:bg-blue-500 hover:border-blue-500 duration-200 py-1 px-3" htmlFor="coverbackground">
                                        Change Background
                                    </label>
                                    <input hidden {...register("coverphoto")} accept="image/*" id="coverbackground" type="file" />
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
                                        <img className="rounded-full h-[90px] w-[90px] border-2 object-cover" src={previewProfile || profile?.profilepicture} alt="Profile Picture" />
                                        <div className="w-[20px] h-[20px] bg-blue-500 absolute right-2 bottom-2 rounded-md flex justify-center items-center">
                                            <img className="w-[15px] h-[15px]" src={pencil} alt="Edit Icon" />
                                        </div>
                                    </label>
                                    <input hidden {...register("profilepicture")} type="file" id="profilepicture" accept="image/*" />
                                </>
                            )}


                            <div className="pl-10  flex flex-row justify-between w-full pr-20">
                                <div>
                                    <div className='text-2xl tracking-wide text-[#f04f58] font-bold w-full'>
                                        {editMode ? (
                                            <input {...register("name", { required: true })} defaultValue={profile.name} className="bg-transparent border-[1px] rounded-md border-gray-500 px-2 py-1 outline-none w-full" placeholder={profile.name || "No name available"} type="text" />
                                        ) : (
                                            <div className="py-1 w-full outline-none">
                                                {profile && profile.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className='flex gap-14 my-1'>

                                        <div className="text-sm tracking-wide text-white flex justify-start items-center font-light">
                                            @
                                            {editMode ? (
                                                <div>
                                                    <input defaultValue={profile.username} {...register("username", { required: "Username is required", minLength: { value: 5, message: "Minimum Length is 5" }, maxLength: { value: 15, message: "Maximum Length is 15" }, pattern: { value: /^[a-zA-Z0-9_]+$/, message: "Username can only contain letters, numbers, and underscores" } })} className="bg-transparent border-[1px] rounded-md border-gray-500 px-2 py-1 outline-none ml-1" placeholder={profile.username} type="text" />
                                                </div>
                                            ) : (
                                                <div className="px-1 py-1" style={editMode ? { border: "1px solid #27272a" } : { border: "1px solid transparent" }}      >
                                                    {profile && <div>{profile.username}</div>}
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-sm tracking-wide text-white flex justify-start items-center font-light">
                                            <img width={12} src={pin} alt="Location Icon" />
                                            {editMode ? (
                                                <input defaultValue={profile.location} {...register("location")} className="bg-transparent border-[1px] rounded-md border-gray-500 px-2 py-1 outline-none" placeholder={profile.location} type="text" />
                                            ) : (
                                                <div className="px-2 w-full h-full py-1 border-[1px] border-transparent">
                                                    {profile && (
                                                        <div>
                                                            {profile && <div>{profile.location}</div>}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
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
                                            <div key={idx} className="flex items-center justify-center w-96" >
                                                <Card template={template} profile={profile} setPopup={setPopup} setDeleteTemp={setDeleteTemp} />
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
            </form>
        </>
    )
}


export const Card = ({ template, profile, setPopup, setDeleteTemp }) => {

    const [model, setModel] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        setModel(!model);
    };

    const handleNavigation = (e) => {
        e.preventDefault();
        navigate(`/template/edit/${template._id}`);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        setDeleteTemp(template._id);
        setPopup(true);
    }

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
                                <div onClick={handleDelete} className={`absolute z-[1000] top-12 ${styles.dropdownbox} right-2 rounded-md font-['Exo'] text-red-500 border-2 border-[#ffffff20] bg-[#11192869] p-2 backdrop-blur-md cursor-pointer `}>
                                    Delete Template
                                </div>
                            </>
                        )}

                        <div >
                            <img className="w-full rounded-2xl h-52" src={template.thumbnail} alt="image" />
                        </div>

                        <div className="flex flex-row items-center justify-start gap-4 mt-4">
                            <div className="w-10 h-10 rounded-full">
                                <img className="min-w-10 min-h-10 rounded-full" src={profile.profilepicture} alt="Profile Picture" />
                            </div>
                            <div className="flex flex-col justify-center items-start">
                                <div className="font-['Montserrat'] text-zinc-100 tracking-wide">
                                    {template.title}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3">
                            <Button onClick={handleNavigation} className="bg-[#0064d7]  rounded-lg h-full py-2 font-normal tracking-wider disabled:bg-[#0064d769] disabled:cursor-not-allowed">
                                Edit
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

const Popup = ({ setPopup, deleteTemp, getProfile }) => {

    const handleDelete = async (e) => {
        e.preventDefault();
        await deleteTemplateApi(deleteTemp);
        setPopup(false);
        getProfile();
    }

    return (
        <>
            <div className='z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center overflow-hidden backdrop-blur-sm'>
                <div className='bg-transparent border-slate-500 border-2 backdrop-blur-2xl text-white p-8 rounded-lg overflow-y-hidden relative'>
                    <div onClick={(e) => { e.preventDefault(); setPopup(false) }} className="absolute top-3 right-4 w-5 rounded-full hover:bg-gray-400 duration-200 p-1 cursor-pointer">
                        <img className="w-3" src={close} alt="Close " />
                    </div>

                    <h1 className='my-5 font-bold text-left md:text-center font-Vonique'>Are you want to delete this template?</h1>

                    <div className="flex justify-end items-end gap-5">
                        <Button onClick={(e) => { e.preventDefault(); setPopup(false) }} className="border-2 border-gray-800 rounded-xl">Cancel</Button>
                        <Button onClick={handleDelete} className="bg-red-700 rounded-xl "> Delete</Button>
                    </div>
                </div>
            </div>
        </>
    )
}