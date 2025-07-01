const express = require('express');
const { createInquiry, getUserInquiries, getPropertyInquiries } = require('../controllers/inquiry.controller.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

// Public route
router.post('/properties/:propertyId/inquiry', createInquiry);

// Protected routes
router.get('/user/inquiries', auth, getUserInquiries);
router.get('/properties/:propertyId/inquiries', auth, getPropertyInquiries);

module.exports = router; 