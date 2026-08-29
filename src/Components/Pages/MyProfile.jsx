import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import userIcon from '../../assets/user.png';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLink, FaEdit, FaTimes, FaCalendarAlt, FaKey, FaClock } from 'react-icons/fa';

const MyProfile = () => {
  const { user, updateUser, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Sync state with user details when component mounts or user state changes
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl mt-20">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaEnvelope size={24} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Access Denied</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Please login to view your profile dashboard details.</p>
      </div>
    );
  }

  const handleCopyUid = () => {
    navigator.clipboard.writeText(user.uid);
    toast.success("Account UID copied to clipboard!");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!displayName.trim()) {
      toast.error("Name cannot be empty!");
      return;
    }
    if (displayName.trim().length < 5) {
      toast.error("Name must be at least 5 characters long!");
      return;
    }

    setIsSaving(true);
    updateUser({ displayName: displayName.trim(), photoURL: photoURL.trim() })
      .then(() => {
        setUser({ ...user, displayName: displayName.trim(), photoURL: photoURL.trim() });
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to update profile");
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl rounded-3xl overflow-hidden mt-6 md:mt-10 transition-all duration-300">
      
      {/* Cover Banner Area */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 h-32 sm:h-44 relative">
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Avatar Area */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-14 sm:-bottom-16">
          <div className="relative group">
            <img
              src={user.photoURL || userIcon}
              alt="Avatar"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-2xl ring-4 ring-amber-500/20 bg-slate-100 dark:bg-slate-800"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Preview Photo
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-16 sm:pt-20 px-6 sm:px-10 pb-8 sm:pb-12 flex flex-col items-center">
        
        {!isEditing ? (
          /* View Mode */
          <div className="w-full text-center space-y-6">
            <div>
              <h2 className="font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                {user.displayName || "Artifact Collector"}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center gap-1.5">
                <FaEnvelope className="text-slate-400" />
                <span>{user.email}</span>
              </p>
            </div>

            {/* Profile Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto">
              
              {/* Account UID */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900/60 shadow-sm relative group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <FaKey size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xxs font-bold uppercase tracking-wider text-slate-400">Account UID</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-mono truncate">{user.uid}</p>
                  </div>
                </div>
                <button 
                  onClick={handleCopyUid}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-xxs px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-all cursor-pointer"
                >
                  Copy
                </button>
              </div>

              {/* Account Created Date */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900/60 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <FaCalendarAlt size={14} />
                  </div>
                  <div>
                    <p className="text-xxs font-bold uppercase tracking-wider text-slate-400">Created Date</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                      {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : "Not Available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Last login time */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900/60 shadow-sm sm:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <FaClock size={14} />
                  </div>
                  <div>
                    <p className="text-xxs font-bold uppercase tracking-wider text-slate-400">Last Sign In</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                      {user.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : "Not Available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* View Mode Action Button */}
            <div className="pt-2">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-98 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 cursor-pointer"
              >
                <FaEdit />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <form onSubmit={handleUpdate} className="w-full max-w-lg space-y-5">
            <h3 className="text-center font-bold text-lg text-slate-950 dark:text-white mb-2">Update Account Details</h3>
            
            {/* Input Name */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 block">
                Display Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                  <FaUser />
                </span>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300"
                  placeholder="Your Name"
                  required
                />
              </div>
            </div>

            {/* Input Photo URL */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 block">
                Photo URL
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                  <FaLink />
                </span>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            {/* Edit Mode Buttons */}
            <div className="flex flex-wrap gap-3 pt-3">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-sm transition-all duration-300 hover:scale-102 active:scale-98 shadow-md cursor-pointer disabled:opacity-50"
              >
                <span>{isSaving ? "Saving..." : "Save Changes"}</span>
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setDisplayName(user.displayName || '');
                  setPhotoURL(user.photoURL || '');
                }}
                disabled={isSaving}
                className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                <FaTimes />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default MyProfile;