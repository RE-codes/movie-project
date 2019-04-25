const passport = require('passport');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.post('/auth/signin', requireSignin, Authentication.signin);
  app.post('/auth/signup', Authentication.signup);
  app.get('/just/for/funsies', requireAuth, (req, res) => {
    res.send("I'm in like Flynn!");
  });
};
