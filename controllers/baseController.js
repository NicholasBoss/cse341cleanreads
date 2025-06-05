const welcomeRoute = (req, res) => {
    res.send('<a href="/auth/google">Sign In with Google</a>');
  };

module.exports = {
    welcomeRoute
};