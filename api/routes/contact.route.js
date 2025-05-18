import express from 'express';
import { createContact, getContacts, updateContactStatus, deleteContact } from '../controllers/contact.controller.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

// Public route
router.post('/', createContact);

// Protected routes (admin only)
router.get('/', auth, admin, getContacts);
router.patch('/:id', auth, admin, updateContactStatus);
router.delete('/:id', auth, admin, deleteContact);

export default router; 