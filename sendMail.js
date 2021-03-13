const nodemailer = require('nodemailer');
module.exports = function(app) {

    app.post('/send', async (req, res) => {

        let testAccount = await nodemailer.createTestAccount();
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });
    
    
         let mailOptions = {
            from: `${req.body.email}`, // sender address
            to: "yahya08in@gmail.com", // list of receivers
            subject: `${req.body.subject}`, // Subject line
            text: `${req.body.message}`, // plain text body
            html: "<h1>Email from nodemailer</h1>", // html body
          }
        
          // send mail with defined transport object
          transporter.sendMail(mailOptions, function(err, info){
            if (err) {
                console.log(err);
                return ('Error while sending email' + err)
              }
            else {
                res.render(`pages/${req.body.title}`,{title:req.body.title, formAgain: true})
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                return ('Email sent')
            }
          });
        
    })

}