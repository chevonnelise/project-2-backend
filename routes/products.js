const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("all products");
})

router.get('/add-product', (req,res)=>{
    res.send("add product");
})

module.exports = router