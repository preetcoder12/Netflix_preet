import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null);
    const { contentType } = useContentStore();

    useEffect(() => {
        const getTrendingContent = async () => {
            if (!contentType) return; // Ensure contentType is not undefined
            
            const url = `/api/v1/${contentType}/trending`;
            console.log("Fetching from URL:", url);
    
            try {
                const res = await axios.get(url);
                setTrendingContent(res.data.content);
            } catch (error) {
                console.error("Error fetching trending content:", error?.response?.data || error.message);
            }
        };
    
        getTrendingContent();
    }, [contentType]);
    

    return { trendingContent };
};

export default useGetTrendingContent;