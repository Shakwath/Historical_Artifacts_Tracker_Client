import React from 'react';

const LikedArtifacts = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent mb-4">
        Liked Artifacts
      </h2>
      <p className="text-slate-600 dark:text-slate-400">
        No artifacts liked yet. Explore and like artifacts to see them here!
      </p>
    </div>
  );
};

export default LikedArtifacts;
