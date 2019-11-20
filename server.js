//requirements
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
const path = require('path');

app.use(express.static(path.join(__dirname, "quote-machine-client", 'build')));

app.get('/', function(req, res) {
  const clientPath = path.join(__dirname, 'quote-machine-client', 'build', 'index.html')
  res.sendFile(clientPath);
});

//Mongoose stuff
mongoose.connect('mongodb+srv://quotedb-admin:itiacswita@quotedb-rueqe.mongodb.net/', {dbName: 'quoteDatabase'});
const dbConnection = mongoose.connection;
const db = dbConnection.db;
dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function() {
  // we're connected!
  let quoteSchema = new mongoose.Schema({
    quoteNum: Number,
    quoteText: String,
    author: String
  });

  var Quote = mongoose.model('Quote', quoteSchema, "quotes");

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/api/hello', (req, res, next) => {
    res.send('Hello World');
  });
  
  //get all quotes
  app.get('/api/quotes', (req, res, next) => {
  
    Quote.find(function (err, quotes) {
      if (err) {
        res.status(404).send(err);
      };
      res.send(quotes);
    })
    
  });

  //get quote by QuoteNum
  app.get('/api/quotes/specific/:id', (req, res, next) => {
    const quoteId = req.params.id;
    Quote.findOne({quoteNum: quoteId}, (err, quote) => {
      if (err) {
        res.status(404).send(err);
      };
      res.send(quote);
    });
  });
  
  //get random quote
  app.get('/api/quotes/random', (req, res, next) => {
    Quote.count((err, count) => {
      let collectionSize = count;
      let ranQuoteNum = Math.floor(Math.random() * collectionSize) + 1;  
      Quote.findOne({quoteNum: ranQuoteNum}, (err, quote) => {
        if (err) {
          res.status(404).send(err);
        }
        res.send(quote);
      })
    });
  })

});

app.listen(PORT, () => {
  console.log(`Quote Machine server is listening on port ${PORT}!`);
});