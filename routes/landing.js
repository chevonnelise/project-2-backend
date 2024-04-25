const express = require('express');

// create a new router object
const router = express.Router();

// router object containing routes
router.get('/', (req,res)=>{
    res.render("landing/index");
})

router.get('/our-story', (req,res)=>{
    res.render("landing/our-story");
})

router.get('/contact', (req,res)=>{
    res.render("landing/contact");
})


// export out the router object so that `index.js` might use it 
module.exports = router;