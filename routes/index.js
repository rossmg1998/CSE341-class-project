const router = require("express").Router();
router.use('/', require('./swagger'));

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:8080',
  clientID: 'graTqX2Ax6vCXsvgh9hsRZxuWHUurwyx',
  issuerBaseURL: 'https://dev-klued22kjv2w11nk.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

// router.use(
//     auth({
//       authRequired: false,
//     })
// );
  
// // Anyone can access the homepage
// router.get('/', (req, res) => {
//     res.send('<a href="/admin">Admin Section</a>');
// });
  
// // requiresAuth checks authentication.
// router.get('/admin', requiresAuth(), (req, res) =>
//     res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)
// );

router.use('/brandon-mull-books.js', require('./brandon-mull-books.js'));
router.use('/harry-potter-movies.js', require('./harry-potter-movies.js'));

module.exports = router;