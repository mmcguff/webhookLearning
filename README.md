# Welcome to the webhookLearning POC!

## Objective
The intent of this POC is to learn how to implement Webhooks in an API.  Consider the following simple API resource with the following routes:

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
2.  run an instance of mongodb instance locally.  For those new to mongodb click (here)[https://www.hongkiat.com/blog/webdev-with-mongodb-part1/]
3.  run `npm start` and your api should be running.   

Using a tool like postman you can start hitting these routes above.  

## Now what?
So API run off the idea of a client request data from a server.  Cosider the following meme:
![Are we there yet?](https://i.chzbgr.com/full/6007067648/hA20BB206/)

In use cases where you only need data from an API resouce this pattern of asking and recieving works fine but in use cases where you want to real time notifications of when your resouces has changed this patterns start to feel a little like the above.  It also puts a great tax on client and server resources.  

So Webhooks provide a means of establishing a Publish and Subscribe pattern where client subscribes to resouces from the server and the server sends notifications to the webhook(pre-registered) endpoint of changes of the particular resouces.  This avoid clients from polling servers about resources they want time senstaive data about while still making clients aware of changes to their resouce as they happen. 

## How is it done? 
I'm not really sure as I haven't found a ton of stuff surrounding best practices for this but I am certain their is registration endpoint done in a POST that will allow clients to connect with this and then some logic some where in routes or another package that allows changes on resoucres to be emitted but honestly its still magic to me as of this writting.  Please fork this repo and if you have a best practice for doing this please share as I intend this repo to be a place that breaks down this useful magic for those wanting to implment this in their own applications.  