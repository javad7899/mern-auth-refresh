const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    // Retrieve the access token from cookies
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the access token
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    // Find the user in the database
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Attach user info to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
