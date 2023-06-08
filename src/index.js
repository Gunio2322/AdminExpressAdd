const express = require('express');
const app = express();
const handlebarsExpress = require('express-handlebars');
const bodyParser = require('body-parser');
const hbs = handlebarsExpress.create({
    extname: '.hbs',
    partialsDir: __dirname + './../views/partials/'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', __dirname + './../views');
app.use(express.static(__dirname + './../public'));


app.get('/', (req, res) => {
    res.render('home')
})


app.get('/kontakt', (req, res) => {
    res.render('kontakt')
})


app.listen(3001, ()=> {console.log('server start 3001')})
