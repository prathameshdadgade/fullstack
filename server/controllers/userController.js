// server/controllers/userController.js
exports.getProfile = async (req, res) => {
  res.json(req.user);
};
