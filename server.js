const app  = require('express')();
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
var server = require('http').createServer(app);
var io = require('./routes/sockets').initialize(server);

const items  = require('./routes/api/items');
const circuit  = require('./routes/api/mqtt');

//Bodyparser middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose.connect(db)
    .then (() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//Use routes
app.use('/api/items', items);
app.use('/api/mqtt', circuit);

//Starting server
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started listening on port ${port}`));
