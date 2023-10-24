const express = require('express');
const router = express.Router();
const subcategoryController = require('../../Controllers/SubcategoriesController')


router.post('/', subcategoryController.creatSubcategory)

router.get('/', subcategoryController.searchForSubcategory)

router.get('/:id', subcategoryController.getById)

router.put('/:id',subcategoryController.updateSubcategory)

module.exports = router