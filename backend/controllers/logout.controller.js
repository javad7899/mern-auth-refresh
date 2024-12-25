const User = require("../models/user.model");

exports.logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(400).json({ message: "No refresh token found" });
  }

  try {
    // Log the token coming from the client
    console.log("Received refresh token:", refreshToken);

    // Check if the refresh token exists in the database
    const user = await User.findOne({ "refreshTokens.token": refreshToken });

    if (!user) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    // Log the user object before modifying
    console.log("User before removing refresh token:", user);

    // Remove the refresh token from the user's record
    user.refreshTokens = user.refreshTokens.filter(
      (tokenObj) => tokenObj.token !== refreshToken
    );

    // Log after filtering the array
    console.log("User after removing refresh token:", user);

    // Save the updated user record
    const updatedUser = await user.save();
    if (!updatedUser) {
      return res.status(500).json({ message: "Failed to update user" });
    }

    // Log the result for better tracking
    console.log(`Removed refresh token for user: ${user.username}`);

    // Clear the refresh token cookie from the client
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
      sameSite: "strict",
    });

    // Send response
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Server error" });
  }
};
