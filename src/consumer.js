const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const getUUID = require('uuid-by-string')

const DocumentClient = new AWS.DynamoDB.DocumentClient()

const recordDeletedAccountInfo = event => {
  const { email, timestamp } = JSON.parse(event.Records[0].body)

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      userId: getUUID(email, 'audit'),
      deletedAt: timestamp,
    },
  }

  return DocumentClient.put(params).promise()
}

module.exports = {
  recordDeletedAccountInfo,
}
