// const query = "SELECT * FROM CLIENTES";
// const query2 = "db.clients.find()";

const mongoose = require('mongoose');

// const MONGODB_URI = 'mongodb://localhost/node-app'  
const MONGODB_URI = 'mongodb+srv://'+ process.env.MONGODB_USER +':'+ process.env.MONGODB_PASSWORD +'@cluster0.l7llk.mongodb.net/'+ process.env.MONGODB_DATABASE +'?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(db => console.log("Database is connected to", db.connection.host)).catch(err => console.log(err));