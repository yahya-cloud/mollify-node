const express = require('express');
const sass = require('node-sass-middleware');
const sendMail = require('./sendMail');
const routes = require('./routes');
const app = express();
const port = 4000;

//SETTING UP SASS MIDDLEWARE
app.use(
    sass({
        src: __dirname + '/sass',
        dest: __dirname + '/public/css',
        debug: true,
        outputStyle: 'compressed',
        prefix:  '/css'
    })
 );  
 
//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setting up view engine and static files
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


//ROUTING
routes(app);

//sending mail
sendMail(app);

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})