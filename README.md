# Welcome to the webhookLearning POC!

## Objective
The intent of this POC is to learn how to implement Webhooks in an API.  Consider the following simple and vanilla API resource with the following routes:

`POST` `{{baseurl}}/api/v1/users`   

with request body of 

```json
{
    "username":"adam12",
    "password":"abc123"
}
```
`GET` `{{baseurl}}/api/v1/users`
`GET` `{{baseurl}}/api/v1/users/:id`
`PUT` `{{baseurl}}/api/v1/users/:id`
`DELETE` `{{baseurl}}/api/v1/users/:id`

where `{{baseurl}}` is `localhost:3000`. 

## Getting Started

1.  clone this repo and install using npm with `npm i`.  
2.  run an instance of mongodb instance locally.  For those new to mongodb click [here](https://www.hongkiat.com/blog/webdev-with-mongodb-part1/)
3.  run `npm start` and your api should be running.   

Using a tool like postman you can start hitting these routes above.  

### What are webhooks?
check out the following youtube video for what some insight to what we are trying to do here:
https://www.youtube.com/watch?v=J7uENSm-w1g


## Now what?
So API run off the idea of a client request data from a server.  Cosider the following meme:
![Are we there yet?](https://i.chzbgr.com/full/6007067648/hA20BB206/)

In use cases where you only need data from an API resouce this pattern of asking and recieving works fine but in use cases where you want to real time notifications of when your resouces has changed this patterns start to feel a little like the above.  It also puts a great tax on client and server resources.  

So Webhooks provide a means of establishing a Publish and Subscribe pattern where client subscribes to resouces from the server and the server sends notifications to the webhook(pre-registered) endpoint of changes of the particular resouces.  This avoid clients from polling servers about resources they want time senstaive data about while still making clients aware of changes to their resouce as they happen. 

## How is it done? 
I recently found the following article that is fianlly providing me some insight into how this is done.  I am going to be building with this as a guide.  We will see what we are able to do.  https://zapier.com/engineering/webhook-design/  