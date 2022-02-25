const asyncHandler = require("express-async-handler");
const csvtojson = require("csvtojson");

const Product = require("../models/productModel");
const User = require("../models/userModel");

// @desc    Get goals
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.quantity ||
    !req.body.price
  ) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const product = await Product.create({
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    user: req.user.id,
  });

  res.status(200).json(product);
});

// CSV file name
const fileName = `${__dirname}/sample.csv`;
console.log(fileName);
var arrayToInsert = [];
csvtojson()
  .fromFile(fileName)
  .then((source) => {
    // Fetching the all data from each row
    for (var i = 0; i < source.length; i++) {
      var oneRow = {
        name: source[i]["name"],
        description: source[i]["description"],
        quantity: source[i]["quantity"],
        price: source[i]["price"],
      };
      arrayToInsert.push(oneRow);
    }
    console.log(arrayToInsert);
    // Function call
    Product.insertMany(arrayToInsert)
      .then(function () {
        console.log("Data inserted"); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });
  })
  .catch((error) => {
    console.error(error.message);
  });

module.exports = {
  getProducts,
  setProduct,
};
