import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "./Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Original_base_url } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { setContentType } = useContentStore();

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
    setContentType(tab);
    setResults([]); // Reset results when switching tabs
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      toast.error("Please enter a search term.");
      return;
    }

    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      console.log("API Response:", res.data);

      // Ensure correct data extraction
      setResults(res.data[activeTab] || []);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Search not found!");
      } else {
        toast.error("Please try again later.");
      }
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        {/* Tab Selection */}
        <div className="flex justify-center gap-3 mb-4">
          {["movie", "tv", "person"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 rounded ${activeTab === tab ? "bg-red-600" : "bg-gray-500"
                } hover:bg-red-700`}
              onClick={() => handleActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Form */}
        <form className="flex items-stretch mb-8 max-w-2xl mx-auto gap-2" onSubmit={handleSearch}>
          <input
            className="w-full p-2 bg-gray-800 text-white rounded"
            type="text"
            placeholder={`Search for a ${activeTab}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.length === 0 ? (
            <p className="text-center text-gray-400">No results found.</p>
          ) : (
            results.map((result) => {
              const imageUrl = activeTab === "person" ? result.profile_path : result.poster_path;

              if (!imageUrl) return null; // Skip if no image available

              return (
                <div key={result.id} className="bg-gray-800 rounded p-4">
                  {activeTab === "person" ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={Original_base_url + result.profile_path}
                        alt={result.name}
                        className="max-h-96 rounded mx-auto"
                      />
                      <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                      <h3 className="mt-2 text-l ">( {result.known_for_department} )</h3>
                    </div>
                  ) : (
                    <Link to={`/watch/${result.id}`} onClick={() => setContentType(activeTab)}>
                      <img
                        src={Original_base_url + result.poster_path}
                        alt={result.title || result.name || "No title"}
                        className="w-full h-auto rounded"
                      />
                      <h2 className="mt-2 text-xl font-bold">{result.title || result.name || "Untitled"}</h2>
                    </Link>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
