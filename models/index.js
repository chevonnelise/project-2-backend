// in the Bookshelf ORM, a model represents 1 table in the database
// command is issued in JS and the model translates commands to SQL

// when you require a file, and it's a js file, can omit the extension
// when you require a file, and it's a index.js file, can omit the filename
const bookshelf = require('../bookshelf');

// create Product model
// (arg1, arg2) = (model name, config object)
const Product = bookshelf.model('Product',{
    tableName:'Product'
})

module.exports = {Product}