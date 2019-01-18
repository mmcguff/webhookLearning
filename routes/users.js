const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const _ = require('lodash');
const rp = require('request-promise');

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user= await User.findOne({username: req.body.username});
    if (user) return res.status(400).send("User already registered.");

    user = new User(_.pick(req.body, ['username', 'password']));
    await user.save();  
    res.send(_.pick(user, ['_id', 'username']));
});

router.get('/', async (req, res) =>{
    const users = await User.find().select('-password');
    
    let options = {
        method: 'GET',
        uri: 'http://localhost:3001'
    };

    await rp(options)
    .then(function (cb) {
    })
    .catch(function (err) {
    });

    res.send(users);
});

router.get('/:id',  async (req, res) => {

    const user = await User.findById(req.params.id).select('-password');

    if (!user) return res.status(404).send('The user with the given ID was not found.');

    res.send(user);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findByIdAndUpdate(req.params.id, {username: req.body.username, password: req.body.password}, {
      new: true
    }).select('-password');
  
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    
    res.send(user);
  });

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id).select('-password');
  
    if (!user) return res.status(404).send('The user with the given ID was not found.');
  
    res.send(user);
  });

module.exports = router;