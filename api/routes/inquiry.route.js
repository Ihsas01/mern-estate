import express from 'express';
import { createInquiry, getUserInquiries, getPropertyInquiries } from '../controllers/inquiry.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/properties/:propertyId/inquiry', createInquiry);

// Protected routes
router.get('/user/inquiries', auth, getUserInquiries);
router.get('/properties/:propertyId/inquiries', auth, getPropertyInquiries);

export default router; 