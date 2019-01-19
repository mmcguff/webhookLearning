const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const _ = require('lodash');
const rp = require('request-promise');
const publishToSubscribers = require('./publishToSubscribers');

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user= await User.findOne({username: req.body.username});
    if (user) return res.status(400).send("User already registered.");

    user = new User(_.pick(req.body, ['username', 'password']));
    await user.save();  
    user = _.pick(user, ['_id', 'username']);
    res.send(user);
    publishToSubscribers(user);
});

router.get('/', async (req, res) =>{
    const users = await User.find().select('-password');
    res.send(users);
    publishToSubscribers(users);
});

router.get('/:id',  async (req, res) => {

    const user = await User.findById(req.params.id).select('-password');

    if (!user) return res.status(404).send('The user with the given ID was not found.');

    res.send(user);
    publishToSubscribers(user);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findByIdAndUpdate(req.params.id, {username: req.body.username, password: req.body.password}, {
      new: true
    }).select('-password');
  
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    
    res.send(user);
    publishToSubscribers(user);
  });

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id).select('-password');
    if (!user) return res.status(404).send('The user with the given ID was not found.');
  
    res.send(user);
    publishToSubscribers(user);
  });

module.exports = router;