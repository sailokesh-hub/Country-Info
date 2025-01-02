import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_COUNTRIES } from "../../queries";

const Header = ({ searchQuery, setSearchQuery }) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  if (loading)
    return <nav className="p-4 bg-blue-500 text-white">Loading...</nav>;
  if (error)
    return (
      <nav className="p-4 bg-red-500 text-white">Error fetching countries</nav>
    );

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between items-center">
      <Link to="/">
        <h1 className="text-xl font-bold">Country Info</h1>
      </Link>
      <div className="space-x-6 flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-4 p-2 rounded-md border bg-black mr-4"
          />
          <button
            onClick={toggleDropdown}
            className="px-4 py-2 bg-white text-blue-500 rounded-md shadow-md hover:bg-gray-100"
          >
            Countries
          </button>
          {isDropdownOpen && (
            <div className="absolute bg-white text-black mt-2 rounded-md shadow-md max-h-64 overflow-y-auto z-10 w-[300px]">
              <div className="block w-full">
                {data.countries.map((country) => (
                  <Link
                    to={`/country/${country.code}`}
                    key={country.code}
                    className="block px-4 py-2 text-center bg-gray-100 rounded-md hover:bg-gray-200 w-full"
                  >
                    {country.name}
                  </Link>
                ))}
              </div>
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
    </nav>
  );
};

export default Header;
