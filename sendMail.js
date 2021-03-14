require('dotenv').config();
const nodemailer = require('nodemailer');
const {google} = require('googleapis');

module.exports = function(app) {
  const redirectUri = 'https://developers.google.com/oauthplayground';
  const clientId = '398702736762-1cdu573v9n1is3e92vgm5cnei7rtv2uf.apps.googleusercontent.com';
  const clientSecret =  "99VvTOzSAsuooRRDSIGUEYJL";
  const refreshToken = process.env.REFRESH_TOKEN;
  
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
        console.log('the error oucured is ' + err);
        res.render(`pages/${req.body.title}`,{title:req.body.title, formAgain: true})
      }
      
        
    })

}