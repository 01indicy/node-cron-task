const mysqli = require('mysql2')
const connection = mysqli.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'ehms_kcmc',
        waitForConnections:true
    }
)
module.exports = connection