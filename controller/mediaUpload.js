const AWS = require('aws-sdk');
const auth = require('../db/auth')
// console.log(auth.aws().accessKey)
const key = auth.aws().accessKey
const secret = auth.aws().secretAccessKey


const s3 = new AWS.S3({
    accessKeyId: key,
    secretAccessKey: secret
})


const upload = {
     async uploadFile (file) {
        const fileContent = file.data
        const fileName = file.name
        const fileType = file.mimetype
          const params = {
              Body: fileContent, 
              Bucket: "marcygram", 
              Key: fileName, 
              ContentType: fileType
             };
             try {
               const data = await s3.upload(params).promise()
               return data
             } catch (error) {
                 return error
             }

      }
}

module.exports = upload