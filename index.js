const express = require('express')
const app = express()
const cron = require('node-cron');
const port = 8080;

cron.schedule('* * * * *', async () => {
    const controller =  await require('./controller/controller')
    controller.sendClaim()
    console.log(new Date())
});

app.listen(port,() => {console.log(`app is running on port ${port} ... worker ${process.pid} ... ${new Date()}`)})