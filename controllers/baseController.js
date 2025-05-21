const welcomeRoute = (req, res) => {
    res.send("Welcome to Clean Reads. To see the API documentation, visit /api-docs");
  };

module.exports = {
    welcomeRoute
};