import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";
import axios from "axios";
import { Small_base_url } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
    const { contentType } = useContentStore();
    const [content, setContent] = useState([]);
    const [showArrows, setShowArrows] = useState(false);

    const sliderRef = useRef(null);

    // Formatting category name for display
    const formattedCategoryName = category
        .replace(/_/g, " ") // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
    const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

    // Fetching content data from API
    useEffect(() => {   
        const getContent = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${category}`);
                console.log("Full API Response:", res.data); // Debugging
                setContent(res.data.similar || res.data.content || []); // Handle different API response formats
            } catch (error) {
                console.error("Error fetching content:", error);
                setContent([]); // Prevent crashes
            }
        };

        getContent();
    }, [contentType, category]);

    // Scroll left function
    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
        }
    };

    // Scroll right function
    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
        }
    };

    return (
        <div
            className="text-white relative px-5 bg-black md:px-20"
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
        >
            <h2 className="mb-4 text-2xl font-bold">
                {formattedCategoryName} {formattedContentType}
            </h2>

            <div className="flex space-x-4 overflow-x-scroll scrollbar-hidden" ref={sliderRef}>
            {content.map((item) => (
                    <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
                        <div className="rounded-lg overflow-hidden">
                            <img
                                src={Small_base_url + item.backdrop_path}
                                alt="Movie image"
                                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                            />
                        </div>
                        <p className="mt-2 text-center">{item.title || item.name}</p>
                    </Link>
                ))}
            </div>

            {/* Navigation Arrows (Visible on Hover) */}
            {showArrows && (
                <>
                    <button
                        className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 transition-opacity"
                        onClick={scrollLeft}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 transition-opacity"
                        onClick={scrollRight}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}
        </div>
    );
};

export default MovieSlider;
