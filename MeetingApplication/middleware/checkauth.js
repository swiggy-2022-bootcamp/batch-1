module.exports = {
  /**
   * Used by routes to check if the request is authenticated.
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object.
   * @param {function} next - Next function in line.
   */
  checkAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },

  /**
   * Used by routes to check if the request is NOT authenticated.
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object.
   * @param {function} next - Next function in line.
   */
  checkNotAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },
};
