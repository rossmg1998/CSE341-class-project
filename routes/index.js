const router = require("express").Router();
router.use('/', require('./swagger'));

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://cse341-class-project-wuch.onrender.com/',
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

router.use('/brandon-mull-books.js', require('./brandon-mull-books.js'));
router.use('/harry-potter-movies.js', require('./harry-potter-movies.js'));

module.exports = router;