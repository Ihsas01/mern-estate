import React, { useState, useEffect } from 'react';
import { FaSearch, FaHome, FaBuilding, FaMapMarkerAlt, FaArrowDown } from 'react-icons/fa';
import PropertyCard from '../components/PropertyCard';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    location: '',
    propertyType: '',
    status: ''
  });

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await axios.get('/api/properties?limit=6&sortBy=newest');
      setFeaturedProperties(response.data.properties);
      setError(null);
    } catch (err) {
      setError('Failed to fetch featured properties');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    Object.entries(searchQuery).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-[600px] flex flex-col justify-center items-center text-white bg-gradient-to-r from-blue-700 to-blue-500 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40 animate-fade-in"></div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 drop-shadow-lg animate-slide-down">
            Discover Your <span className="text-yellow-300">Dream Home</span>
          </h1>
          <p className="text-2xl md:text-3xl text-center mb-10 animate-fade-in">
            Find the perfect property for your lifestyle
          </p>
          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full max-w-3xl bg-white bg-opacity-90 rounded-xl shadow-2xl p-6 flex flex-col md:flex-row gap-4 animate-fade-in">
            <div className="relative flex-1">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={searchQuery.location}
                onChange={(e) => setSearchQuery({ ...searchQuery, location: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative flex-1">
              <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={searchQuery.propertyType}
                onChange={(e) => setSearchQuery({ ...searchQuery, propertyType: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="relative flex-1">
              <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={searchQuery.status}
                onChange={(e) => setSearchQuery({ ...searchQuery, status: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Status</option>
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 flex items-center justify-center shadow-lg"
            >
              <FaSearch className="mr-2" />
              Search
            </button>
          </form>
          <FaArrowDown className="mt-16 text-4xl animate-bounce text-yellow-300" />
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-blue-700 animate-slide-up">Featured Properties</h2>
          <p className="text-gray-600 animate-fade-in">
            Explore our handpicked selection of premium properties
          </p>
        </div>
        {error && (
          <div className="text-center text-red-600 mb-8 animate-fade-in">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 bg-gray-200 rounded-lg animate-pulse"></div>
            ))
          ) : (
            featuredProperties.map(property => (
              <div key={property._id} className="transform hover:scale-105 transition-transform duration-300 animate-fade-in">
                <PropertyCard property={property} />
              </div>
            ))
          )}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/search')}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-lg animate-fade-in"
          >
            View All Properties
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">Why Choose Us</h2>
            <p className="text-gray-600">
              We provide the best service for our customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 animate-slide-up">
              <div className="text-blue-600 text-4xl mb-4">
                <FaHome />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Range of Properties</h3>
              <p className="text-gray-600">
                Find your perfect home from our extensive collection of properties
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 animate-slide-up delay-100">
              <div className="text-blue-600 text-4xl mb-4">
                <FaSearch />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-600">
                Advanced search filters to help you find exactly what you're looking for
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 animate-slide-up delay-200">
              <div className="text-blue-600 text-4xl mb-4">
                <FaBuilding />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Platform</h3>
              <p className="text-gray-600">
                Secure and reliable platform for all your real estate needs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to find your next home?</h2>
          <button
            onClick={() => navigate('/sign-up')}
            className="bg-yellow-400 text-blue-900 px-10 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-yellow-300 transition-colors duration-300"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fade-in { animation: fadeIn 1s ease-in; }
        .animate-slide-down { animation: slideDown 1s cubic-bezier(.4,2,.6,1); }
        .animate-slide-up { animation: slideUp 1s cubic-bezier(.4,2,.6,1); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
