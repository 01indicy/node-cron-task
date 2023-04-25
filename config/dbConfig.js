const mysqli = require('mysql2')
const connection = mysqli.createConnection({
        host:'10.11.0.43',
        user:'ehms_user',
        password:'2#dbroot@Gpitg',
        database:'ehms_kcmc',
        waitForConnections:true
    }
)
module.exports = connection