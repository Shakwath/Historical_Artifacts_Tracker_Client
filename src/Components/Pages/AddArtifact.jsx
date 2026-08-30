import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import axiosSecure from '../../api/axiosSecure';
import { FaFileSignature, FaImage, FaListUl, FaParagraph, FaHistory, FaCalendarCheck, FaUserCircle, FaMapMarkerAlt } from 'react-icons/fa';

const AddArtifact = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value.trim();
    const image = form.image.value.trim();
    const type = form.type.value;
    const historicalContext = form.historicalContext.value.trim();
    const createdAt = form.createdAt.value.trim();
    const discoveredAt = form.discoveredAt.value.trim();
    const discoveredBy = form.discoveredBy.value.trim();
    const presentLocation = form.presentLocation.value.trim();
    const adderName = user?.displayName || "Anonymous Contributor";
    const adderEmail = user?.email;

    const newArtifact = {
      name,
      image,
      type,
      historicalContext,
      createdAt,
      discoveredAt,
      discoveredBy,
      presentLocation,
      adderName,
      adderEmail
    };

    try {
      const response = await axiosSecure.post('/artifacts', newArtifact);
      
      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Artifact cataloged successfully in the registry!',
          icon: 'success',
          confirmButtonColor: '#f59e0b',
          customClass: {
            popup: 'rounded-3xl dark:bg-slate-900 dark:text-white border dark:border-slate-800'
          }
        });
        form.reset();
        navigate('/myartifacts');
      }
    } catch (error) {
      console.error("Error adding artifact:", error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to add artifact. Please try again.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        customClass: {
          popup: 'rounded-3xl dark:bg-slate-900 dark:text-white border dark:border-slate-800'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl rounded-3xl overflow-hidden transition-all duration-300">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-8 sm:p-10 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Register a Historical Discovery</h2>
          <p className="text-amber-100 text-xs sm:text-sm mt-2 leading-relaxed">
            Contribute to the global archive. Register a newly cataloged historical artifact by filling out the details below.
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
                placeholder="e.g., Rosetta Stone"
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
                placeholder="https://example.com/rosetta.jpg"
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
                placeholder="e.g., 196 BC, 5th Century AD"
                className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>

            {/* Discovered At */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FaCalendarCheck className="text-amber-500 text-xs" /> Discovered At (Date/Year)
              </label>
              <input
                name="discoveredAt"
                type="text"
                required
                placeholder="e.g., July 15, 1799"
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
                placeholder="e.g., Pierre-François Bouchard"
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
                placeholder="e.g., British Museum, London"
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
                placeholder="Write detailed information about the artifact's historical significance, cultural context, excavation logs, and key features..."
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-y"
              />
            </div>

            {/* Adder Name (Read-Only) */}
            <div className="space-y-1.5 bg-slate-100/50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200/40 dark:border-slate-800/60">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Artifact Adder Name
              </label>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 select-none">
                {user?.displayName || "N/A"}
              </p>
            </div>

            {/* Adder Email (Read-Only) */}
            <div className="space-y-1.5 bg-slate-100/50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200/40 dark:border-slate-800/60">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Artifact Adder Email
              </label>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 select-none truncate">
                {user?.email || "N/A"}
              </p>
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-sm sm:text-base transition-all duration-300 hover:scale-[1.01] active:scale-98 shadow-lg shadow-amber-500/25 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Add Artifact"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddArtifact;