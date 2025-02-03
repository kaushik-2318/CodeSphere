import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/button";
import Editor from "@monaco-editor/react";
import { editTemplateApi, getTemplateapi } from "../services/api";
import { useForm } from "react-hook-form";
import { modalContext } from "../context/ModelContext.jsx";



function TemplateEditPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/template/edit/")[1];
    const [template, setTemplate] = useState();
    const { register, setError, clearErrors, setValue, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { isOpen, setIsOpen } = useContext(modalContext);


    const [title, setTitle] = useState("");
    const [framework, setFramework] = useState("");
    const [style, setStyle] = useState("");
    const [language, setLanguage] = useState("");
    const [frameworkCode, setFrameworkCode] = useState("");
    const [styleCode, setStyleCode] = useState("");
    const [languageCode, setLanguageCode] = useState("");

    const [githuburl, setGithuburl] = useState("");
    const [livelink, setLivelink] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (template) {
            setTitle(template.title);
            setFramework(template.framework);
            setStyle(template.style);
            setLanguage(template.language);
            setGithuburl(template.githuburl);
            setLivelink(template.livelink);
            setThumbnail(template.thumbnail);
            setFrameworkCode(template.frameworkCode);
            setStyleCode(template.styleCode);
            setLanguageCode(template.languageCode);

            setValue("posttitle", template.title);
            setValue("githuburl", template.githuburl);
            setValue("livelink", template.livelink);
            setValue("thumbnail", template.thumbnail);
            setValue("framework", template.framework);
            setValue("style", template.style);
            setValue("language", template.language);
            setValue("frameworkCode", template.frameworkCode);
            setValue("styleCode", template.styleCode);
            setValue("languageCode", template.languageCode);

        }
    }, [template, setValue]);

    const Template = async () => {
        await getTemplateapi(id)
            .then((res) => {
                setTemplate(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handletitle = (event) => {
        setTitle(event.target.value);
        setValue("posttitle", title);
    };

    const handleGithuburl = (event) => {
        setGithuburl(event.target.value);
        setValue("githuburl", githuburl);

    };

    const handleLivelink = (event) => {
        setLivelink(event.target.value);
        setValue("livelink", livelink);

    };

    const handleThumbnail = (event) => {
        const file = event.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            setThumbnail(file);
            setValue("thumbnail", file);
        };
    };

    const handleFrameworkCode = (event) => {
        setFrameworkCode(event);
        setValue("frameworkCode", frameworkCode);

    };
    const handleStyleCode = (event) => {
        setStyleCode(event);
        setValue("styleCode", event);
    };
    const handleLanguageCode = (event) => {
        setLanguageCode(event);
        setValue("languageCode", event);
    };


    useEffect(() => {
        Template();
    }, []);

    const onSubmit = async (data) => {

        const token = localStorage.getItem("token");

        if (!token) {
            toast("Token not found in localStorage.");
            setIsOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append("posttitle", data.posttitle);
        formData.append("githuburl", data.githuburl);
        formData.append("livelink", data.livelink);
        formData.append("framework", data.framework);
        formData.append("style", data.style);
        formData.append("language", data.language);
        formData.append("frameworkCode", data.frameworkCode);
        formData.append("styleCode", data.styleCode);
        formData.append("languageCode", data.languageCode);
        formData.append("thumbnail", thumbnail);

        await editTemplateApi(id, formData)
            .then((res) => {
                navigate(`/profile`)
            })
            .catch((err) => {
                console.error(err)
            })
    };

    return (
        <>
            {isOpen && <Modal open={isOpen} />}
            <div className="min-h-screen mb-[300px] w-full bg-[#111729] font-['SpaceGrotesk']  bg-grid-white/[0.2] relative flex items-center justify-center">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>

                <div className="flex justify-center items-center mt-24 w-full text-white">
                    <form onChange={() => clearErrors()} onSubmit={handleSubmit(onSubmit)} className="w-full px-10 flex justify-center items-center flex-col">

                        <div className="flex justify-center items-center gap-6 w-[70%]">
                            <div className="w-[50%]">
                                <div className="flex w-full pt-2 justify-center items-start gap-2 flex-col">
                                    <div className="flex justify-between flex-row w-full items-center">
                                        <label className="text-lg text-justify text-[.875rem] font-medium" htmlFor="posttitle">
                                            Title
                                        </label>
                                        {errors.posttitle && (
                                            <div className="text-red-500">{errors.posttitle.message}</div>
                                        )}
                                    </div>
                                    <div className="w-full pl-4">
                                        <input {...register("posttitle", { required: "Title is required", minLength: { value: 3, message: "Maximum Length is 3" }, maxLength: { value: 70, message: "Maximum Length is 70" } })} value={title} className="w-full outline-none rounded-md font-['SpaceGrotesk'] bg-[#27272a] text-white px-3 py-3 text-sm tracking-wider" type="text" onChange={handletitle} />
                                    </div>
                                    <p className="text-right w-full text-sm">
                                        Characters remaining: {70 - title.length}
                                    </p>
                                </div>

                                <div className="flex w-full pt-5 pb-6  justify-center items-start gap-2 flex-col">
                                    <div className="flex justify-between items-center w-full">
                                        <label className="text-lg text-justify text-[.875rem] font-medium" htmlFor="githubLink" >
                                            Repository URL
                                        </label>
                                        {errors.githuburl && (
                                            <div className="text-red-500">{errors.githuburl.message}</div>
                                        )}
                                    </div>
                                    <div className="pl-4 w-full">
                                        <input {...register("githuburl", { required: "Repository URL is required", })} value={githuburl} placeholder="www.example.com" className="w-full outline-none rounded-md font-['SpaceGrotesk'] bg-[#27272a] text-white px-3 py-3 text-sm tracking-wider" type="text" onChange={handleGithuburl} />
                                    </div>
                                </div>

                                <div className="flex w-full pb-6 justify-center items-start gap-2 flex-col">
                                    <div className="flex justify-between items-center w-full">
                                        <label className="text-lg text-justify text-[.875rem] font-medium" htmlFor="liveLink"  >
                                            Live site URL
                                        </label>
                                        {errors.livelink && (
                                            <div className="text-red-500">{errors.livelink.message}</div>
                                        )}
                                    </div>
                                    <div className="pl-4 w-full">
                                        <input {...register("livelink", { required: "Live site URL is required", })} value={livelink} placeholder="www.example.com" className="w-full outline-none rounded-md font-['SpaceGrotesk'] bg-[#27272a] text-white px-3 py-3 text-sm tracking-wider" type="text" onChange={handleLivelink} />
                                    </div>
                                </div>

                            </div>
                            <div className="flex justify-center items-center w-[50%]">
                                <div className="flex justify-center items-center border-dashed border-[1px] border-gray-500 rounded-2xl aspect-video w-[24.7rem]">
                                    <div>
                                        {<img className="rounded-2xl" src={preview || thumbnail} alt="Thumbnail" />}
                                    </div>
                                    <div className="absolute">
                                        <label className="font-normal cursor-pointer rounded-md border-gray-400 border-2 text-white text-sm hover:bg-blue-500 hover:border-blue-500 duration-200 py-2 px-3 backdrop-blur-3xl" htmlFor="coverbackground">
                                            Change Thumbnail
                                        </label>
                                        <input hidden {...register("thumbnail")} type="file" accept="image/*" id="coverbackground" defaultValue={thumbnail} onChange={handleThumbnail} />

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-[95%] grid grid-cols-3 gap-5 pb-6 justify-center items-start">
                            <div>
                                <div className="mt-4 w-fit px-3 py-2 rounded-t-lg font-['Exo'] bg-[#1e1e1e] min-w-20 ">
                                    {framework}
                                </div>
                                {template ? (
                                    <Editor height="75vh" width="100%" theme='vs-dark' language={framework.toLowerCase()} value={frameworkCode} onChange={handleFrameworkCode} />
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>

                            <div>
                                <div className="mt-4 w-fit px-3 py-2 rounded-t-lg font-['Exo'] bg-[#1e1e1e] min-w-20 ">
                                    {style}
                                </div>
                                {template ? (
                                    <Editor height="75vh" width="100%" theme='vs-dark' language={style.toLowerCase()} value={styleCode} onChange={handleStyleCode} />
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>

                            <div>
                                <div className="mt-4 w-fit px-3 py-2 rounded-t-lg font-['Exo'] bg-[#1e1e1e] min-w-20 ">
                                    {language}
                                </div>
                                {template ? (
                                    <Editor height="75vh" width="100%" theme='vs-dark' language={language.toLowerCase()} value={languageCode} onChange={handleLanguageCode} />
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end items-center gap-7 pb-10 w-[95%]">
                            <Button type="reset" className="border border-gray-600 text-white px-4 py-2 rounded-lg font-normal tracking-wider">
                                Cancel
                            </Button>
                            <Button disabled={isSubmitting} type="submit" className="bg-[#0064d7] rounded-lg h-full py-2 px-4 font-normal tracking-wider disabled:bg-[#0064d769] disabled:cursor-not-allowed">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TemplateEditPage;
