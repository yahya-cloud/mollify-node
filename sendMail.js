require('dotenv').config();
const nodemailer = require('nodemailer');
const {google} = require('googleapis');

module.exports = function(app) {
  const clientId = '398702736762-1cdu573v9n1is3e92vgm5cnei7rtv2uf.apps.googleusercontent.com'
  const clientSecret = '99VvTOzSAsuooRRDSIGUEYJL'
  const redirectUri = 'https://developers.google.com/oauthplayground'
  const refreshToken = '1//04-EN3cYbb7YMCgYIARAAGAQSNwF-L9IruDM334imURNtM--YE6aIhvX6CHw3UySFh9BnFTyr_MgZLOonUui9arQGgaXK6fXyMhs'

    app.post('/send', async (req, res) => {

      const oAuth2Client  = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
      oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

      const accessToken = await oAuth2Client.getAccessToken();
      const output = `
      <h3>The person Info Is</h3>
      <p>Name: ${req.body.name}</p>
      <p>subject: ${req.body.subject}</p>
      <p>email: ${req.body.email}</p>
      
      <h3>And the Message is</h3>
      <p>${req.body.message}</p>
      `
       
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAUTH2',
            user: 'mollifywork@gmail.com',
            clientId: process.env.CLIENT_ID,
            clientSecret:  process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
          }
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
              res.render(`pages/${req.body.title}`,{title:req.body.title, formAgain: true})
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