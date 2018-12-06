const COS = require('ibm-cos-sdk');

const config = {
    endpoint: 's3-api.us-geo.objectstorage.softlayer.net',
    apiKeyId: "ULGPDqZESInu0b4f8xguoEmiHXrB3-g8mFPZUT94sW77",
    serviceInstanceId: "crn:v1:bluemix:public:cloud-object-storage:global:a/49211e87eeb8449c85aab25aac369a1e:58f561b6-e657-42fc-8bc3-0900174963b5::",
};

const cos = new COS.S3(config);

// function list (bucket) {
  
//     return cos.listObjects({ Bucket: bucket }).promise()
//       .then(results => ({ files: results.Contents },
//         console.log(results.Contents)
//         ))
//   }
  
//   list();

// let z;

//  retrieve = async (bucket, key) => {

//   const h = await cos.getObject({ Bucket: bucket, Key: key }).promise()
//     .then(result => ({ body: result.Body.toString('base64') },
//     z = result.Body.toString('base64'),
//     console.log("zzzz:")
//     ))
// }

// let y =[];
// y.push(z);

//  o = async () => {
//  const u = await retrieve ("bartek", "dog.jpg")
//  const uu = await upload(z, "bartek", "dogXXX.jpg");
//  }

//  o();

// const mime = require('mime-types');


 
//  upload = async (b,bucket, key) => {
//     console.log("MEEE")
//   const body = await Buffer.from(b, 'base64')

//   const ContentType =  'application/octet-stream'
//   const object = {
//     Bucket: bucket,
//     Key: key,
//     Body: body,
//     ContentType
//   }

//   const h = await  cos.upload(object).promise()
// }




function make_public (bucket, key, acl) {
  return update_acl(bucket, key, 'public-read')
}

function make_private (bucket, key, acl) {
  return update_acl(bucket, key, 'private')
}



 update_acl =(bucket, key, acl) => {

  const options = {
    Bucket: bucket,
    Key: key,
    ACL: acl
  }

  return cos.putObjectAcl(options).promise()
}

make_public("bartek", "panda.jpg")