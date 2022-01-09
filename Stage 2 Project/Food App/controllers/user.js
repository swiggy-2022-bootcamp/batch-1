exports.user = (_req, res) => {
  res.status(200).send("User Content.");
};

exports.admin = (_req, res) => {
  res.status(200).send("Admin Content.");
};