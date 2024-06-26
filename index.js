// setup express
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
require('dotenv').config();
const PORT = process.env.PORT || 9000;

const app = express();

// use hbs for view engine
app.set('view engine', 'hbs');

// enable static folder
app.use(express.static('public'));

// enable wax-on for template inheritance
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// enable forms
app.use(
    express.urlencoded({
        'extended': false
    })
)

async function main() {
    // routes here
    const landingRoutes = require('./routes/landing')
    const productRoutes = require('./routes/products')
    // use landing routes
    app.use('/', landingRoutes);
    app.use('/products', productRoutes);

}

main();


app.listen(PORT, ()=>{
    console.log(`server started on port ${PORT}`)
});