import axios from "axios";
import { useEffect, useState } from "react"
import Navbar from "./Navbar";
import { Small_base_url } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

const History = () => {

    const [searchHistory, SetSearchHistory] = useState([]);


    function formatDate(dateString) {
        // Create a Date object from the input date string
        const date = new Date(dateString);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Extract the month, day, and year from the Date object
        const month = monthNames[date.getUTCMonth()];
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();

        // Return the formatted date string
        return `${month} ${day}, ${year}`;
    }

    const handleDelete = async (entry) => {
        try {
            await axios.delete(`api/v1/search/history/${entry.id}`);
            SetSearchHistory((prevHistory) => prevHistory.filter((item) => item.id !== entry.id));
            toast.success("Deleted successfully!");
        } catch (error) {
            console.log("Delete failed:", error.message);
            toast.error("Failed to delete item");
        }
    };
    const handleDeleteAll = async () => {
        try {
            SetSearchHistory([]);
            toast.success("Deleted successfully!");
        } catch (error) {
            console.log("Delete failed:", error.message);
            toast.error("Failed to delete item");
        }
    };

    useEffect(() => {
        const getsearchHistory = async () => {
            try {
                const res = await axios.get(`api/v1/search/history`);
                SetSearchHistory(res.data.content);
                console.log(searchHistory);
            } catch (error) {
                console.log("error : ", error.message);
                SetSearchHistory([]);
            }
        };
        getsearchHistory();
    }, []);
    console.log("history : ", searchHistory);

    if (searchHistory?.length === 0) {
        return (
            <div className='bg-black min-h-screen text-white'>
                <Navbar />
                <div className='max-w-6xl mx-auto px-4 py-8'>
                    <h1 className='text-3xl font-bold mb-8'>Search History</h1>
                    <div className='flex justify-center items-center h-96'>
                        <p className='text-xl'>No search history found</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-black text-white min-h-screen'>
            <Navbar />

            <div className='max-w-6xl mx-auto px-4 py-8'>
                <div className="flex flex-row gap-[115vh]">
                    <h1 className='text-3xl font-bold mb-8'>Search History</h1>
                    <div className="flex flex-row font-bold">
                        <span className="text-bold">  Delete All</span>
                        <Trash className='size-5 ml-4 font-bold cursor-pointer hover:fill-red-600 hover:text-red-600' onClick={() => { handleDeleteAll() }} />
                    </div>

                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4'>
                    {searchHistory?.map((entry) => (
                        <div key={entry.id} className='bg-gray-800 p-4 rounded flex items-start'>
                            <img
                                className='size-16 rounded-full object-cover mr-4'
                                src={entry.image ? Small_base_url + entry.image : "/netflix.empty.png"}
                                alt="history image"
                            />
                            <div className="flex flex-col">
                                <span className='text-white text-lg'>
                                    {entry.title ? (entry.title.length < 12 ? entry.title : entry.title.slice(0, 12) + "...") : "Untitled"}
                                </span>
                                <span className='text-gray-400 text-sm'>{formatDate(entry.createdAt)}</span>
                            </div>
                            <span
                                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm  ml-auto ${entry.searchType === "movie"
                                    ? "bg-red-600"
                                    : entry.searchType === "tv"
                                        ? "bg-blue-600"
                                        : "bg-green-600"} `}
                            >
                                {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}

                            </span>
                            <Trash className='size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600'
                                onClick={() => { handleDelete(entry) }}
                            />
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>
    )
}

export default History
