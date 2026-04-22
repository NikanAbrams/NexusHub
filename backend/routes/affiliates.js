// backend/routes/affiliates.js
const express = require('express');
const router = express.Router();
const affiliateController = require('../controllers/affiliateController');
const auth = require('../middleware/auth');

router.get('/', auth, affiliateController.getAll);
router.post('/', auth, affiliateController.create);
router.put('/:id', auth, affiliateController.update);
router.delete('/:id', auth, affiliateController.delete);

module.exports = router;
