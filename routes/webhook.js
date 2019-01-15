const express = require('express');
const router = express.Router();
const {Webhook, validate} = require('../models/webhook');
const _ = require('lodash');

router.post('/', async (req, res) => {
    res.send('Webhook Post Request');
});

router.get('/', async (req, res) =>{
    res.send('Webhook Get All Request');
});

router.get('/:id',  async (req, res) => {
    res.send('Webhook Get by id Request');
});

router.put('/:id', async (req, res) => {
    res.send('Webhook PUT update Request');
  });

router.delete('/:id', async (req, res) => {
    res.send('Webhook Delete Request');
  });

module.exports = router;
