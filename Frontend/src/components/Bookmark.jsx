import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import iconBookmark from "/icons/bookmark-line.svg";
import iconBookmarkFill from "/icons/bookmark-fill.svg";
import iconLike from "/icons/heart-line.svg";
import iconLikeFill from "/icons/heart-fill.svg";
import { addBookmarkapi, getBookmarkapi, increaseViewsapi, updateLikeapi } from "../services/api";
import { modalContext } from "../context/ModelContext.jsx";
import { Link, useNavigate } from "react-router-dom";


function BookmarkPage() {
    const { isOpen, setIsOpen } = useContext(modalContext);
    const [bookmarks, setBookmarks] = useState([]);

    const getBookmark = () => {
        getBookmarkapi()
            .then((res) => setBookmarks(res.data.bookmarks))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getBookmark();
    }, []);

    const handleLikeUpdate = useCallback(
        async (templateId) => {
            try {
                const res = await updateLikeapi(templateId, localStorage.getItem("token"));
                getBookmark();
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
        [getBookmark, setIsOpen]
    );

    const handleBookmarkUpdate = useCallback(
        async (templateId) => {
            try {
                const res = await addBookmarkapi(templateId, localStorage.getItem("token"));
                getBookmark();
                setIsOpen(false);
                return res;
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    setIsOpen(true);
                }
            }
        },
        [getBookmark, setIsOpen]
    );


    return (
        <div className="bg-slate-900 w-full">
            <div className="pt-28 ml-20 text-5xl text-white font-['Exo'] border-gray-600 border-b-2 pb-3 w-[90%]">
                BookMarks
            </div>

            <div className="grid grid-cols-3 gap-9 mt-10 ml-20 mr-11 pb-10">
                {bookmarks.length > 0 ? (
                    bookmarks.map((bookmark, idx) => (
                        <div className="w-full h-[22rem]" key={idx}>
                            <Card bookmark={bookmark} updatelike={handleLikeUpdate} addBookMark={handleBookmarkUpdate} />
                        </div>
                    ))
                ) : (
                    <div className="text-white ml-20 mt-10 font-['Exo'] text-xl">
                        <div className="text-white text-center py-10">
                            No Bookmark available
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookmarkPage;

const Card = ({ bookmark, updatelike, addBookMark }) => {
    const navigate = useNavigate();

    const [isBookmark, setIsBookmark] = useState(true);
    const [isLiked, setIsLiked] = useState(bookmark.userLiked);

    let canCall = true;

    const handleViewIncrease = () => {
        navigate(`/template/${bookmark._id}`)
        if (!canCall) return;

        canCall = false;
        increaseViewsapi(bookmark._id)
            .finally(() => {
                setTimeout(() => {
                    canCall = true;
                }, 3000);
            });
    };

    const handleBookmarkClick = () => {
        addBookMark(bookmark._id)
            .then((res) => {
                setIsBookmark(res.data.bookmark);
            })
            .catch((err) => {
                console.error("Error updating bookmark:", err);
            });
    };

    const handleLikeClick = () => {
        updatelike(bookmark._id)
            .then((res) => {
                setIsLiked(res.data.liked);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="rounded-2xl w-full h-full overflow-hidden border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative p-4 flex flex-col gap-5 text-white font-['Catamaran'] z-50 bg-[#11192833] backdrop-blur-[27px] backdrop-saturate-[57%]">
                <div className="relative z-50">
                    <div>
                        <img className="w-full rounded-2xl h-48" src={bookmark.thumbnail} alt="Thumbnail" />
                    </div>

                    <div className="flex flex-row items-center justify-start gap-4 mt-1 h-[4.5rem]">
                        <div className="w-10 h-10 rounded-full">
                            <img className="min-w-10 min-h-10 rounded-full" src={bookmark.owner.profilepicture} alt="Profile Picture" />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <div className="font-['Montserrat'] text-zinc-100 text-sm tracking-wide">
                                {bookmark.title}
                            </div>
                            <Link to={`/profile/${bookmark.owner.username}`} className="hover:underline cursor-pointer duration-200 italic">
                                @
                                <span className="font-['Montserrat'] italic">
                                    {bookmark.owner.username}
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                        <Button onClick={handleViewIncrease} className="bg-[#0064d7] rounded-lg h-full py-2 font-normal tracking-wider disabled:bg-[#0064d769] disabled:cursor-not-allowed">
                            Discover
                        </Button>
                        <div className="flex flex-row justify-center items-center gap-5">
                            <div className="flex items-center justify-center gap-2">
                                <img onClick={handleLikeClick} className="w-5 relative top-[1px]" src={isLiked ? iconLikeFill : iconLike} alt="Like Button" />
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <img onClick={handleBookmarkClick} className="w-5 relative top-[1px]" src={isBookmark ? iconBookmarkFill : iconBookmark} alt="Bookmark" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};