import express from 'express';
import { generateRandomString } from './lib.js';

const PORT = 3000;
const app = express();
app.use(express.json());

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {number} limit
 * @property {string} password
 */

/**
 * @typedef {Object} Url
 * @property {string} id
 * @property {string} destination
 * @property {number} userId
 */

/**
 * @type {User[]}
 */
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

/**
 * @type {Url[]}
 */
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

app.param('userId', (req, res, next, id) => {
    if (req.user = users.find((v) => v.id == id)) {
        next();
    } else {
        res.status(404).send("User not found");
    }
});

app.param('urlId', (req, res, next, id) => {
    if (req.userUrl = urls.find((v) => v.id == id)) {
        next();
    } else {
        res.status(404).send("Url not found");
    }
});

app.get('/users/:userId/urls',
    /** @param {express.Request & {user: User}} req */
    (req, res) => {
        const userUrls = urls.filter((v) => v.userId == req.user.id);
        if (userUrls.length == 0) {
            res.status(404).send('No urls found');
        } else {
            res.send(userUrls);
        }
    });

app.get('/users/:userId',
    /** @param {express.Request & {user: User}} req */
    (req, res) => {
        res.send(
            (({ password, ...rest }) => rest)(req.user)
        );
    });

app.get('/urls/:urlId',
    /** @param {express.Request & {userUrl: Url}} req */
    (req, res) => {
        res.redirect(req.userUrl.destination);
    });

app.post('/urls', (req, res) => {
    const { destination, userId } = req.body;
    if (!destination) {
        res.status(400).send("Missing destination");
    }
    if (!userId) {
        res.status(400).send("Missing userId");
    }

    const id = generateRandomString(6);
    const newUrl = {
        id,
        destination,
        userId,
    };
    urls.push(newUrl);

    res.send(newUrl);
});

app.delete('/urls/:urlId',
    /** @param {express.Request & {userUrl: Url}} req */
    (req, res) => {
        const userUrls = urls.filter((v) => v.userId == req.userUrl.userId);
        if (userUrls.length == 1) {
            res.status(400).send("Last user url cannot be deleted");
        }

        const deleted = urls.splice(urls.indexOf(req.userUrl), 1);
        if (deleted.length == 1) {
            res.send("Done");
        }
    });

app.listen(PORT, () => {
    console.log('Server Ready');
});