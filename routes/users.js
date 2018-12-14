const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const _ = require('lodash');

//POST
router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user= await User.findOne({username: req.body.username});
    if (user) return res.status(400).send("User already registered.");

    user = new User(_.pick(req.body, ['username', 'password']));
    await user.save();  
    res.send(_.pick(user, ['_id', 'username']));
});

//GET
router.get('/', async (req, res) =>{
    const users = await User.find().select('-password');
    res.send(users);
});
//PUT 

//DELETE


module.exports = router;