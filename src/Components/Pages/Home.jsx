import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowRight, FaCompass, FaHistory, FaBookOpen, FaGlobe, FaShieldAlt, FaTools, FaFileAlt } from 'react-icons/fa';
import Banner from '../Banner';
import axiosSecure from '../../api/axiosSecure';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosSecure.get('/artifacts')
      .then((res) => {
        // Sort descending by likeCount and take the top 6
        const sorted = [...res.data].sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
        setFeatured(sorted.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artifacts for featured list:", err);
        setError("Could not load featured artifacts. Please ensure backend is running.");
        setLoading(false);
      });
  }, []);

  // Category data with icon and matching styling colors
  const categories = [
    { name: "Tools", description: "Daily life tools, instruments, navigation gear, and ancient inventions.", icon: <FaTools />, count: "340+ Items", color: "from-blue-500 to-indigo-600", bgLight: "bg-blue-500/10", border: "border-blue-500/20 text-blue-500" },
    { name: "Weapons", description: "Swords, armor, shields, bows, and war apparatus that shaped eras.", icon: <FaShieldAlt />, count: "210+ Items", color: "from-red-500 to-orange-600", bgLight: "bg-red-500/10", border: "border-red-500/20 text-red-500" },
    { name: "Documents", description: "Treaties, historic charters, maps, declarations, and scroll records.", icon: <FaFileAlt />, count: "180+ Items", color: "from-amber-500 to-yellow-600", bgLight: "bg-amber-500/10", border: "border-amber-500/20 text-amber-500" },
    { name: "Writings", description: "Codices, clay inscriptions, hieroglyphs, stone steles, and ancient literature.", icon: <FaBookOpen />, count: "150+ Items", color: "from-emerald-500 to-teal-600", bgLight: "bg-emerald-500/10", border: "border-emerald-500/20 text-emerald-500" }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-4">
      {/* Banner/Slider */}
      <section>
        <Banner />
      </section>

      {/* Featured Artifacts Section */}
      <section className="max-w-7xl mx-auto px-1">
        <div className="text-center space-y-3 mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-500 font-bold uppercase tracking-wider text-xs px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full"
          >
            Exquisite Heritage
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Featured Artifacts
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
          >
            Explore our community's highest-voted treasures. Discover legendary arms, ancient scrolls, and instruments that shaped history.
          </motion.p>
        </div>

        {/* Loading / Error / Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="loading loading-spinner loading-lg text-amber-500"></span>
            <p className="text-sm text-slate-400 dark:text-slate-500 animate-pulse">Unearthing historical treasures...</p>
          </div>
        ) : error ? (
          <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 text-center space-y-4 max-w-md mx-auto">
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
            <Link to="/allartifacts" className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white border-none rounded-xl">
              Browse Offline List
            </Link>
          </div>
        ) : featured.length === 0 ? (
          <div className="p-12 rounded-3xl bg-slate-100 dark:bg-slate-900 text-center max-w-lg mx-auto">
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">No artifacts found in the database registry yet.</p>
            <Link to="/addartifacts" className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-xl text-sm font-semibold hover:bg-amber-600 transition-all duration-300">
              Add the First Artifact
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featured.map((artifact, idx) => (
              <motion.div
                key={artifact._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Artifact Image Container */}
                <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img
                    src={artifact.image}
                    alt={artifact.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-slate-950/80 text-amber-400 border border-amber-500/20 backdrop-blur-sm">
                    {artifact.type}
                  </span>
                  {/* Hover overlay shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card Info */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-xl text-slate-800 dark:text-white tracking-tight group-hover:text-amber-500 transition-colors duration-200">
                      {artifact.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {artifact.historicalContext}
                    </p>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-rose-500 dark:text-rose-400 font-bold text-sm">
                      <FaHeart className="text-sm animate-pulse" />
                      <span>{artifact.likeCount || 0} Likes</span>
                    </div>

                    <Link
                      to={`/artifacts/${artifact._id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 group/btn transition-colors"
                    >
                      <span>View Details</span>
                      <FaArrowRight className="text-[10px] transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* See All Button */}
        {!loading && !error && featured.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Link
              to="/allartifacts"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-amber-500 hover:border-amber-600 text-amber-500 hover:text-amber-600 font-bold rounded-2xl hover:scale-102 active:scale-98 transition-all duration-300 shadow-md shadow-amber-500/5"
            >
              <FaCompass className="text-sm" />
              <span>See All Artifacts</span>
            </Link>
          </motion.div>
        )}
      </section>

      {/* Extra Section 1: Categories Explorer */}
      <section className="max-w-7xl mx-auto px-1">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-500 font-bold uppercase tracking-wider text-xs px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
            Historical Classification
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Time-Travel by Category
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Categorized registry tracking. Click on a category cards to search and filter artifacts matching specific eras and domains.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -5, shadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 flex flex-col justify-between h-64 hover:border-amber-500/40 dark:hover:border-amber-500/30 transition-all duration-300 group"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cat.bgLight} ${cat.border} text-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">{cat.count}</span>
                <Link
                  to={`/allartifacts?search=${cat.name}`}
                  className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-400 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300"
                >
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Extra Section 2: Global Registry Insights & Conservation */}
      <section className="relative overflow-hidden rounded-[36px] bg-slate-900 text-white max-w-7xl mx-auto px-6 py-12 md:py-16 shadow-2xl border border-white/5">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-orange-600/10 blur-[100px] pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left panel: text & description */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full">
              Global Registry Dashboard
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Preserving Humanity's Shared Chronicle
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Through peer review and collective archiving, the Chronicles Registry coordinates with museums, preservationists, and archaeology groups globally to catalog and secure information about precious cultural artifacts.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                <FaGlobe className="text-amber-400" />
                <span>Global Archives</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                <FaHistory className="text-amber-400" />
                <span>Immutable Timelines</span>
              </span>
            </div>
          </div>

          {/* Right panel: statistics grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            {/* Stat card 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">1,248+</div>
              <div className="text-xs font-semibold text-slate-200 mb-1">Cataloged Artifacts</div>
              <p className="text-[10px] text-slate-400 leading-normal">Verified items added from global archaeological hubs.</p>
            </div>

            {/* Stat card 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">94.2%</div>
              <div className="text-xs font-semibold text-slate-200 mb-1">Conservation Index</div>
              <p className="text-[10px] text-slate-400 leading-normal">Items securely housed in partner museum displays or archives.</p>
            </div>

            {/* Stat card 3 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">84</div>
              <div className="text-xs font-semibold text-slate-200 mb-1">Countries Tracked</div>
              <p className="text-[10px] text-slate-400 leading-normal">Origins mapped across five major continents.</p>
            </div>

            {/* Stat card 4 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">12k Yrs</div>
              <div className="text-xs font-semibold text-slate-200 mb-1">Chronological Depth</div>
              <p className="text-[10px] text-slate-400 leading-normal">Spanning from the Neolithic Age to modern documentation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;