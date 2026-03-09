const express = require('express');
const router = express.Router();

const messageRoutes = require('./messages');
const contactRoutes = require('./contacts');
const documentRoutes = require('./documents');

router.use('/messages', messageRoutes)
router.use('/contacts', contactRoutes)
router.use('/documents', documentRoutes)

module.exports = router;
