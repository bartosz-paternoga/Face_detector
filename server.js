
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const moment = require('moment');
moment().format();

const port = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/FACER');

const {Mong} = require('./model');

const app = express();
app.use(express.static('client/build'));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));


const COS = require('ibm-cos-sdk');
const config = {
    endpoint: 's3-api.us-geo.objectstorage.softlayer.net',
    apiKeyId: "ULGPDqZESInu0b4f8xguoEmiHXrB3-g8mFPZUT94sW77",
    serviceInstanceId: "crn:v1:bluemix:public:cloud-object-storage:global:a/49211e87eeb8449c85aab25aac369a1e:58f561b6-e657-42fc-8bc3-0900174963b5::",
};
const cos = new COS.S3(config);

let postBody;
let bucket;
let timestamp;
let time;
let name;

const mime = require('mime-types');


upload = async (b,bucket, key) => {
  console.log("HIT")
  const body = await Buffer.from(b, 'base64')

  const ContentType = 'image/jpeg'
  // const ContentType =  'application/octet-stream'
  const object = {
    Bucket: bucket,
    Key: key,
    Body: body,
    ACL: 'public-read',
    ContentType
  }

 const c = await cos.upload(object).promise();

 const mong = new Mong ({
        Bucket: bucket,
        Time: time,
        Link: `http://${bucket}.s3-api.us-geo.objectstorage.softlayer.net/${name}`
    });

  mong.save((err,doc)=>{
    if(err) console.error(err)
    console.log(doc)
    // mongoose.disconnect()
    })
 
}


app.post('/', async (request, response) => {
  postBody = await request.body;

  const x = JSON.stringify(postBody);
  const base = x.substring(25, x.length-5);
  const replaced = base.replace(/ /g, '+') + '='

  bucket = "bartek"
 
  timestamp =  Date.now();
  time = moment.utc(Date.now()).local();
  name = timestamp.toString();

  const up = await upload(replaced,bucket, name);

  response.send("OKEY");

});


app.get('/data', function(req, res) {
  Mong.find({}, function(err, foundData) { //empty query for all data
      if(err) {
         console.log(err);
         return res.status(500).send();
      } else {
          console.log("FOUNDDATA",foundData)
          res.status(200).send(foundData);
      }
  });
});





app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Server listening on port ${port}`)) 
