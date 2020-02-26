// server.js

// init project
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongouri = process.env.MONGODB_URI || "mongodb://localhost:27017/dumbtwitter";
const mongo = require("mongodb").MongoClient;


let dbclient;


const dummyData = [
  {user: "Alex",message:"Message 1"},
  {user: "Beatrice",message:"Hi Alex"},
  {user: "Alex",message:"Message 2"}
]


// Special piece for running with webpack dev server
if (process.env.NODE_ENV === "development") {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.dev.config.js');
  const compiler = webpack(config);

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// Need to add body-parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

app.get("/counter",async (req,res)=>{
  //get the collection
  const collection = await dbclient.collection("siteinfo"); //dbclient is its own server
  //find the document you care about
  const item = await collection.findOne({});//using no criteria, search and find the first one

  //get your data out of the item
  const pageviews = item ? item.pageviews + 1 : 1;

  //save this back to the database
  await collection.updateOne({},{
    $set:{
      pageviews:pageviews
    }
  },{
    upsert:true //update and if not exist create one
  });//type of object we want to update

  res.send(`This page has been visited ${pageviews} times`);
});


// listen for requests :)
mongo.connect(mongouri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((client) => {
  dbclient = client.db();
  //after establish connection to mango, start the server
  const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
  });
  
// Fetch tweets from the database
app.get("/api/tweets", async (_, res) => {
  const tweetsCollection = await dbclient.collection("tweets");
  const tweets = tweetsCollection.find({});
  res.json(await tweets.toArray());
});




//this page handles requests of userid and fetch the filtered database
app.get('/api/users/:userId', async (req, res)=>{

  const user = req.params.userId;

  const tweetsCollection = await dbclient.collection("tweets");
  const usertweets = tweetsCollection.find({user:req.params.userId}); //find a particular user
  res.json(await usertweets.toArray());
 
});


app.get('/api/delete/:user/:msg', async (req, res)=>{

  const user = req.params.user;
  const msg = req.params.message;
  const tweetsCollection = await dbclient.collection("tweets");
  try{
    const deleted = tweetsCollection.findOneAndDelete(
      {user:req.params.user}
      ,{message:req.params.message});
     res.json(deleted);
  } catch(e) {
    console.log(e);
  }
  
    //find a particular user
  //const resttweets = tweetsCollection.find({});
 
 
});
/*
app.delete('/', function (req, res) {
  res.send('DELETE request to homepage')
});
*/
// Post a new tweet
app.post("/api/tweets", async (req, res) => {
    const body = req.body;
    const user = body.user;
    const message = body.message;
  if (!user || !message) {
    res.status(400).send("Missing user or message");
  } else {
    const tweetsCollection = await dbclient.collection("tweets");
    tweetsCollection.insertOne({user, message});
    res.sendStatus(200);
  }
});


});//after .then is the callback function, since we can't set it async, it's at the top level








