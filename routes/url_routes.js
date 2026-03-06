const express = require('express');
const authMiddleware = require('../middleware/auth_middleware');
const { urlValidation } = require('../Validators');
const { urlStoreController, getUrlController } = require('../controllers/url_controller');
router = express.Router()

router.get('/:id', getUrlController)
router.post('/store_url', authMiddleware, urlValidation,urlStoreController )
module.exports = router