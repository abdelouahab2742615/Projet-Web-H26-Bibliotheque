const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, publisherController.getPublishers);
router.get('/:id', authMiddleware, publisherController.getPublisherById);
router.post('/', authMiddleware, publisherController.createPublisher);
router.put('/:id', authMiddleware, publisherController.updatePublisher);
router.delete('/:id', authMiddleware, publisherController.deletePublisher);

module.exports = router;
