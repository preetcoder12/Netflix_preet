import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import ReactPlayer from "react-player";

import { useContentStore } from "../store/Content";
import { Original_base_url, Small_base_url } from "../utils/Constants";
import Navbar from "../components/Navbar";
import WatchPageSkeleton from "../components/WatchPageSkeleton";

const WatchPage = () => {
    // State management
    const [trailers, setTrailers] = useState([]);
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(null);
    const [similarContent, setSimilarContent] = useState([]);
    
    // Hooks
    const { id } = useParams();
    const { contentType } = useContentStore();
    const sliderRef = useRef(null);

    // Helper functions
    const formatReleaseDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handlePrev = () => {
        if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
    };

    const handleNext = () => {
        if (currentTrailerIdx < trailers.length - 1) setCurrentTrailerIdx(currentTrailerIdx + 1);
    };

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: -sliderRef.current.offsetWidth,
                behavior: "smooth"
            });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: sliderRef.current.offsetWidth,
                behavior: "smooth"
            });
        }
    };

    // Data fetching
    useEffect(() => {
        const getContentDetails = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
                setContent(res.data?.details || null);
            } catch (error) {
                console.error("Error fetching content details:", error);
                setContent(null);
            } finally {
                setLoading(false);
            }
        };
        getContentDetails();
    }, [contentType, id]);

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
                setTrailers(res.data.content || []);
            } catch (error) {
                console.error("Error fetching trailers:", error);
                setTrailers([]);
            }
        };
        getTrailers();
    }, [contentType, id]);

    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
                setSimilarContent(res.data.similar || []);
            } catch (error) {
                console.error("Error fetching similar content:", error);
                setSimilarContent([]);
            }
        };
        getSimilarContent();
    }, [contentType, id]);

    if (loading || !content) {
        return (
            <div className="min-h-screen bg-black p-10">
                <WatchPageSkeleton />
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen text-white">
            <div className="mx-auto container px-4 py-8 h-full">
                <Navbar />

                {/* Trailer Navigation */}
                {trailers.length > 0 && (
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={handlePrev}
                            className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                                currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={currentTrailerIdx === 0}
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            onClick={handleNext}
                            className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                                currentTrailerIdx === trailers.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={currentTrailerIdx === trailers.length - 1}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}

                {/* Trailer Player */}
                <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
                    {trailers.length > 0 ? (
                        <ReactPlayer
                            controls={true}
                            width="100%"
                            height="70vh"
                            className="mx-auto overflow-hidden rounded-lg"
                            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
                        />
                    ) : (
                        <h2 className="text-2xl text-center mt-5">
                            No trailers available for{" "}
                            <span className="font-bold text-red-600 ml-2">
                                {content?.title || content?.name}
                            </span>{" "}
                            😥
                        </h2>
                    )}
                </div>

                {/* Content Details */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-5xl font-bold">{content?.title || content?.name}</h2>
                        <p className="mt-2 text-lg">
                            {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
                            {content?.adult ? (
                                <span className="text-red-600">18+</span>
                            ) : (
                                <span className="text-green-600">PG-13</span>
                            )}
                        </p>
                        <p className="mt-4 text-lg">{content?.overview}</p>
                    </div>
                    <img
                        src={Original_base_url + content?.poster_path}
                        alt="Poster image"
                        className="max-h-[600px] rounded-md"
                    />
                </div>

                {/* Similar Content Slider */}
                {similarContent.length > 0 && (
                    <div className="mt-12 max-w-5xl mx-auto relative">
                        <h3 className="text-3xl font-bold mb-4">Similar Movies/TV Shows</h3>

                        <div
                            ref={sliderRef}
                            className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group scrollbar-hidden"
                        >
                            {similarContent.map((item) => (
                                item.poster_path && (
                                    <Link key={item.id} to={`/watch/${item.id}`} className="w-52 flex-none">
                                        <img
                                            src={Small_base_url + item.poster_path}
                                            alt="Poster"
                                            className="w-full h-auto rounded-md"
                                        />
                                        <h4 className="mt-2 text-lg font-semibold">
                                            {item.title || item.name}
                                        </h4>
                                    </Link>
                                )
                            ))}
                        </div>

                        <ChevronRight
                            className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                            onClick={scrollRight}
                        />
                        <ChevronLeft
                            className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                            onClick={scrollLeft}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchPage;