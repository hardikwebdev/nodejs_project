const nodemailer = require('nodemailer');
let sgTransport = require('nodemailer-sendgrid-transport');
const hbs = require('nodemailer-express-handlebars');

let smtpoptions = {
   service: 'gmail',
   auth: {
      user: '',
      pass: ''
   }
}

let transporter = nodemailer.createTransport(smtpoptions);

let options = {
   viewEngine: {
      extname: '.hbs',
      layoutsDir: 'views/layouts/',
      defaultLayout: 'layout-email',
      partialsDir: 'views/email/'
   },
   viewPath: 'views/email/',
   extName: '.hbs'
};

transporter.use('compile', hbs(options));

module.exports.transporter = transporter;