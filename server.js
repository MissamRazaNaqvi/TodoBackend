const express = require('express');
const app = express();
const cors = require('cors')
const todoRoutes = require('./src/routes/todoRoutes')
const mysqlConnection = require('./src/config/dbConfig');

app.use(cors())
app.use(express.json());

mysqlConnection.connect((err) => {      
    if (!err) {
        console.log('Connection established successfully');
    }
    else {
        console.log(err);
    }
})

app.use('/', todoRoutes);
const port = 9000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})