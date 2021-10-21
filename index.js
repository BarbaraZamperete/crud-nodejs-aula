require('dotenv').config();

const app = require('./src/server');
require('./src/database');
require('./src/databseNeo4j');

app.listen(app.get('port'), () => {
    console.log("Server on port:"+app.get('port'));
})