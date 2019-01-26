var twilio = require('twilio')
class XL_Goi_tin_nhan{
    Goi_Tin_nhan(so_dien_thoai, noi_dung){
        var accountSid = 'AC1b648e32786b7451671801626af6b9d0' //Your account SID from www.twilio.com
        var authToken = '8398c8cbe71043e82dc84fdbe6eb2dc1' // Your Auth Token from www.twilio.com
        var client = new twilio(accountSid, authToken)
        var Kg=""
        return client.messages.create({
            body: noi_dung,
            to: so_dien_thoai,
            from : '(458) 218-8545'
        })
    }
}

var Goi_Tin_nhan = new XL_Goi_tin_nhan()
module.exports = Goi_Tin_nhan