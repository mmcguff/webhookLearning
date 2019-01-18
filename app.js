const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const webhook = require('./routes/webhook');

const app = express();

const uristring = process.env.MONGODB_URI || 'mongodb://localhost/webhookLearning';
mongoose.connect(uristring, { useCreateIndex: true, useNewUrlParser: true })
    .then(() => console.log(`Succeeded connected to: ${uristring}`))
    .catch(err => console.log(`ERROR connecting to: ${uristring}.  ${err}`));

app.use(express.json());
app.use('/api/v1/users', users);
app.use('/api/v1/webhook', webhook);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));