require('dotenv').config();

const app = require('./src/server');
const database = require('./src/database');

app.listen(app.get('port'), () => {
    console.log("Server on port:"+app.get('port'));
})