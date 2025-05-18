import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBed, FaBath, FaRuler, FaCar, FaHome, FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`/api/properties/${id}`);
      setProperty(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch property details');
      console.error('Error fetching property:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{error || 'Property not found'}</h2>
          <button
            onClick={() => navigate('/properties')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-[500px]">
            <img
              src={property.images[activeImage]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            {property.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-3 h-3 rounded-full ${
                      activeImage === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <p className="text-gray-600 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  {property.location.address}, {property.location.city}, {property.location.state}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">
                  ${property.price.toLocaleString()}
                </p>
                <p className="text-gray-600">{property.status === 'for-sale' ? 'For Sale' : 'For Rent'}</p>
              </div>
            </div>

            {/* Property Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center">
                <FaBed className="text-blue-600 mr-2" />
                <span>{property.features.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <FaBath className="text-blue-600 mr-2" />
                <span>{property.features.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <FaRuler className="text-blue-600 mr-2" />
                <span>{property.features.squareFeet} sq ft</span>
              </div>
              <div className="flex items-center">
                <FaCar className="text-blue-600 mr-2" />
                <span>{property.features.parking} Parking</span>
              </div>
            </div>

            {/* Property Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{property.description}</p>
            </div>

            {/* Additional Features */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex items-center">
                  <FaHome className="text-blue-600 mr-2" />
                  <span>Type: {property.propertyType}</span>
                </li>
                <li className="flex items-center">
                  <FaBuilding className="text-blue-600 mr-2" />
                  <span>Status: {property.status}</span>
                </li>
                {property.features.furnished && (
                  <li className="flex items-center">
                    <span>Furnished</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <FaPhone className="text-blue-600 mr-2" />
                    <span>{property.owner.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-600 mr-2" />
                    <span>{property.owner.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Contact Agent</h2>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <ContactForm propertyId={id} onClose={() => setShowContactForm(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail; 