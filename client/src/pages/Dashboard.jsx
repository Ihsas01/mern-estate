import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaEnvelope, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [listings, setListings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/sign-in');
        return;
      }

      if (activeTab === 'listings') {
        const response = await axios.get('/api/properties/user/properties', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setListings(response.data);
      } else {
        const response = await axios.get('/api/user/inquiries', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInquiries(response.data);
      }
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setListings(listings.filter(listing => listing._id !== id));
    } catch (err) {
      setError('Failed to delete listing. Please try again later.');
      console.error('Error deleting listing:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => navigate('/create-listing')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <FaPlus />
          Create New Listing
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'listings'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaHome className="inline-block mr-2" />
              My Listings
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'inquiries'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaEnvelope className="inline-block mr-2" />
              Inquiries
            </button>
          </nav>
        </div>

        {error && (
          <div className="p-4 text-red-600 bg-red-50">
            {error}
          </div>
        )}

        <div className="p-6">
          {activeTab === 'listings' ? (
            listings.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <FaHome className="mx-auto text-4xl mb-4" />
                <p>You haven't created any listings yet.</p>
                <button
                  onClick={() => navigate('/create-listing')}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Create your first listing
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {listings.map(listing => (
                  <div
                    key={listing._id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{listing.title}</h3>
                          <p className="text-gray-600">
                            {listing.location.city}, {listing.location.state}
                          </p>
                          <p className="text-blue-600 font-semibold">
                            ${listing.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {listing.status === 'for-sale' ? 'For Sale' : 'For Rent'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/edit-listing/${listing._id}`)}
                          className="p-2 text-blue-600 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteListing(listing._id)}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            inquiries.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <FaEnvelope className="mx-auto text-4xl mb-4" />
                <p>You haven't received any inquiries yet.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {inquiries.map(inquiry => (
                  <div
                    key={inquiry._id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Inquiry for {inquiry.property.title}
                        </h3>
                        <p className="text-gray-600">
                          From: {inquiry.name} ({inquiry.email})
                        </p>
                        <p className="text-gray-600">
                          Phone: {inquiry.phone}
                        </p>
                        <p className="mt-2 text-gray-700">
                          {inquiry.message}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 