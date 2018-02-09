var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.use(session({secret: 'password'}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if (req.session.num == null) {
        let num = Math.floor(Math.random() * 100 + 1);
        req.session.num = num;
        console.log(req.session.num);
    }
    res.render('index', {guess: ""});
})

app.post('/guess', function(req, res) {
    if (req.body == "") {
        res.redirect('/')
    }

    console.log(req.body);
    if (parseInt(req.body.guess) == parseInt(req.session.num)) {
        console.log('you win');
        response = {
            message: 'You win!',
            class: 'winner',
            isWinner: true
        }
        req.session.num = null;
    } else if (parseInt(req.body.guess) > parseInt(req.session.num)) {
        console.log('too high');
        response = {
            message: 'Too High!',
            class: 'failedGuess',
            isWinner: false
        }
    } else if (parseInt(req.body.guess) < parseInt(req.session.num)) {
        console.log('too low');
        response = {
            message: 'Too Low!',
            class: 'failedGuess',
            isWinner: false
        }
    }
    res.render('index', {guess: response});
})

app.listen(8000, function(){
    console.log('listening on port 8000');
})