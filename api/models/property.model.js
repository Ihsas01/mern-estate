import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    }
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['house', 'apartment', 'condo', 'townhouse', 'land']
  },
  status: {
    type: String,
    required: true,
    enum: ['for-sale', 'for-rent']
  },
  features: {
    bedrooms: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    squareFeet: {
      type: Number,
      required: true
    },
    parking: {
      type: Number,
      default: 0
    },
    furnished: {
      type: Boolean,
      default: false
    }
  },
  images: [{
    type: String,
    required: true
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Property = mongoose.model('Property', propertySchema);

export default Property; 