import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12 md:py-16">
          
          {/* Column 1: Branding & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group transition-transform duration-300">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center p-1.5 shadow-md shadow-amber-500/20 group-hover:rotate-6 transition-all duration-300">
                <img
                  src="https://i.ibb.co.com/k6zpczSK/Custom-Made-Genuine-Vinyl-Stickers-Decals-3-and-5-Tatto-Design-Sticker-Waterproof-Vinyl-Decals-for-M.png"
                  alt="logo"
                  className="w-full h-full object-contain filter invert dark:invert-0 brightness-110"
                />
              </div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent group-hover:brightness-110 transition-all duration-300">
                Chronicle
              </span>
            </Link>
            
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Preserving and tracking humanity's historical treasures. Join our registry to record, catalog, and share ancient artifacts from around the globe.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-3.5 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-200/50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300 shadow-sm" aria-label="Facebook">
                <FaFacebookF size={14} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-200/50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300 shadow-sm" aria-label="Instagram">
                <FaInstagram size={14} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-200/50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300 shadow-sm" aria-label="Twitter">
                <FaTwitter size={14} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-200/50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300 shadow-sm" aria-label="GitHub">
                <FaGithub size={14} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-200/50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300 shadow-sm" aria-label="LinkedIn">
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4 md:pl-6">
            <h3 className="font-bold text-slate-900 dark:text-white tracking-wider text-xs sm:text-sm uppercase">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 flex items-center">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/allartifacts" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 flex items-center">
                  All Artifacts
                </Link>
              </li>
              <li>
                <Link to="/addartifacts" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 flex items-center">
                  Add Artifact
                </Link>
              </li>
              <li>
                <Link to="/myartifacts" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 flex items-center">
                  My Artifacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white tracking-wider text-xs sm:text-sm uppercase">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200">
                  Research Bureau
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white tracking-wider text-xs sm:text-sm uppercase">
              Newsletter
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Subscribe to receive weekly updates on newly discovered and cataloged historical artifacts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
                className="px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 w-full"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-amber-500/10 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200/60 dark:border-slate-900/60 py-6 text-center text-xs text-slate-500 dark:text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>&copy; {new Date().getFullYear()} Chronicle. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;