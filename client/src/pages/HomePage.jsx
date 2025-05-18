import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaHome, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import PropertyCard from '../components/PropertyCard';

const HomePage = () => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Find Your Dream Home
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8">
            Discover the perfect property that matches your lifestyle
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter location"
                  value={searchQuery.location}
                  onChange={(e) => setSearchQuery({ ...searchQuery, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={searchQuery.propertyType}
                  onChange={(e) => setSearchQuery({ ...searchQuery, propertyType: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Property Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="land">Land</option>
                </select>
              </div>
              <div className="relative">
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
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            >
              <FaSearch className="mr-2" />
              Search Properties
            </button>
          </form>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
          <p className="text-gray-600">
            Explore our handpicked selection of premium properties
          </p>
        </div>

        {error && (
          <div className="text-center text-red-600 mb-8">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/search')}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            View All Properties
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600">
              We provide the best service for our customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-4">
                <FaHome />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Range of Properties</h3>
              <p className="text-gray-600">
                Find your perfect home from our extensive collection of properties
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-4">
                <FaSearch />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-600">
                Advanced search filters to help you find exactly what you're looking for
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
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
    </div>
  );
};

export default HomePage; 