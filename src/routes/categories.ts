import { getCategoryController } from "../controllers/getCategories";

const express = require("express");

const router = express.Router();

router.get("/", getCategoryController);

module.exports = router;
