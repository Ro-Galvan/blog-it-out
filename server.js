const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const { strict } = require('assert');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');


// // Sets up session and connect to our Sequelize db
// const sess = {
//   secret: 'Super secret secret',
//   // TODO: Add a comment describing the purpose of adding a cookies object to our options to our session object
// //  to store info for x set timeframe in case server goes down so user can still log in
//   cookie: {
//     // TODO: Add a comment describing the functionality of the maxAge attribute
//     // how long cookie will be stored 
//     maxAge: 3600,
//     // TODO: Add a comment describing the functionality of the httpOnly attribute
//     // not secured??
//     httpOnly: true,
//     // TODO: Add a comment describing the functionality of the secure attribute
//     secure: false,
//     // TODO: Add a comment describing the functionality of the sameSite attribute
//     sameSite: 'strict',
//   },
//   resave: false,
//   saveUninitialized: true,
//   // Sets up session store
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };
// app.use(session(sess));


const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
