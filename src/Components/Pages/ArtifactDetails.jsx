import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthProvider';
import axiosSecure from '../../api/axiosSecure';
import { FaHeart, FaRegHeart, FaCalendarAlt, FaUserEdit, FaCompass, FaHistory, FaMapMarkedAlt, FaTag, FaChevronLeft } from 'react-icons/fa';

const ArtifactDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    // Fetch details and check if this user liked it
    const fetchDetails = async () => {
      try {
        const response = await axiosSecure.get(`/artifacts/${id}?email=${user?.email}`);
        setArtifact(response.data);
        setIsLiked(response.data.isLiked);
        setLikeCount(response.data.likeCount || 0);
      } catch (error) {
        console.error("Error fetching artifact details:", error);
        toast.error("Failed to fetch artifact details");
      } finally {
        setLoading(false);
      }
    };

    if (id && user?.email) {
      fetchDetails();
    }
  }, [id, user?.email]);

  const handleLikeToggle = async () => {
    try {
      const response = await axiosSecure.post(`/artifacts/${id}/like`);
      if (response.data.success) {
        setIsLiked(response.data.liked);
        setLikeCount(response.data.likeCount);

        if (response.data.liked) {
          toast.success("Added to Liked Collection!");
        } else {
          toast.success("Removed from Liked Collection");
        }
      }
    } catch (error) {
      console.error("Error toggling like status:", error);
      toast.error("Failed to update like status");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] gap-4">
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
        <p className="text-sm text-slate-400 dark:text-slate-500 animate-pulse font-medium">Restoring timeline details...</p>
      </div>
    );
  }

  if (!artifact) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-6">
        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80">
          <p className="text-slate-600 dark:text-slate-400 font-medium">Artifact not found or connection failed.</p>
        </div>
        <Link to="/allartifacts" className="btn bg-amber-500 hover:bg-amber-600 text-white border-none rounded-xl">
          Return to Registry
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back link */}
      <div className="mb-6">
        <Link
          to="/allartifacts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-amber-500 transition-colors"
        >
          <FaChevronLeft className="text-xs" /> Back to Registry
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl rounded-[36px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Column: Image Container (lg:col-span-5) */}
        <div className="lg:col-span-5 relative bg-slate-100 dark:bg-slate-950 min-h-[300px] lg:min-h-full">
          <img
            src={artifact.image}
            alt={artifact.name}
            className="w-full h-full object-cover object-center absolute inset-0"
          />
          {/* Tag overlay */}
          <span className="absolute top-6 left-6 inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-full bg-slate-950/85 text-amber-400 border border-amber-500/20 backdrop-blur-md shadow-md">
            <FaTag className="text-[10px]" />
            {artifact.type}
          </span>
        </div>

        {/* Right Column: Information Sheet (lg:col-span-7) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
          
          {/* Title & Like Actions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                  {artifact.name}
                </h1>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Registry ID: {artifact._id}
                </p>
              </div>

              {/* Like / Dislike Toggle Button */}
              <button
                onClick={handleLikeToggle}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm shadow-md transition-all duration-300 active:scale-95 cursor-pointer ${
                  isLiked
                    ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                {isLiked ? (
                  <FaHeart className="text-base animate-pulse" />
                ) : (
                  <FaRegHeart className="text-base" />
                )}
                <span>{isLiked ? "Liked" : "Like Artifact"}</span>
                <span className={`px-2 py-0.5 rounded-lg text-xs font-black ${
                  isLiked ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-300'
                }`}>
                  {likeCount}
                </span>
              </button>
            </div>

            <div className="border-b border-slate-100 dark:border-slate-800/60 pb-2" />
          </div>

          {/* Details Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-950/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/40">
            
            {/* Created At */}
            <div className="space-y-1 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaHistory size={14} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Created Era</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{artifact.createdAt}</span>
              </div>
            </div>

            {/* Discovered At */}
            <div className="space-y-1 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaCalendarAlt size={14} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Discovered At</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{artifact.discoveredAt}</span>
              </div>
            </div>

            {/* Discovered By */}
            <div className="space-y-1 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaUserEdit size={14} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Discovered By</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{artifact.discoveredBy}</span>
              </div>
            </div>

            {/* Present Location */}
            <div className="space-y-1 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaMapMarkedAlt size={14} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Present Location</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{artifact.presentLocation}</span>
              </div>
            </div>

          </div>

          {/* Historical Significance Description */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <FaCompass className="text-amber-500" /> Historical Context & Significance
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-light whitespace-pre-line">
              {artifact.historicalContext}
            </p>
          </div>

          {/* Contributor Metadata Footer */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
            <div>
              <span className="text-slate-400 dark:text-slate-500 font-semibold block">Registered Contributor</span>
              <span className="font-bold text-slate-700 dark:text-slate-300">{artifact.adderName}</span>
            </div>
            <div className="sm:text-right">
              <span className="text-slate-400 dark:text-slate-500 font-semibold block">Contact Email</span>
              <span className="font-semibold text-slate-600 dark:text-slate-400 select-all">{artifact.adderEmail}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ArtifactDetails;