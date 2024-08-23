const { MongoClient } = require( 'mongodb' )
require( "dotenv" ).config()
const client = new MongoClient( process.env.MONGO_URL )

function connectDb () {

    const db = client.db( 'excelWithNode' )
    return collection = db.collection( 'formdata' )

}

module.exports = {
    connectDb: connectDb()
}