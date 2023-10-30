const express = require("express");
const categoriesRoute = require("../../controllers/categorieController");
const router = express.Router();
const AMauthorization = require('../../middlewares/AuthAM')

router.post('/categories',AMauthorization, categoriesRoute.createCategories)

router.get("/categories", categoriesRoute.searchCategories);

router.get("/categories/:id", categoriesRoute.retrieveIdCategorie);

router.put("/categories/:id",AMauthorization, categoriesRoute.updateCategorie);

router.delete("/categories/:id",AMauthorization, categoriesRoute.deleteCategorie)

module.exports = router;

