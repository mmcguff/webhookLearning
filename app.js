const express = require('express');
const mongoose = require('mongoose');

const app = express();

const uristring = process.env.MONGODB_URI || 'mongodb://localhost/webhookLearning';
mongoose.connect(uristring, { useCreateIndex: true, useNewUrlParser: true })
    .then(() => console.log(`Succeeded connected to: ${uristring}`))
    .catch(err => console.log(`ERROR connecting to: ${uristring}.  ${err}`));

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));