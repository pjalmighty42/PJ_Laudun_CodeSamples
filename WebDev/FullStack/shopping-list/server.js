const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Initalize Routes
const items = require('./routes/api/items');

//Body Parser Middleware
app.use(express.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to DB
mongoose
.connect(db, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
.then(() => console.log("Mongo DB Connected..."))
.catch(err => console.log(err));

//Use Routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, ()=>{ console.log(`Server started on port ${port}`)});