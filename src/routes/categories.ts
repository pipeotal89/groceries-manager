const express = require("express");
var router = express.Router();
const Category = require("../models/category");

//getUser Middleware
async function getCategory(req, res, next) {
  let category;
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: "Cannot find Category" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.category = category;
  next();
}

// Get All Route
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create One Route
router.post("/", async (req, res) => {
  const category = new Category({
    name: "Prueba",
    description: "Prueba",
  });
  try {
    const newCategory = await category.save();
    res.status(201).json({ newCategory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get One Route
router.get("/:id", getCategory, (req, res) => {
  res.json(res.category);
});

//Patch One
router.patch("/:id", getCategory, async (req, res) => {
  if (req.body.name != null) {
    res.category.name = req.body.name;
  }
  if (req.body.description != null) {
    res.category.description = req.body.description;
  }
  try {
    const updatedCategory = await res.category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete One
router.delete("/:id", getCategory, async (req, res) => {
  try {
    await res.category.deleteOne();
    res.json({ message: "User has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
