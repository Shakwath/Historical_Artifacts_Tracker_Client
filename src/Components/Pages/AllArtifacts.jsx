import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSearch, FaHeart, FaCompass, FaChevronRight, FaGlobe, FaHourglassHalf, FaHistory, FaUserCircle } from 'react-icons/fa';
import axiosSecure from '../../api/axiosSecure';

const AllArtifacts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get('search') || '';

  const [artifacts, setArtifacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch function
  const fetchArtifacts = async (searchVal = '') => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = searchVal ? `/artifacts?search=${encodeURIComponent(searchVal)}` : '/artifacts';
      const response = await axiosSecure.get(endpoint);
      setArtifacts(response.data);
    } catch (err) {
      console.error("Error loading artifacts:", err);
      setError("Failed to retrieve registry records.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger search on mount and when querySearch changes
  useEffect(() => {
    fetchArtifacts(querySearch);
    setSearchTerm(querySearch);
  }, [querySearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(searchTerm ? { search: searchTerm } : {});
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchParams({});
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-1 py-4">
      
      {/* Header section */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-amber-500 font-bold uppercase tracking-wider text-xs px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
          Historical Registry
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          The Chronicles Archives
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Browse the full database of cataloged historical artifacts. Search by artifact name or classification.
        </p>
      </div>

      {/* Search Bar section */}
      <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-md">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
              <FaSearch size={14} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search artifacts by name..."
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-2xl transition-all shadow-md shadow-amber-500/15 cursor-pointer"
          >
            Search
          </button>
          {querySearch && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl transition-all cursor-pointer"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Loading / Error / Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="loading loading-spinner loading-lg text-amber-500"></span>
          <p className="text-sm text-slate-400 dark:text-slate-500 animate-pulse font-medium">Scanning archives...</p>
        </div>
      ) : error ? (
        <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 text-center max-w-md mx-auto">
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          <button onClick={() => fetchArtifacts(querySearch)} className="btn btn-sm mt-4 bg-amber-500 hover:bg-amber-600 text-white border-none rounded-xl">
            Retry Connection
          </button>
        </div>
      ) : artifacts.length === 0 ? (
        <div className="p-16 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/60 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-950 text-slate-400 dark:text-slate-500 rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-inner">
            <FaCompass />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">No Artifacts Found</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            No registry matches found for query "{querySearch || searchTerm}". Try searching with different terms or check spelling.
          </p>
          {querySearch && (
            <button onClick={handleClearSearch} className="px-4 py-2 bg-amber-500 text-white text-xs font-semibold rounded-xl hover:bg-amber-600 transition-all cursor-pointer">
              Show All Archives
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artifacts.map((artifact) => (
            <div
              key={artifact._id}
              className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/85 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image box */}
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img
                  src={artifact.image}
                  alt={artifact.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-950/80 text-amber-400 border border-amber-500/20 backdrop-blur-sm">
                  {artifact.type}
                </span>
              </div>

              {/* Information */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="font-extrabold text-lg text-slate-800 dark:text-white group-hover:text-amber-500 transition-colors leading-tight truncate">
                    {artifact.name}
                  </h3>
                  
                  {/* Metadata Specs (2-4 pieces of info) */}
                  <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-450">
                    <div className="flex items-center gap-1.5">
                      <FaHistory className="text-amber-500 text-[10px] flex-shrink-0" />
                      <span className="truncate">Era: {artifact.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaUserCircle className="text-amber-500 text-[10px] flex-shrink-0" />
                      <span className="truncate">Finder: {artifact.discoveredBy}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaGlobe className="text-amber-500 text-[10px] flex-shrink-0" />
                      <span className="truncate">Location: {artifact.presentLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <div className="flex items-center gap-1 text-rose-500 text-xs font-bold">
                    <FaHeart className="text-[10px] animate-pulse" />
                    <span>{artifact.likeCount || 0}</span>
                  </div>

                  <Link
                    to={`/artifacts/${artifact._id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 dark:text-amber-400 group/btn hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
                  >
                    <span>View Detail</span>
                    <FaChevronRight className="text-[8px] transform group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default AllArtifacts;