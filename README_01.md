# Exercise 01

**tinystuff.io** is a platform that aggregates many different utility apps. Some examples are QR code scanner, pdf generator and image converter.
We recently started to work on one of the most requested apps from our customers: a URL shortener.
A url shortener is a service where we associate a short url to another longer url and when someone clicks on it, it is redirected.

For example, you can associate <https://www.yoursuperlongdomain.why/a-super-long-path> to something like <https://tinystuff.io/a1B2c3>.

We already know that there are some existing solutions like Bitly or Short.io, so our designers are experimenting with some ux/ui solutions with our frontend team to see how we can differentiate and they asked us to create a mock (fake) backend that they can connect to, to make some tests.

As this is not the real backend but just a test, we will not use a database to store information, but variables inside our code.

You are provided with a boilerplate for this project (see next page) and you are asked to implement the following endpoints:

- `GET /users/{userId}` finds the user with corresponding {userId} and returns an object containing all the user info, except the hashed password. If no user is found it returns a 404 status code with an error message.
- `GET /users/{:userId}/urls` returns an array of all the urls objects of the user with corresponding {userId}. If the user has no urls it returns a 404 status code with an error message.
- `GET /urls/:urlId` redirect to the destination of the url with a corresponding urlId.

## Boilerplate

```javascript
import express from 'express';

const app = express();

const PORT = 3000;

const users = [
    { id: 1, name: 'João Silva', email: 'joao.silva@example.com', limit: 1000, password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', limit: 1500, password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', limit: 2000, password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z' },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', limit: 2500, password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z' },
    { id: 5, name: 'Carlos Pereira', email: 'carlos.pereira@example.com', limit: 3000, password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z' },
    { id: 6, name: 'Diana Evans', email: 'diana.evans@example.com', limit: 3500, password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z' },
    { id: 7, name: 'Francisco Oliveira', email: 'francisco.oliveira@example.com', limit: 4000, password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z' },
    { id: 8, name: 'Grace Harris', email: 'grace.harris@example.com', limit: 4500, password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z' },
    { id: 9, name: 'Henrique Costa', email: 'henrique.costa@example.com', limit: 5000, password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z' },
    { id: 10, name: 'Ivy Martinez', email: 'ivy.martinez@example.com', limit: 5500, password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z' }
];

const urls = [
    { id: 'a1B2c3', destination: 'https://news.com/article/1', userId: 2 },
    { id: 'd4E5f6', destination: 'https://shop.net/product/2', userId: 3 },
    { id: 'g7H8i9', destination: 'https://blog.co/post/3', userId: 5 },
    { id: 'j0K1l2', destination: 'https://forum.info/thread/4', userId: 6 },
    { id: 'm3N4o5', destination: 'https://store.biz/item/5', userId: 8 },
    { id: 'p6Q7r8', destination: 'https://media.tv/video/6', userId: 9 },
    { id: 's9T0u1', destination: 'https://service.io/help/7', userId: 10 },
    { id: 'v2W3x4', destination: 'https://portal.ai/dashboard/8', userId: 2 },
    { id: 'y5Z6a7', destination: 'https://app.dev/profile/9', userId: 3 },
    { id: 'b8C9d0', destination: 'https://docs.app/guide/10', userId: 5 }
];

/*
Write your code here
*/

app.listen(PORT, () => {
    console.log('Server Ready');
});
```
