require('use-strict');
let express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    hbs               = require('hbs'),
    mongoose          = require('mongoose'),
    cors              = require('cors'),
    morgan            = require('morgan'),

    //auth
    passport          = require('passport'),
    jwt               = require('jwt-simple'),
    apiController     = require('./controllers/apiController'),
    config            = require('./config/config'),
    routes            = require('./config/routes');

// TODO: configure a development and deployment strategy for cross origin
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Log to console
app.use(morgan('dev'));

app.use(passport.initialize());

// Set default to serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));


// TODO: revisit how the front end will be rendered, using handlebars
app.set('view engine', 'hbs');

// TODO: determine database strategy for deployment vs local development
// mongoose.connect( process.env.MONGOLAB_URI ||
//                  process.env.MONGOHQ_URL ||
//                  config.database);

require('./config/passport')(passport);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is up on port ${process.env.PORT || '3000'}`);
});
mongoose.connect(config.database);

app.use(routes);
