const {MongoClient} = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

function connectDb(){

    const db = client.db('excelWithNode')
    return  collection = db.collection('formdata')

}

module.exports = {
    connectDb : connectDb()
}