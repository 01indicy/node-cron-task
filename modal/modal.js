const modal = () => { }

modal.claimCount = async (results) => {
    const sql = require('../config/dbConfig')
    sql.query("SELECT COUNT(*) as Num FROM `tbl_bills` WHERE `e_bill_delivery_status` = 1",[],(err, result, fields) => {
        if(err) throw err
        results(null,result[0]['Num'])
    })
}

module.exports = modal;