import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_COUNTRIES } from './queries';

const lightColors = ['#FFCCCB', '#FFFFCC', '#CCFFCC', '#CCE5FF', '#FFDAB9', '#E6E6FA'];
const getRandomColor = () => lightColors[Math.floor(Math.random() * lightColors.length)];

const Home = ({ searchQuery }) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Ensure that countries exist before trying to filter
  const countries = data?.countries || [];

  // Filter countries based on the search query
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCountries.map((country) => {
        const backgroundColor = getRandomColor();

        return (
          <Link
            to={`/country/${country.code}`}
            key={country.code}
            className="p-6 text-black border rounded-lg hover:opacity-90 transition duration-300 shadow-md hover:shadow-lg"
            style={{ backgroundColor }}
          >
            <p className="font-bold text-lg">{country.name}</p>
            <span className="text-4xl">{country.emoji}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
