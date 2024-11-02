import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/button";
import pin from "/icons/map-pin-fill.svg";
import setting from "/icons/settings-fill.svg";
import like from "/icons/heart-3-fill.svg";
import bookmark from "/icons/bookmark-fill.svg";
import more from "/icons/more-fill.svg";
import axios from "axios";
import styles from "./css/profilepage.module.css";

export default function UserProfilePage() {

    let location = useLocation();

    const [templates, setTemplates] = useState([]);
    const [profile, setProfile] = useState(null)

    const getUserProfile = async () => {

        const username = location.pathname.split("/profile/")[1];

        await axios
            .get(`http://localhost:3000/profile/${username}`)
            .then((res) => {
                setProfile(res.data.user);
                setTemplates(res.data.user.templates);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <>

            <div className="bg-[#1d2734] mb-[300px] flex min-h-screen">
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
                        <Link to='/profile'>
                            <Button className="border-[1px] px-2 w-24 py-2 rounded-xl text-sm shadow-2xl backdrop-blur-md bg-blue-500">
                                Your Profile
                            </Button>
                        </Link>
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
                        </ul>
                    </div>
                </div>

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
                        </div>
                        <div className="flex">
                            <div className="h-[100px] w-[100px] flex justify-center items-center border-white">
                                <img className="rounded-full h-[90px] w-[90px] object-cover" src={profile?.profilepicture} alt="Profile" />
                            </div>

                            <div className="pl-10  flex flex-row justify-between w-full pr-20">
                                <div>
                                    <div className="text-2xl tracking-wide text-[#f04f58] font-bold">

                                        <div className="px-2 py-1" >
                                            <div>{profile?.username}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm tracking-wide flex justify-start gap-1 items-center text-white font-light mb-2 ">
                                        <img className="" width={12} src={pin} alt="Location Icon" />

                                        <div className="px-2 w-full h-full py-1 border-[1px] border-transparent">
                                            <div>
                                                {profile && <div>{profile.location}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-[70px]">
                                        <div className="text-sm text-white font-light text-justify min-w-[35rem] max-w-[38rem] h-[70px]">

                                            <div className="px-2 py-1 mb-3 h-full w-full">
                                                {profile && <div>{profile.bio}</div>}
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={`mt-10 flex justify-center items-center border-gray-600 border-b-[1px] ${styles.graphbackground}`}>

                        </div>
                        <div>
                            <div className="uppercase text-2xl tracking-wider text-[#f04f58] mt-5">
                                Posts
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
                                    No posts available.
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>

            </div >
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
                    <div className="">
                        <div className="absolute right-6 top-4">
                            <button onClick={handleClick}>
                                <img className="w-7" src={more} alt="" />
                            </button>
                        </div>

                        {model && (
                            <>
                                <div className={`absolute z-[1000] top-12 ${styles.dropdownbox} right-2 rounded-md font-['Exo'] text-red-500 border-2 border-[#ffffff20] bg-[#11192869] p-2 backdrop-blur-md cursor-pointer`}>
                                    Report
                                </div>
                            </>
                        )}

                        <div className="">
                            <img
                                className="w-full rounded-2xl h-52"
                                src={template.image}
                                alt="image"
                            />
                        </div>

                        <div className="flex flex-row items-center justify-start gap-4 mt-4">
                            <div className="w-10 h-10 rounded-full">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={profile?.profilepicture}
                                    alt="Profile Picture"
                                />
                            </div>
                            <div className="flex flex-col justify-center items-start">
                                <div className="font-['Montserrat'] text-zinc-100 tracking-wide">
                                    {template?.posttitle}
                                </div>
                                
                                <div className="hover:underline">
                                    <Link to={`profile/${profile?.username}`}>
                                        @
                                        <span className="font-['Montserrat'] italic">
                                            {profile?.username}
                                        </span>
                                    </Link>
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