const fetch = require('node-fetch')
const moment = require('moment')
const controller = () => { }

controller.sendClaim = async () => {
    const claim = await require('../modal/modal')
    await claim.claimCount(async (err, r) => {
        if(parseInt(r) > 0){
            await authenticate('https://verification.nhif.or.tz/claimsserver/Token').then((token) => {
                console.log(token)
            })
            claim.claimInfo(async (err,res) => {
                const facility_code = new Promise((resolve, reject) => {
                    claim.facilityCode((err_,res_) => { resolve(res_) })
                })
                const patient_name = res[0]['Patient_Name'].split(" ")
                let attendance_date = new Date(res[0]['Visit_Date']);
                let type_code = 'OUT';
                if(res[0]['Admit_Status'] === 'admitted'){ }

                const payload = {
                    'FacilityCode': await facility_code,
                    'ClaimYear': attendance_date.getFullYear(),
                    'ClaimMonth': attendance_date.getMonth(),
                    'FolioNo': parseInt(res[0]['Folio_No']),
                    'SerialNo': await facility_code+'/'+attendance_date.getMonth()+'/'+attendance_date.getFullYear()+'/'+res[0]['Folio_No'],
                    'CardNo': res[0]['Member_Number'].replace(/\s/g, ""),
                    'FirstName': patient_name[0],
                    'LastName': patient_name[2],
                    'Gender': res[0]['Gender'],
                    'DateOfBirth': moment(res[0]['Date_Of_Birth']).utc().format('YYYY-MM-DD'),
                    'AuthorizationNo':res[0]['AuthorizationNo'],
                    'Telephone':res[0]['Phone_Number'],
                    'AttendanceDate': moment(attendance_date).utc().format('YYYY-MM-DD'),
                    'PatientTypeCode': type_code
                }
                console.log(payload);
            })
        }else{
            console.log(r)
        }
    })
}
async function authenticate(url){
    try {
        const token = await fetch(`${url}`, {
            method: 'POST',
            body: `grant_type=password&username=kcmchospital&password=kcmchospital@2020`,
            headers: {'Content-Type': 'application/json'}
        })
        const tokenDetails = await token.json()
        return tokenDetails;
    }catch (err) {
        throw err
    }
}

module.exports = controller;