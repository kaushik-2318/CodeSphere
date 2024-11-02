import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios'
import Editor from "@monaco-editor/react";
import { Button } from "@nextui-org/button";

function TemplatePage() {

    const location = useLocation();
    const id = location.pathname.split("/template/")[1];
    const [template, setTemplate] = useState();

    const getTemplate = async () => {
        await axios.get(`http://localhost:3000/template/${id}`)
            .then((res) => {
                setTemplate(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getTemplate();
    }, [])

    return (
        <>
            <div className="bg-[#111729] min-h-screen mb-[300px]">

                <div className="flex justify-center items-center">

                    <div className={`w-[90%] m-10 h-96 absolute top-24 z-[1] rounded-xl bg-cover bg-center bg-no-repeat grid grid-row-3`} style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${template?.image})` }}>
                        <div>

                        </div>
                        <div className="w-full h-full relative text-white flex justify-center items-center font-['Exo'] text-2xl">
                            <div className="backdrop-blur-sm flex justify-center items-center flex-col rounded-2xl p-4 gap-5 w-96 border-[1px] border-[#3661e33a]">
                                <Link to={template?.livelink} target="blank" className="font-bold hover:underline">
                                    {template?.posttitle}
                                </Link>
                                <div className="flex items-center gap-10">
                                    <div>
                                        <img className="w-20 h-20 rounded-full object-cover border-2" src={template?.owner.profilepicture} alt="Profile Picture" />
                                    </div>
                                    <div>
                                        <div className=" text-lg">{template?.owner.name}</div>
                                        <div className="text-bold font-['Exo'] text-lg hover:underline cursor-pointer">@ {template?.owner.username}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center text-white px-5">
                            <div className="flex items-center justify-center gap-4 w-max">
                                <Button className="bg-black w-fit text-white rounded-full font-['Exo'] border-[1px]">
                                    View in Github 
                                </Button>
                                <Button className="bg-black w-fit text-white rounded-full font-['Exo'] border-[1px]">
                                    Preview Site
                                </Button>
                            </div>
                            <div className="flex justify-center items-center">
                                <div>Like</div>
                                <div>Bookmark</div>
                            </div>
                        </div>
                    </div>

                    <div className=" w-full pt-[35rem] px-20 mb-10">
                        <div className="grid grid-cols-2 gap-10">

                            {(template && template.framework) &&
                                <div className="text-white mt-10">
                                    <div className="mt-4 w-fit px-3 py-2 rounded-t-lg font-['Exo'] bg-[#1e1e1e] min-w-20 ">
                                        {template?.framework}
                                    </div>
                                    <Editor value={template?.frameworkCode} language={template?.framework.toLowerCase()} height="75vh" width="100%" theme='vs-dark' options={{ readOnly: true }} />
                                </div>
                            }
                            {
                                (template && template?.style) &&
                                <div className="text-white mt-10">
                                    <div className="mt-4 w-fit px-3 py-2 rounded-t-lg font-['Exo'] bg-[#1e1e1e] min-w-20 ">
                                        {template?.style}
                                    </div>
                                    <Editor value={template?.styleCode} language={template?.style.toLowerCase()} height="75vh" width="100%" theme='vs-dark' options={{ readOnly: true }} />
                                </div>
                            }
                            {
                                (template && template?.language) &&
                                <div className="text-white mt-10">
                                    <div className="mt-4 w-fit px-3 py-2 rounded-t-lg font-['Exo'] bg-[#1e1e1e] min-w-20 ">
                                        {template?.language}
                                    </div>
                                    <Editor value={template?.languageCode} language={template?.language.toLowerCase()} height="75vh" width="100%" theme='vs-dark' options={{ readOnly: true }} />
                                </div>
                            }
                        </div>
                    </div>
                </div>



            </div >
        </>
    )
}

export default TemplatePage
