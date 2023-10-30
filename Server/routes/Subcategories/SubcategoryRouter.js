const express = require('express');
const router = express.Router();
const subcategoryController = require('../../Controllers/SubcategoriesController')
const AMauthorization = require('../../middlewares/AuthAM')

router.post('/',AMauthorization, subcategoryController.creatSubcategory)

router.get('/', subcategoryController.searchForSubcategory)

router.get('/:id', subcategoryController.getById)

router.put('/:id', AMauthorization, subcategoryController.updateSubcategory)

router.delete('/:id', AMauthorization, subcategoryController.deleteSub)

module.exports = router