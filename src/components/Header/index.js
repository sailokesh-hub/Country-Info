import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_COUNTRIES } from "../../queries";

const Header = ({ searchQuery, setSearchQuery }) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  if (loading)
    return <nav className="p-4 bg-blue-500 text-white">Loading...</nav>;
  if (error)
    return (
      <nav className="p-4 bg-red-500 text-white">Error fetching countries</nav>
    );

  return (
    <nav className="bg-blue-500 text-white">
      <div className="flex justify-between items-center p-4">
        <img src="/country-location-icon.png" alt="logo" />
        <Link to="/" className="text-xl font-bold">
          Country Info
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded-md border bg-black text-white"
            />
            <button
              onClick={toggleDropdown}
              className="px-4 py-2 bg-white text-blue-500 rounded-md shadow-md hover:bg-gray-100 ml-2"
            >
              Countries
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white text-black mt-2 rounded-md shadow-md max-h-64 overflow-y-auto z-10 w-48">
                {data.countries.map((country) => (
                  <Link
                    to={`/country/${country.code}`}
                    key={country.code}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    {country.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/menu" className="hover:underline">
            Menu
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-blue-600">
          <div className="p-4 space-y-2">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 rounded-md border bg-black text-white"
            />
            <button
              onClick={toggleDropdown}
              className="w-full px-4 py-2 bg-white text-blue-500 rounded-md shadow-md hover:bg-gray-100"
            >
              Countries
            </button>
            {isDropdownOpen && (
              <div className="bg-white text-black mt-2 rounded-md shadow-md max-h-64 overflow-y-auto z-10">
                {data.countries.map((country) => (
                  <Link
                    to={`/country/${country.code}`}
                    key={country.code}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    {country.name}
                  </Link>
                ))}
              </div>
            )}
            <Link to="/" className="block hover:underline">
              Home
            </Link>
            <Link to="/menu" className="block hover:underline">
              Menu
            </Link>
            <Link to="/about" className="block hover:underline">
              About
            </Link>
            <Link to="/contact" className="block hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
