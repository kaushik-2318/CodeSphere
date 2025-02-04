import { Button } from "@nextui-org/button";
import LanguageSelector from "../components/LanguageSelector";
import Loader from "../components/Loader";
import { frameworks, styling, languages } from "../constant";
import { useState } from "react";
import { toast } from "react-toastify";
import { takeScreenshotapi } from "../services/api";

function UploadTemplateDetail({ register, errors, setFramework, setStyle, setLanguage, setImageUrl, imageUrl }) {
    const [title, setTitle] = useState("");
    const [loader, setLoader] = useState(false);

    const handleCharacter = (event) => {
        const inputValue = event.target.value;
        const truncatedValue = inputValue.substring(0, 70);
        setTitle(truncatedValue);
    };

    const handleScreenShot = async (e) => {
        e.preventDefault();

        const url = e.target.value;

        const urlPattern =
            /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
        const isValidUrl = (url) => urlPattern.test(url);

        if (isValidUrl(url)) {
            if (e.target.value !== "") {
                setLoader(true);
                try {
                    await takeScreenshotapi(url)
                        .then((res) => {
                            setImageUrl("https://codesphere-ggi8.onrender.com" + res.data.screenshotPath);
                            // setImageUrl("http://localhost:3000" + res.data.screenshotPath);
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    setLoader(false);
                } catch (error) {
                    setLoader(false);
                    if (
                        error.response &&
                        error.response.status === 400 &&
                        error.response.data.message === "Invalid URL"
                    ) {
                        toast.error("Invalid URL");
                    } else {
                        console.log(error);
                        toast.error("An unexpected error occurred while capturing the screenshot.");
                    }
                }
            }
        } else {
            console.log("Provided URL is not valid:", url);
        }
    };
    return (
        <>
            <div className="flex justify-center items-center flex-col w-[500px] border-2 border-[#27272a] rounded-2xl p-5 font-['Geist']">
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
                        <input {...register("posttitle", {
                            required: "Title is required",
                            minLength: { value: 3, message: "Maximum Length is 3" },
                            maxLength: { value: 70, message: "Maximum Length is 70" },
                        })} placeholder="e.g. Responsive landing page using CSS Grid" className="w-full outline-none rounded-md font-['SpaceGrotesk'] bg-[#27272a] text-white px-3 py-3 text-sm tracking-wider" type="text" value={title} onChange={handleCharacter} />
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
                        <input {...register("githuburl", {
                            required: "Repository URL is required",
                        })} placeholder="www.example.com" className="w-full outline-none rounded-md font-['SpaceGrotesk'] bg-[#27272a] text-white px-3 py-3 text-sm tracking-wider" type="text" />
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
                        <input onInput={handleScreenShot}
                            {...register("livelink", {
                                required: "Live site URL is required",
                            })} placeholder="www.example.com" className="w-full outline-none rounded-md font-['SpaceGrotesk'] bg-[#27272a] text-white px-3 py-3 text-sm tracking-wider" type="text" />
                    </div>
                </div>

                <div className="flex w-full justify-center items-start gap-2 flex-col">
                    <div className="flex justify-between items-center w-full gap-10">
                        <label className="text-lg text-justify text-[.875rem] font-medium" htmlFor="hastag">
                            {/* Tags */}
                        </label>
                    </div>
                    <div className="pl-4 w-full grid grid-cols-3 gap-3">
                        <LanguageSelector set={setFramework} options={frameworks} register={register} errors={errors} />
                        <LanguageSelector set={setStyle} options={styling} register={register} errors={errors} />
                        <LanguageSelector set={setLanguage} options={languages} register={register} errors={errors} />
                    </div>
                </div>

                <div className="w-full flex justify-end">
                    <Button type="submit" className="outline-none rounded-2xl mt-5 px-4 border-[1px] hover:bg-[#0064d7] hover:border-[#0064d7] duration-500 disabled:bg-white" color="primary" variant="ghost">
                        Next
                    </Button>
                </div>
            </div>
            <div>
                <div className="p-2 flex justify-center items-center border-dashed border-[1px] border-gray-500 rounded-2xl right-20 -bottom-[25.3rem] aspect-video w-[24.7rem] mt-48">
                    {imageUrl ? (
                        <div>
                            {<img className="rounded-2xl" src={imageUrl} alt="Generated Image" />}
                        </div>
                    ) : loader ? (
                        <div className="w-full h-full">
                            <Loader />
                        </div>
                    ) : (
                        <p className="p-3 rounded-lg border-dashed border-[1px] border-gray-500">
                            Preview
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default UploadTemplateDetail;
