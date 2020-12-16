// EXPRESS AND OTHER SETUP
const express = require('express');
const {setupExpressApp} = require('./setupExpress');
const {setupHBS} = require('./setupHBS');
const MongoUtil = require('./MongoUtil.js');

require('dotenv').config();

// create the app
const app = express();
setupExpressApp(app);
setupHBS();

async function main() {
    const MONGO_URL=process.env.MONGO_URL;
    await MongoUtil.connect(MONGO_URL, "memory_game");

    const citiesRoutes = require('./routes/citiesRoutes')
    const scoreRoutes = require('./routes/scoreRoutes')
    // const userRoutes = require('./routes/userRoutes')

    app.use('', citiesRoutes);
    app.use('/score', scoreRoutes);
    // app.use('/users', userRoutes);

}

main();

// LISTEN
app.listen(3000, ()=>{
    console.log("Express is running")
})