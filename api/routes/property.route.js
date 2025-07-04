const express = require('express');
const propertyController = require('../controllers/property.controller.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

// Public routes
router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getProperty);

// Protected routes
router.post('/', auth, propertyController.createProperty);
router.put('/:id', auth, propertyController.updateProperty);
router.delete('/:id', auth, propertyController.deleteProperty);
router.get('/user/properties', auth, propertyController.getUserProperties);

module.exports = router; 