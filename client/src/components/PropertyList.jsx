import { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from './PropertyCard';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    propertyType: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    city: '',
    state: ''
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await axios.get(`/api/properties?${queryParams}`);
      setProperties(response.data.properties);
      setError(null);
    } catch (err) {
      setError('Failed to fetch properties. Please try again later.');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          >
            <option value="">Property Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Land</option>
          </select>

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          >
            <option value="">Status</option>
            <option value="for-sale">For Sale</option>
            <option value="for-rent">For Rent</option>
          </select>

          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min Price"
            className="border rounded-md p-2"
          />

          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max Price"
            className="border rounded-md p-2"
          />

          <input
            type="number"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            placeholder="Bedrooms"
            className="border rounded-md p-2"
          />

          <input
            type="number"
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleFilterChange}
            placeholder="Bathrooms"
            className="border rounded-md p-2"
          />

          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            placeholder="City"
            className="border rounded-md p-2"
          />

          <input
            type="text"
            name="state"
            value={filters.state}
            onChange={handleFilterChange}
            placeholder="State"
            className="border rounded-md p-2"
          />
        </div>
      </div>

      {/* Property Grid */}
      {properties.length === 0 ? (
        <div className="text-center text-gray-600">
          No properties found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList; 