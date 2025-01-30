import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/button";
import Editor from "@monaco-editor/react";
import arrow from "/icons/arrow-right-up-line.svg"
import { getTemplateapi } from "../services/api";
import { CardSpotlight } from "@/components/ui/card-spotlight";


function TemplatePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/template/")[1];
    const [template, setTemplate] = useState();

    const Template = () => {
        getTemplateapi(id)
            .then((res) => {
                setTemplate(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        Template();
    }, []);

    return (
        <>
            <div className="bg-[#111729] min-h-screen mb-[300px]">
                <div className="flex justify-center items-center">
                    <div className={`w-[90%] m-10 h-96 absolute top-24 z-[1] rounded-xl bg-cover bg-center bg-no-repeat grid grid-row-3`} style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${template?.thumbnail})`, }}   >
                        <div></div>
                        <div className="w-full h-full relative text-white flex justify-center items-center font-['Exo'] text-2xl">
                           
                            <CardSpotlight className="backdrop-blur-sm bg-transparent flex justify-center items-center p-0 w-96">
                                <div className="z-10 flex justify-center items-center flex-col  p-4 gap-5 w-96">
                                    <Link to={template?.livelink} target="blank" className="font-bold hover:underline">
                                        {template?.title}
                                    </Link>
                                    <div className="flex items-center gap-10">
                                        <div>
                                            <img className="w-20 h-20 rounded-full object-cover border-2" src={template?.owner.profilepicture} alt="Profile Picture" />
                                        </div>
                                        <div>
                                            <div className=" text-lg">{template?.owner.name}</div>
                                            <Link to={`/profile/${template?.owner.username}`} className="text-bold font-['Exo'] text-lg hover:underline cursor-pointer">
                                                @ {template?.owner.username}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </CardSpotlight>

                        </div>
                        <div className="w-full flex justify-between items-center text-white px-5">
                            <div className="flex items-center justify-center gap-4 w-max">
                                <Link to={template?.githuburl} target="blank">
                                    <Button className="bg-[#111729] w-fit px-8 flex justify-center items-center text-white rounded-full font-['Exo'] border-[1px] hover:scale-110 duration-200 group">
                                        <span className="relative left-0 group-hover:-left-3 duration-200">View in Github</span>
                                        <img className="w-7 absolute right-10 opacity-0 invisible group-hover:right-3 group-hover:opacity-100 group-hover:visible duration-200" src={arrow} alt="" />
                                    </Button>
                                </Link>
                                <Link to={template?.livelink} target="blank">
                                    <Button className="bg-[#111729] w-fit px-8 flex justify-center items-center text-white rounded-full font-['Exo'] border-[1px] hover:scale-110 duration-200 group">
                                        <span className="relative left-0 group-hover:-left-3 duration-200"> Preview Site</span>
                                        <img className="w-7 absolute right-10 opacity-0 invisible group-hover:right-3 group-hover:opacity-100 group-hover:visible duration-200" src={arrow} alt="" />
                                    </Button>
                                </Link>
                            </div>
                            {/* TODO: Add Like and Bookmark Button */}
                        </div>
                    </div>

                    <div className=" w-full pt-[35rem] px-20 mb-10">
                        <div className="grid grid-cols-2 gap-10">
                            {template && template.framework && (
                                <div className="text-white mt-10">
                                    <div className="mt-4 w-fit px-3 py-2 rounded-t-lg font-['Exo'] bg-[#1e1e1e] min-w-20 ">
                                        {template?.framework}
                                    </div>
                                    <Editor value={template?.frameworkCode} language={template?.framework.toLowerCase()} height="75vh" width="100%" theme="vs-dark" options={{ readOnly: true }} />
                                </div>
                            )}
                            {template && template?.style && (
                                <div className="text-white mt-10">
                                    <div className="mt-4 w-fit px-3 py-2 rounded-t-lg font-['Exo'] bg-[#1e1e1e] min-w-20 ">
                                        {template?.style}
                                    </div>
                                    <Editor value={template?.styleCode} language={template?.style.toLowerCase()} height="75vh" width="100%" theme="vs-dark" options={{ readOnly: true }} />
                                </div>
                            )}
                            {template && template?.language && (
                                <div className="text-white mt-10">
                                    <div className="mt-4 w-fit px-3 py-2 rounded-t-lg font-['Exo'] bg-[#1e1e1e] min-w-20 ">
                                        {template?.language}
                                    </div>
                                    <Editor value={template?.languageCode} language={template?.language.toLowerCase()} height="75vh" width="100%" theme="vs-dark" options={{ readOnly: true }} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TemplatePage;
