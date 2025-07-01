import express from 'express';
import propertyController from '../controllers/property.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getProperty);

// Protected routes
router.post('/', auth, propertyController.createProperty);
router.put('/:id', auth, propertyController.updateProperty);
router.delete('/:id', auth, propertyController.deleteProperty);
router.get('/user/properties', auth, propertyController.getUserProperties);

export default router; 