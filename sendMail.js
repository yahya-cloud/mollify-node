require('dotenv').config();
const nodemailer = require('nodemailer');
const {google} = require('googleapis');

module.exports = function(app) {
  const redirectUri = process.env.REDIRECT;
  const clientId = process.env.CLIENT_ID;
  const clientSecret =  "99VvTOzSAsuooRRDSIGUEYJL";
  const refreshToken = '1//04-EN3cYbb7YMCgYIARAAGAQSNwF-L9IruDM334imURNtM--YE6aIhvX6CHw3UySFh9BnFTyr_MgZLOonUui9arQGgaXK6fXyMhs';
  
    app.post('/send', async (req, res) => {

      const oAuth2Client  = new google.auth.OAuth2( clientId, clientSecret, redirectUri);
      oAuth2Client.setCredentials({refresh_token:refreshToken});
 
      try{
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
            clientId: clientId,
            clientSecret:  clientSecret,
            refreshToken: refreshToken,
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

          transporter.sendMail(mailOptions)
          res.render(`pages/${req.body.title}`,{title:req.body.title, formAgain: true})
      }catch(err){
        console.log('the error oucured is ' + process.env.CLIENT_ID + err);
        res.render(`pages/${req.body.title}`,{title:req.body.title, formAgain: true})
      }
      
        
    })

}