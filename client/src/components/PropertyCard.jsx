import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/property/${property._id}`}>
        <div className="relative h-48">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
            {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 truncate">{property.title}</h3>
          <p className="text-gray-600 flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2" />
            <span className="truncate">
              {property.location.city}, {property.location.state}
            </span>
          </p>
          <p className="text-2xl font-bold text-blue-600 mb-4">
            ${property.price.toLocaleString()}
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <FaBed className="mr-1" />
              <span>{property.features.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <FaBath className="mr-1" />
              <span>{property.features.bathrooms} baths</span>
            </div>
            <div className="flex items-center">
              <FaRuler className="mr-1" />
              <span>{property.features.squareFeet} sqft</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard; 