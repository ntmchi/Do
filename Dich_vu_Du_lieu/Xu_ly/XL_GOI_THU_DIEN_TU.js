    var nodemailer = require('nodemailer');
    class XL_GOI_THU_DIEN_TU {
        Goi_Thu_Lien_he(from, to, subject, body){
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'python244t7cn@gmail.com', //username gmail
                    pass: 'Python244' //password gmail
                }
            });

            var mailOptions = {
                from: `KIEHL Shop <${from}>`,
                to: to,
                subject: subject,
                html: body
            };
            //Gọi phương thức sendMail -> Promise
            return transporter.sendMail(mailOptions);
        }
    }
    var Goi_thu = new XL_GOI_THU_DIEN_TU();
    module.exports = Goi_thu;