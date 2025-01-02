import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { GET_COUNTRY_DETAILS } from "../../queries"; // Your GraphQL query for countries

const CountryDetails = () => {
  const { code } = useParams(); // Get the country code from the URL
  const { loading, error, data } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { code }, // Pass the code as a variable to the query
  });

  // State to store country details from REST API and Wikipedia data
  const [countryDetails, setCountryDetails] = useState(null);
  const [cultureDescription, setCultureDescription] = useState("");

  useEffect(() => {
    if (data && data.country) {
      // Fetch additional data from REST API for country details
      fetch(`https://restcountries.com/v3.1/name/${data.country.name}`)
        .then((response) => response.json())
        .then((details) => setCountryDetails(details[0])) // Use the first result
        .catch((err) => console.error("Error fetching country details:", err));

      // Fetch Wikipedia summary for cultural context
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${data.country.name}`)
        .then((response) => response.json())
        .then((wikiData) => setCultureDescription(wikiData.extract)) // Use the summary of culture
        .catch((err) => console.error("Error fetching culture data:", err));
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const country = data.country;

  // Wait until country details from REST API and Wikipedia data are available
  if (!countryDetails || !cultureDescription) return <p>Loading country details...</p>;

  return (
    <div className="p-6 bg-gray-100 shadow-lg rounded-lg max-w-4xl mx-auto">
      <Link to="/" className="mb-4 text-blue-500 underline hover:text-blue-700">
        Back to List
      </Link>
      <div className="text-center">
        <p className="text-3xl font-bold mt-4">{country.name}</p>
        <p className="text-xl text-gray-600">{country.capital}</p>
        <img
          src={countryDetails.flags.svg}
          alt={`Flag of ${country.name}`}
          className="w-32 h-20 mt-4 mx-auto"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <strong className="text-lg">Population:</strong>
            <span>{countryDetails.population}</span>
          </div>
          <div>
            <strong className="text-lg">Region:</strong>
            <span>{countryDetails.region}</span>
          </div>
          <div>
            <strong className="text-lg">Languages:</strong>
            <ul className="list-disc pl-5">
              {Object.values(countryDetails.languages || {}).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong className="text-lg">Currency:</strong>
            <span>{countryDetails.currencies?.USD?.name}</span>
          </div>
        </div>

        {/* Culture and Traditions (Center Section) */}
        <div className="col-span-1 md:col-span-2 mt-6 md:mt-0">
          <h3 className="text-2xl font-bold">Culture and Traditions</h3>
          <p>{cultureDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
