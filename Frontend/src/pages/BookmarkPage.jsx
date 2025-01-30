import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import iconBookmark from "/icons/bookmark-line.svg";
import iconBookmarkFill from "/icons/bookmark-fill.svg";
import iconLike from "/icons/heart-line.svg";
import iconLikeFill from "/icons/heart-fill.svg";
import more from "/icons/more-fill.svg";
import { addBookmarkapi, getBookmarkapi, updateLikeapi } from "../services/api";
import { modalContext } from "../context/ModelContext.jsx";
import { BackgroundBeams } from "../components/ui/background-beams.jsx";


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
        <div className="bg-slate-900 mb-[300px] min-h-screen">
            <div className="pt-28 ml-20 text-5xl text-white font-['Exo'] border-gray-600 border-b-2 pb-3 w-[90%]">
                Saved
            </div>
            <div className="flex flex-row flex-wrap  pb-20">
                {bookmarks.length > 0 ? (
                    bookmarks.map((bookmark, idx) => (
                        <div key={idx}>
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
            <BackgroundBeams />
        </div>
    );
}

export default BookmarkPage;

const Card = ({ bookmark, updatelike, addBookMark }) => {


    const [isBookmark, setIsBookmark] = useState(true);
    const [isLiked, setIsLiked] = useState(bookmark.userLiked);

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
            <div className="rounded-2xl w-96 mt-10 ml-28 h-max overflow-hidden border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative p-4  flex flex-col gap-5 text-white font-['Catamaran'] z-50 bg-[#11192833] backdrop-blur-[27px] backdrop-saturate-[57%]">
                <div className="relative z-50">
                    <div className="absolute right-6 top-4">
                        <button>
                            <img className="w-5" src={more} alt="More" />
                        </button>
                    </div>

                    <div>
                        <img className="w-full rounded-2xl h-48" src={bookmark.thumbnail} alt="Thumbnail" />
                    </div>

                    <div className="flex flex-row items-center justify-start gap-4 mt-4">
                        <div className="w-10 h-10 rounded-full">
                            <img className="min-w-10 min-h-10 rounded-full" src={bookmark.owner.profilepicture} alt="Profile Picture" />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <div className="font-['Montserrat'] text-zinc-100 tracking-wide">
                                {bookmark.title}
                            </div>
                            <div>
                                @
                                <span className="font-['Montserrat'] italic">
                                    {bookmark.owner.username}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                        <Button className="bg-[#0064d7] rounded-lg h-full py-2 font-normal tracking-wider disabled:bg-[#0064d769] disabled:cursor-not-allowed">
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