const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./auth/auth');

mongoose.connect('mongodb://127.0.0.1:27017/VS_db');
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');

const video = require('./routes/video');
const upload = require('./routes/upload');
const authRoutes = require('./routes/auth');
const liveStreaming = require('./routes/live-stream');

const app = express();

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads/thumbnail', express.static('../uploads/thumbnail'));

app.use('/', video);
app.use('/', authRoutes);
app.use('/user', passport.authenticate('jwt', { session: false }), upload);
app.use('/', liveStreaming);

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(4000, () => {
    console.log('Listening on port 4000!');
});
