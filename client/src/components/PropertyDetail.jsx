import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaParking, FaCouch } from 'react-icons/fa';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/properties/${id}`);
      setProperty(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch property details. Please try again later.');
      console.error('Error fetching property:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
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

  if (!property) {
    return (
      <div className="text-center text-gray-600 p-4">
        Property not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Image Gallery */}
      <div className="relative h-[500px] mb-8">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover rounded-lg"
        />
        {property.images.length > 1 && (
          <>
            <button
              onClick={handlePreviousImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              ←
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              →
            </button>
          </>
        )}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {property.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <FaMapMarkerAlt className="mr-2" />
            <span>
              {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
            </span>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <FaBed className="mr-2 text-blue-600" />
                <span>{property.features.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <FaBath className="mr-2 text-blue-600" />
                <span>{property.features.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <FaRulerCombined className="mr-2 text-blue-600" />
                <span>{property.features.squareFeet} sqft</span>
              </div>
              <div className="flex items-center">
                <FaParking className="mr-2 text-blue-600" />
                <span>{property.features.parking ? 'Parking Available' : 'No Parking'}</span>
              </div>
              <div className="flex items-center">
                <FaCouch className="mr-2 text-blue-600" />
                <span>{property.features.furnished ? 'Furnished' : 'Unfurnished'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <div className="text-3xl font-bold text-blue-600 mb-4">
              ${property.price.toLocaleString()}
            </div>
            <div className="text-gray-600 mb-4">
              {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
            </div>
            
            <button
              onClick={() => navigate(`/contact/${property._id}`)}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 mb-4"
            >
              Contact Agent
            </button>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Property Details</h3>
              <div className="space-y-2 text-gray-600">
                <p>Type: {property.propertyType}</p>
                <p>Status: {property.status}</p>
                <p>Listed: {new Date(property.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail; 