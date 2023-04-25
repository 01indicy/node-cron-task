const fetch = require('node-fetch')
const controller = () => { }

controller.sendClaim = async () => {
    await require('../modal/modal').claimCount(async (err, r) => {
        if(parseInt(r) > 0){
            console.log(r)
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