import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthProvider';
import axiosSecure from '../../api/axiosSecure';
import { FaHeart, FaEdit, FaTrashAlt, FaFolderOpen, FaPlusCircle, FaGlobe, FaTag, FaHistory } from 'react-icons/fa';

const MyArtifacts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyArtifacts = async () => {
    try {
      const response = await axiosSecure.get('/my-artifacts');
      setArtifacts(response.data);
    } catch (err) {
      console.error("Error fetching my artifacts:", err);
      setError("Failed to retrieve your registry catalog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyArtifacts();
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this discovery deletion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#f59e0b',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'rounded-3xl dark:bg-slate-900 dark:text-white border dark:border-slate-800'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/artifacts/${id}`);
          if (response.data.success) {
            Swal.fire({
              title: 'Deleted!',
              text: 'The artifact registry has been removed successfully.',
              icon: 'success',
              confirmButtonColor: '#f59e0b',
              customClass: {
                popup: 'rounded-3xl dark:bg-slate-900 dark:text-white border dark:border-slate-800'
              }
            });
            // Redirect to All Artifacts page upon successful deletion
            navigate('/allartifacts');
          }
        } catch (error) {
          console.error("Delete error:", error);
          toast.error("Failed to delete artifact. Try again.");
        }
      }
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-1 py-4">
      
      {/* Header section */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-amber-500 font-bold uppercase tracking-wider text-xs px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
          My Contributions
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          My Cataloged Artifacts
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Manage and review all historical treasures you have registered in the global chronicle.
        </p>
      </div>

      {/* Loading / Error / Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="loading loading-spinner loading-lg text-amber-500"></span>
          <p className="text-sm text-slate-400 dark:text-slate-500 animate-pulse font-medium">Loading your registry...</p>
        </div>
      ) : error ? (
        <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 text-center max-w-md mx-auto">
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        </div>
      ) : artifacts.length === 0 ? (
        <div className="p-16 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/60 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-950 text-slate-400 dark:text-slate-500 rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-inner">
            <FaFolderOpen />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">No Cataloged Discoveries</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            You haven't cataloged any discoveries yet. Share your first historical find today to start your preservation registry!
          </p>
          <Link to="/addartifacts" className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer">
            <FaPlusCircle className="text-sm" />
            <span>Add First Artifact</span>
          </Link>
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

                {/* Operations Actions Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <div className="flex items-center gap-1 text-rose-500 text-xs font-bold">
                    <FaHeart className="text-[10px]" />
                    <span>{artifact.likeCount || 0} Likes</span>
                  </div>

                  <div className="flex gap-2">
                    {/* Update button */}
                    <Link
                      to={`/update-artifact/${artifact._id}`}
                      className="p-2 bg-amber-500/10 hover:bg-amber-500 hover:text-white text-amber-500 text-xs font-bold rounded-xl transition-all duration-200"
                      title="Update Artifact details"
                    >
                      <FaEdit />
                    </Link>
                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(artifact._id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer"
                      title="Delete Artifact registry"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MyArtifacts;