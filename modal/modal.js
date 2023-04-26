const modal = () => { }

modal.claimCount = async (results) => {
    const sql = require('../config/dbConfig')
    sql.query("SELECT COUNT(*) as Num FROM `tbl_bills` WHERE `e_bill_delivery_status` = 1",[],(err, result, fields) => {
        if(err) throw err
        results(null,result[0]['Num'])
    })
}

modal.claimInfo = async (results) => {
    const sql = require('../config/dbConfig')
    sql.query('SELECT tpr.Patient_Name,Gender,tci.AuthorizationNo,Phone_Number,Date_Of_Birth,Member_Number,Admit_Status,Visit_Date,tcf.Folio_No\n' +
        'FROM tbl_bills tb, tbl_patient_payments tpp, tbl_check_in tci, tbl_patient_registration tpr, tbl_check_in_details tcid, tbl_claim_folio tcf\n' +
        'WHERE tb.Bill_ID = 11695 AND tb.Bill_ID = tpp.Bill_ID AND tpp.Check_In_ID = tci.Check_In_ID AND tci.Check_In_ID = tcid.Check_In_ID AND tb.Bill_ID = tcf.Bill_ID AND tci.Registration_ID = tpr.Registration_ID GROUP BY tpp.Check_In_ID',[],(err, result, fields) => {
        results(null,result)
    })
}

modal.facilityCode = async (results) => {
    const sql = require('../config/dbConfig')
    sql.query('SELECT facility_code FROM tbl_system_configuration',[],(err, result, fields) => {
        if (err) throw err.message
        results(null,result[0]['facility_code'])
    })
}

module.exports = modal;