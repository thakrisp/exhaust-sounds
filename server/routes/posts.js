const express = require('express');
//const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();

require('dotenv').config();

let dbUser = process.env.dbUserName;
let dbPassword = process.env.dbPassword;

//get everything in database
router.get('/', async (_, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
  console.log('Have been called from frontEnd');
});

//Post to database
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    URL: req.body.URL,
    IMG: req.body.IMG,
    Name: req.body.Name,
    tags: req.body.tags,
    date: new Date(),
  });
  res.status(201).send('Added to DB');
});

async function loadPostsCollection() {
  const client = await MongoClient.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.vhobs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  ).catch((err) => {
    console.error(err);
  });

  console.log('DB connected!');

  return client.db('carExhaustSounds').collection('audioFiles');
}

module.exports = router;
