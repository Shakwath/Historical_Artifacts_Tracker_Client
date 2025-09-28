import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1 */}
        <div>
          <h3 
          className= "text-gray-400 font-bold mb-4">Historical Artifacts</h3>
          <ul>
            <li className="mb-2 hover:text-white cursor-pointer">Home</li>
            <li className="mb-2 hover:text-white cursor-pointer">All Artifacts</li>
            <li className="mb-2 hover:text-white cursor-pointer">Add Artifact</li>
            <li className="mb-2 hover:text-white cursor-pointer">Artifact Details</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-gray-400 font-bold mb-4">COMPANY</h3>
          <ul>
            <li className="mb-2 hover:text-white cursor-pointer">About us</li>
            <li className="mb-2 hover:text-white cursor-pointer">Contact</li>
            <li className="mb-2 hover:text-white cursor-pointer">Jobs</li>
            <li className="mb-2 hover:text-white cursor-pointer">Press kit</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-gray-400 font-bold mb-4">LEGAL</h3>
          <ul>
            <li className="mb-2 hover:text-white cursor-pointer">Terms of use</li>
            <li className="mb-2 hover:text-white cursor-pointer">Privacy policy</li>
            <li className="mb-2 hover:text-white cursor-pointer">Cookie policy</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-gray-400 font-bold mb-4">FOLLOW US</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaFacebookF size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaInstagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Historical Artifacts. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;