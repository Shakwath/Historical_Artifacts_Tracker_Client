import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaChevronRight, FaCompass, FaGlobe, FaTag, FaHistory } from 'react-icons/fa';
import axiosSecure from '../../api/axiosSecure';

const LikedArtifacts = () => {
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiked = async () => {
      try {
        const response = await axiosSecure.get('/liked-artifacts');
        setLiked(response.data);
      } catch (err) {
        console.error("Error fetching liked artifacts:", err);
        setError("Failed to retrieve your liked collection.");
      } finally {
        setLoading(false);
      }
    };
    fetchLiked();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-1 py-4">
      
      {/* Header section */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-rose-500 font-bold uppercase tracking-wider text-xs px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full">
          My Saved Collection
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Liked Historical Artifacts
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          A personal compilation of ancient discoveries that you have liked and bookmarked.
        </p>
      </div>

      {/* Loading / Error / Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="loading loading-spinner loading-lg text-rose-500"></span>
          <p className="text-sm text-slate-400 dark:text-slate-500 animate-pulse font-medium">Retrieving saved artifacts...</p>
        </div>
      ) : error ? (
        <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 text-center max-w-md mx-auto">
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        </div>
      ) : liked.length === 0 ? (
        <div className="p-16 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/60 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-950 text-rose-500 rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-inner">
            <FaHeart className="animate-pulse" />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Your Saved Collection is Empty</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            You haven't liked any artifacts yet. Head over to the registry gallery and show some love to ancient findings to save them here!
          </p>
          <Link to="/allartifacts" className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer">
            <FaCompass className="text-sm" />
            <span>Explore Archives</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {liked.map((artifact) => (
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
                  
                  {/* Metadata Specs */}
                  <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-450">
                    <div className="flex items-center gap-1.5">
                      <FaHistory className="text-amber-500 text-[10px] flex-shrink-0" />
                      <span className="truncate">Era: {artifact.createdAt}</span>
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
                    <FaHeart className="text-[10px]" />
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

export default LikedArtifacts;
