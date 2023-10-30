const express = require('express');
const router = express.Router();
const productsController = require('../../Controllers/productsController')
const AMauthorization = require('../../middlewares/AuthAM')
const upload = require('../../middlewares/Cloudinary')

router.post('/',upload.single('product_image'), productsController.createProduct)

router.get('/', productsController.findProducts)

router.get('/:id', productsController.getProductById)

router.patch('/:id',AMauthorization, productsController.updateProduct)

router.delete('/:id',AMauthorization, productsController.removeProduct)

module.exports = router