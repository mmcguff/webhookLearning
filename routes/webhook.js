const express = require('express');
const router = express.Router();
const {Webhook, validate} = require('../models/webhook');
const _ = require('lodash');

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let webhook = await Webhook.findOne({urlEndPoint: req.body.urlEndPoint});
    if (webhook) return res.status(400).send("Webhook already registered.");

    webhook = new Webhook(req.body);
    await webhook.save();  
    res.send(webhook);
});

router.get('/', async (req, res) =>{
    const webhook = await Webhook.find();
    res.send(webhook);
});

router.get('/:id',  async (req, res) => {

    const webhook = await Webhook.findById(req.params.id);

    if (!webhook) return res.status(404).send('The webhook with the given ID was not found.');
    res.send(webhook);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const webhook = await Webhook.findByIdAndUpdate(req.params.id, {urlEndPoint: req.body.urlEndPoint}, {
      new: true
    });
  
    if (!webhook) return res.status(404).send('The webhook with the given ID was not found.');
    
    res.send(webhook);
  });

router.delete('/:id', async (req, res) => {
    const webhook = await Webhook.findByIdAndRemove(req.params.id);
  
    if (!webhook) return res.status(404).send('The webhook with the given ID was not found.');
  
    res.send(webhook);
  });

module.exports = router;
