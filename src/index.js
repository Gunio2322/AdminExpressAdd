import express from 'express';
const app = express();
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import session from 'express-session';
import handlebarsExpress from 'express-handlebars';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as AdminJSMongoose from '@adminjs/mongoose';
import  {  getGlobals  }  from  'common-es';
import { citiesSchema } from './Recources/citites.js';
import { usersSchema } from './Recources/users.js';
AdminJS.registerAdapter(AdminJSMongoose);
const Users = mongoose.model('Users', usersSchema);
const Cities = mongoose.model('Cities', citiesSchema);

const  { __dirname , __filename }  =  getGlobals( import.meta.url );
const hbs = handlebarsExpress.create({
    extname: '.hbs',
    partialsDir: __dirname + './../views/partials/'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', __dirname + './../views');
app.use(express.static(__dirname + './../public'));


app.get('/', (req, res) => {
    res.render('home')
})


app.get('/kontakt', (req, res) => {
    res.render('kontakt')
})

// Very basic configuration of AdminJS.
const adminJs = new AdminJS({
  resources: [
    {
      resource: Users,
  },
  {
      resource: Cities,
  },
  ], // We don’t have any resources connected yet.
  rootPath: '/admin', // Path to the AdminJS dashboard.
});
// Build and use a router to handle AdminJS routes.
const router = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
      cookieName: 'adminjs',
      cookiePassword: 'complicatedsecurepassword',
      authenticate: async (email, password) => {
          const user = await Users.findOne({ email });
          if (user) {
              const matched = await bcrypt.compare(password, user.encryptedPassword);
              if (matched) {
                  return user;
              }
          }
          return false;
      },
  },
  null,
  // Add configuration required by the express-session plugin.
  {
      resave: false, 
      saveUninitialized: true,
  }
); 

app.use(adminJs.options.rootPath, router);

// Run the server.
const run = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/tutorial', {useNewUrlParser: true,
  useUnifiedTopology: true,
})
  await app.listen(8080, () => console.log(`Example app listening on port 8080!`));
};
run();
