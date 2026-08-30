import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthProvider';
import axiosSecure from '../../api/axiosSecure';
import { FaFileSignature, FaImage, FaListUl, FaParagraph, FaHistory, FaCalendarCheck, FaUserCircle, FaMapMarkerAlt, FaChevronLeft } from 'react-icons/fa';

const UpdateArtifact = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch current values
  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        const response = await axiosSecure.get(`/artifacts/${id}`);
        // Ensure user is the creator before allowing editing
        if (response.data.adderEmail !== user?.email) {
          toast.error("Unauthorized: You can only edit your own artifacts");
          navigate('/myartifacts');
          return;
        }
        setArtifact(response.data);
      } catch (error) {
        console.error("Error loading artifact:", error);
        toast.error("Failed to load artifact details");
        navigate('/myartifacts');
      } finally {
        setLoading(false);
      }
    };

    if (id && user?.email) {
      fetchArtifact();
    }
  }, [id, user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;
    const name = form.name.value.trim();
    const image = form.image.value.trim();
    const type = form.type.value;
    const historicalContext = form.historicalContext.value.trim();
    const createdAt = form.createdAt.value.trim();
    const discoveredAt = form.discoveredAt.value.trim();
    const discoveredBy = form.discoveredBy.value.trim();
    const presentLocation = form.presentLocation.value.trim();

    const updatedArtifact = {
      name,
      image,
      type,
      historicalContext,
      createdAt,
      discoveredAt,
      discoveredBy,
      presentLocation
    };

    try {
      const response = await axiosSecure.put(`/artifacts/${id}`, updatedArtifact);
      
      if (response.data.success) {
        Swal.fire({
          title: 'Updated!',
          text: 'Artifact details updated successfully!',
          icon: 'success',
          confirmButtonColor: '#f59e0b',
          customClass: {
            popup: 'rounded-3xl dark:bg-slate-900 dark:text-white border dark:border-slate-800'
          }
        });
        navigate('/myartifacts');
      }
    } catch (error) {
      console.error("Error updating artifact:", error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update artifact. Try again.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        customClass: {
          popup: 'rounded-3xl dark:bg-slate-900 dark:text-white border dark:border-slate-800'
        }
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] gap-4">
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
        <p className="text-sm text-slate-400 dark:text-slate-500 animate-pulse font-medium">Fetching current details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/myartifacts')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-amber-500 transition-colors cursor-pointer bg-transparent border-none"
        >
          <FaChevronLeft className="text-xs" /> Back to My Catalog
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl rounded-3xl overflow-hidden transition-all duration-300">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-8 sm:p-10 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Modify Registry Entry</h2>
          <p className="text-amber-100 text-xs sm:text-sm mt-2 leading-relaxed">
            Update specifications for "{artifact?.name}". Ensure all historical contexts remain historically accurate.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6 sm:space-y-8">
          
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Artifact Name */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FaFileSignature className="text-amber-500 text-xs" /> Artifact Name
              </label>
              <input
                name="name"
                type="text"
                required
                defaultValue={artifact?.name}
                className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>

            {/* Artifact Image URL */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FaImage className="text-amber-500 text-xs" /> Image URL
              </label>
              <input
                name="image"
                type="url"
                required
                defaultValue={artifact?.image}
                className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>

            {/* Artifact Type */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FaListUl className="text-amber-500 text-xs" /> Artifact Type
              </label>
              <select
                name="type"
                required
                defaultValue={artifact?.type}
                className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all cursor-pointer"
              >
                <option value="Tools">Tools</option>
                <option value="Weapons">Weapons</option>
                <option value="Documents">Documents</option>
                <option value="Writings">Writings</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Created At */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FaHistory className="text-amber-500 text-xs" /> Created At (Era)
              </label>
              <input
                name="createdAt"
                type="text"
                required
                defaultValue={artifact?.createdAt}
                className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>

            {/* Discovered At */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FaCalendarCheck className="text-amber-500 text-xs" /> Discovered At
              </label>
              <input
                name="discoveredAt"
                type="text"
                required
                defaultValue={artifact?.discoveredAt}
                className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>

            {/* Discovered By */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FaUserCircle className="text-amber-500 text-xs" /> Discovered By
              </label>
              <input
                name="discoveredBy"
                type="text"
                required
                defaultValue={artifact?.discoveredBy}
                className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>

            {/* Present Location */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-amber-500 text-xs" /> Present Location
              </label>
              <input
                name="presentLocation"
                type="text"
                required
                defaultValue={artifact?.presentLocation}
                className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>

            {/* Historical Context */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FaParagraph className="text-amber-500 text-xs" /> Historical Context
              </label>
              <textarea
                name="historicalContext"
                required
                rows="4"
                defaultValue={artifact?.historicalContext}
                placeholder="Write detailed information about the artifact's historical significance..."
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-y"
              />
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={updating}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-sm sm:text-base transition-all duration-300 hover:scale-[1.01] active:scale-98 shadow-lg shadow-amber-500/25 cursor-pointer disabled:opacity-50"
            >
              {updating ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Update Artifact"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateArtifact;
