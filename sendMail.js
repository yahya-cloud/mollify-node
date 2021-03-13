require('dotenv').config();

const nodemailer = require('nodemailer');
module.exports = function(app) {

    app.post('/send', async (req, res) => {

      const output = `
      <h3>The person Info IS</h3>
      <p>Name: ${req.body.name}</p>
      <p>subject: ${req.body.subject}</p>
      <p>email: ${req.body.email}</p>
      
      <h3>And the Message is</h3>
      <p>${req.body.message}</p>
      `
       
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASS, // generated ethereal password
          },
        });
    
    
         let mailOptions = {
            from: `${req.body.email}`, // sender address
            to: "mollifywork@gmail.com", // list of receivers
            subject: `${req.body.subject}`, // Subject line
            text: `${req.body.message}`, // plain text body
            html: output, // html body
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