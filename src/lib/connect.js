const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

export const collctions = {
    PRODUCTS: 'products',
    USERS: 'users',
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const connect = (cname) =>{
    return client.db(dbName).collection(cname);
}
