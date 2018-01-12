import express from 'express';
import recastai from 'recastai';
import auth from '../auth.json';

const app = express();
const port = process.env.PORT || 3000;
const bot = new recastai.build(auth.botKey, 'en')

app.get('/', (req, res) => res.send("Welcome To ResumAI"));

app.get('/converation/:id/send/:message', (req, res) => {
  bot.dialog({ type: 'text', content: req.params.message}, { conversationId: req.params.id })
  .then(function(botRes) {
    res.send(botRes)
  })
  .catch(function () {
    console.log("could not handle request, strange");
  });
});

const server = app.listen(port, function() {
  console.log(`Express Server listening on port: ${port}`);
});