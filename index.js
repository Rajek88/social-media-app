const express = require('express');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//set up router
app.use('/', require('./routes'));
console.log('Router loaded');


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
})