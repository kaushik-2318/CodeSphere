import React, { useState, useEffect, useCallback, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { Context } from "../context/ModelContext.jsx";
import { cn } from "../lib/utils.js";
import Modal from "./Model.jsx";

import bookmark from "/icons/bookmark-line.svg";
import bookmarkFill from "/icons/bookmark-fill.svg";
import heart from "/icons/heart-line.svg";
import heartFill from "/icons/heart-fill.svg";
import more from "/icons/more-fill.svg";

import { getAllTemplates, updateLike, addBookmark, increaseViews } from "../services/api.js";
import { Link, useNavigate } from "react-router-dom";

interface Template {
    _id: string;
    image: string;
    posttitle: string;
    owner: {
        profilepicture: string;
        username: string;
    };
    userLiked: boolean;
    userBookmarked: boolean;
    likeCount: number;
}

interface HoverEffectProps {
    className?: string;
}

export const Hovereffect: React.FC<HoverEffectProps> = ({ className }) => {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { isOpen, setIsOpen } = useContext(Context);
    const [templates, setTemplates] = useState<Template[]>([]);

    const fetchTemplates = useCallback(() => {
        getAllTemplates()
            .then((res) => setTemplates(res.data.allTemplates))
            .catch((err) => console.error(err));
    }, []);


    const handleLikeUpdate = useCallback(
        async (templateId: string): Promise<any> => {
            try {
                const res = await updateLike(templateId, localStorage.getItem("token") as string);
                fetchTemplates();
                setIsOpen(false);
                return res;
            } catch (err) {
                console.error("Error updating like:", err);
                if (err.response && err.response.status === 401) {
                    setIsOpen(true);
                }
                throw err;
            }
        },
        [fetchTemplates, setIsOpen]
    );
    const handleBookmark = useCallback(
        async (templateId: string): Promise<any> => {
            try {
                await addBookmark(templateId, localStorage.getItem("token") as string);
                await fetchTemplates();
                setIsOpen(false);
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    setIsOpen(true);
                }
            }
        },
        [fetchTemplates, setIsOpen]
    );

    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);

    return (
        <>
            {isOpen && <Modal open={isOpen} />}
            <div
                className={cn(
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10",
                    className
                )}
            >
                {templates.map((item, idx) => (
                    <div
                        key={item._id}
                        className="relative group block p-2 h-full w-full"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === idx && (
                                <motion.span
                                    className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.15, delay: 0.2 },
                                    }}
                                />
                            )}
                        </AnimatePresence>
                        <Card
                            className=""
                            template={item}
                            updatelike={handleLikeUpdate}
                            addBookMark={handleBookmark}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

interface CardProps {
    className?: string;
    template: Template;
    updatelike: (templateId: string) => Promise<any>;
    addBookMark: (templateId: string) => Promise<any>;
}

export const Card: React.FC<CardProps> = ({ className, template, updatelike, addBookMark }) => {
    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState<boolean | null>(null);
    const [isBookmark, setIsBookmark] = useState<boolean | null>(null);

    let canCall = true;

    const handleViewIncrease = () => {
        navigate(`/template/${template._id}`)
        if (!canCall) return;

        canCall = false;
        increaseViews(template._id)
            .then((res) => {
                console.log("View count increased:", res.data.totalViews);
            })
            .catch((err) => {
                console.error("Error increasing view count:", err);
            })
            .finally(() => {
                setTimeout(() => {
                    canCall = true;
                }, 3000);
            });
    };

    useEffect(() => {
        setIsLiked(template.userLiked);
    }, [template.userLiked]);

    useEffect(() => {
        setIsBookmark(template.userBookmarked);
    }, [template.userBookmarked]);

    const handleLikeClick = () => {
        setIsLiked((prevLiked) => !prevLiked);
        updatelike(template._id)
            .then((res) => setIsLiked(res.data.isLiked))
            .catch((err) => {
                console.log(err);
                setIsLiked(template.userLiked);
            });
    };

    const handleBookmarkClick = () => {
        setIsBookmark((prevBookmarked) => !prevBookmarked);
        addBookMark(template._id)
            .then((res) => setIsBookmark(res.data.isBookmarked))
            .catch((err) => {
                console.log(err);
                setIsBookmark(template.userBookmarked);
            });
    };

    return (
        <div
            className={cn(
                "rounded-2xl h-full overflow-hidden border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative p-4 w-96 flex flex-col gap-5 text-white font-['Catamaran'] z-50 bg-[#11192833] backdrop-blur-[27px] backdrop-saturate-[57%]",
                className
            )}
        >
            <div className="relative z-50">
                <div className="absolute right-6 top-4">
                    <button>
                        <img className="w-7" src={more} alt="More" />
                    </button>
                </div>

                <div>
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
                            src={template.owner.profilepicture}
                            alt="Profile Picture"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-start">
                        <div className="font-['Montserrat'] text-zinc-100 tracking-wide">
                            {template.posttitle}
                        </div>
                        <div>
                            @
                            <span className="font-['Montserrat'] italic hover:underline">
                                <Link to={`profile/${template.owner.username}`}>{template.owner.username}</Link>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-3">
                    <Button onClick={handleViewIncrease} className="bg-[#0064d7] rounded-lg h-full py-2 font-normal tracking-wider disabled:bg-[#0064d769] disabled:cursor-not-allowed">
                        Discover
                    </Button>
                    <div className="flex flex-row justify-center items-center gap-5">
                        <div className="flex items-center justify-center gap-2">
                            <img
                                onClick={handleLikeClick}
                                className="w-5 relative top-[1px]"
                                src={isLiked ? heartFill : heart}
                                alt="Like Button"
                            />
                            {template.likeCount}
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <img
                                onClick={handleBookmarkClick}
                                className="w-5 relative top-[1px]"
                                src={isBookmark ? bookmarkFill : bookmark}
                                alt="Bookmark"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};