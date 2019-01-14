const Joi = require('joi');
const mongoose = require('mongoose');

const webhookSchema = new mongoose.Schema({
    urlEndPoint: {
        type:String,
        minlength: 5,
        maxlength: 50,
        unique: true,
        required: true,
    }
});

const Webhook = mongoose.model('Webhook', webhookSchema);

function validateWebhook(webhook){
    const schema = {
        urlEndPoint: Joi.string().uri().required(),
    }

    return Joi.validate(webhook, schema);
}

exports.Webhook = Webhook;
exports.validate = validateWebhook;