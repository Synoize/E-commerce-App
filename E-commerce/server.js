const express = require('express');
const app = express();

const db = require('./db');

const bodyParser = require('body-parser')
app.use(bodyParser.json());

//Import the router files
const personRoutes = require('./routes/personRoutes');
const itemsRoutes = require('./routes/itemsRoutes');

//use the routers
app.use('/person', personRoutes);
app.use('/items', itemsRoutes);




//comment added for testing purpose



app.listen(3000, () => {
    console.log('Server Listening on port 3000')
})