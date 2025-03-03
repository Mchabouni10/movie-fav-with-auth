// config/ensureLoggedIn.js

module.exports = function (req, res, next) {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: "Unauthorized: User not authenticated" });
  }
  console.log("ensureLoggedIn passed, req.user:", req.user); // Debug log
  next();
};
