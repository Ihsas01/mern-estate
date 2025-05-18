import Property from '../models/property.model.js';
import Inquiry from '../models/inquiry.model.js';

// Create a new inquiry
export const createInquiry = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { name, email, phone, message } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const inquiry = new Inquiry({
      property: propertyId,
      name,
      email,
      phone,
      message
    });

    await inquiry.save();

    res.status(201).json({
      success: true,
      message: 'Inquiry sent successfully',
      inquiry
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send inquiry',
      error: error.message
    });
  }
};

// Get all inquiries for a user's properties
export const getUserInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ property: { $in: req.user.properties } })
      .populate('property', 'title images')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      inquiries
    });
  } catch (error) {
    console.error('Error fetching user inquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries',
      error: error.message
    });
  }
};

// Get all inquiries for a specific property
export const getPropertyInquiries = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Check if the user owns the property
    const property = await Property.findOne({
      _id: propertyId,
      owner: req.user._id
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found or unauthorized'
      });
    }

    const inquiries = await Inquiry.find({ property: propertyId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      inquiries
    });
  } catch (error) {
    console.error('Error fetching property inquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries',
      error: error.message
    });
  }
}; 