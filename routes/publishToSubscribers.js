'use strict'
const rp = require('request-promise');
const {Webhook, validate} = require('../models/webhook');
const _ = require('lodash');

module.exports = async function (body) {
    const webhook = await Webhook.find().select(['urlEndPoint', '-_id']);
    const subscribers = webhook.map(function (obj) {return obj.urlEndPoint; });

    Promise.all(subscribers).then(function(urls) {
        urls.map((uri)=>{
            let options = {
                method: 'POST',
                uri,
                body,
                json: true 
            };
             
            rp(options)
                .then(function (parsedBody) {
                    console.log(parsedBody);
                })
                .catch(function (err) {
                });
        });

       });    
};