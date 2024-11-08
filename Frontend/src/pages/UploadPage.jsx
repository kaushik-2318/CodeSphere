import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";
import Typed from "typed.js";
import more from "/icons/more-fill.svg";
import UploadTemplateDetail from "../components/UploadTemplateDetail";
import UploadTemplateCode from "../components/UploadTemplateCode";

import styles from "./css/detail.module.css";

import { createTemplateapi } from "../services/api";

function UploadPage() {

    const navigate = useNavigate();

    const el = useRef(null);

    const [framework, setFramework] = useState("HTML");
    const [style, setStyle] = useState("CSS");
    const [language, setLanguage] = useState("");

    const [frameworkCode, setFrameworkCode] = useState("");
    const [styleCode, setStyleCode] = useState("");
    const [languageCode, setLanguageCode] = useState("");

    const [page, setPage] = useState(0);
    const [panel, setPanel] = useState(false);

    const [imageUrl, setImageUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [hasErrorsFramework, setHasErrorsFramework] = useState(false);
    const [hasErrorsStyle, setHasErrorsStyle] = useState(false);
    const [hasErrorLanguage, setHasErrorLanguage] = useState(false);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Upload your Template..."],
            typeSpeed: 80,
        });
        return () => {
            typed.destroy();
        };
    }, []);

    const { register, setError, clearErrors, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        if (hasErrorsFramework || hasErrorsStyle || hasErrorLanguage) {
            toast.error("Please fix errors in the code editor before submitting.");
            return;
        }

        setError("serverError", null);

        const formData = new FormData();
        formData.append("posttitle", data.posttitle);
        formData.append("livelink", data.livelink);
        formData.append("githuburl", data.githuburl);
        formData.append("framework", framework);
        formData.append("style", style);
        formData.append("language", language);
        formData.append("frameworkCode", frameworkCode);
        formData.append("styleCode", styleCode);
        formData.append("languageCode", languageCode);
        formData.append("image", imageFile);
        formData.append("imageUrl", imageUrl);

        createTemplateapi(formData)
            .then((res) => {
                if (res.status === 201) {
                    toast.success("Template Upload Done");
                    navigate("/");
                } else {
                    throw new Error(res.data.message || "Template Upload failed");
                }
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || error.message;
                setError("serverError", { message: errorMessage });
                toast.error(errorMessage);
            });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            setImageFile(file);
        }
    };

    const nextPage = () => setPage((prevPage) => prevPage + 1);
    const prevPage = () => setPage((prevPage) => prevPage - 1);

    return (
        <div className={`flex flex-col justify-center relative items-center text-white w-full font-['SpaceGrotesk'] bg-no-repeat bg-[#05071a] ${styles.background} mb-[300px]`}>
            {page === 1 && (
                <div className={`w-[90%] m-10 h-96 absolute top-24 z-[1] rounded-xl bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${preview || imageUrl})`, }}>
                    <div className="w-full h-full relative">
                        <button className="bg-transparent backdrop-blur-2xl p-2 w-10 h-10 flex hover:bg-blue-500 hover:border-blue-500 duration-200 justify-center items-center cursor-pointer rounded-lg absolute right-5 top-5 border-2" style={panel ? { backgroundColor: "rgb(59, 130, 246)", border: "1px solid rgb(59,130, 246)", } : { backgroundColor: "" }} onClick={() => { setPanel(!panel) }}>
                            <img className="w-8 h-8" src={more} alt="More Icon" />
                        </button>
                        {panel && (
                            <div className="absolute z-[5] top-[4rem] right-5 rounded-md font-['Exo'] hover:bg-blue-500 hover:border-blue-500 duration-200 border-2 bg-transparent backdrop-blur-2xl p-2 cursor-pointer">
                                <label htmlFor="thumbnail">Change Thumbnail</label>
                                <input onChange={handleImageChange} type="file" />
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="text-7xl pt-72 pb-48 text-center tracking-wider z-[2]">
                <span ref={el} />
            </div>

            <form className="w-[80%] mb-10" onChange={() => clearErrors()} onSubmit={handleSubmit(page === 0 ? nextPage : onSubmit)}  >
                <div className="flex flex-row justify-center items-center gap-7">
                    {page === 0 && (<UploadTemplateDetail register={register} errors={errors} clearErrors={clearErrors} setFramework={setFramework} setLanguage={setLanguage} setStyle={setStyle} setImageUrl={setImageUrl} imageUrl={imageUrl} nextPage={nextPage} />)}
                </div>

                <div className="w-full">
                    {page === 1 && (<UploadTemplateCode framework={framework} style={style} language={language} setLanguageCode={setLanguageCode} setStyleCode={setStyleCode} setFrameworkCode={setFrameworkCode} setHasErrorsFramework={setHasErrorsFramework} setHasErrorsStyle={setHasErrorsStyle} setHasErrorLanguage={setHasErrorLanguage} />)}
                </div>

                {page === 1 && (
                    <div className="text-right mt-5">
                        <Button type="button" onClick={prevPage} className="mr-4 rounded-xl px-5 bg-white text-[#27272a] hover:bg-[#0065d9] hover:text-white duration-200 disabled:bg-[#003c7f]" size="lg"      >
                            Back
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="rounded-xl px-5 bg-[#006fee] hover:bg-[#0065d9] text-white disabled:bg-[#003c7f] disabled:cursor-not-allowed" size="lg">
                            {isSubmitting ? "Submitting..." : "Final Submit"}
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default UploadPage;
