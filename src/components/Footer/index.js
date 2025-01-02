import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-bold">About Us</h3>
          <p className="text-sm mt-2">
            Explore detailed information about countries around the world.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <Link to="#" className="hover:text-gray-400">
              <FaFacebook />
            </Link>
            <Link to="#" className="hover:text-gray-400">
              <FaTwitter />
            </Link>
            <Link to="#" className="hover:text-gray-400">
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-6">
        © 2025 Country Info. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
