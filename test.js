var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://homeiot:J*D!Z@GYgypI79Ui7o7o@cluster0-riran.mongodb.net/homeiot?retryWrites=true";
MongoClient.connect(uri, function(err, client) {
   const collection = client.db("homeiot").collection("devices");
   // perform actions on the collection object
   client.close();
});
