// Controller: refreshToken
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    console.error("No refresh token provided.");
    return res.status(403).json({ message: "Refresh token not provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    console.log("Decoded refresh token:", decoded);

    const user = await User.findById(decoded.id);

    if (!user) {
      console.error("User not found.");
      return res.status(403).json({ message: "User not found" });
    }

    const tokenExists = user.refreshTokens.some(
      (tokenObj) => tokenObj.token === refreshToken
    );

    if (!tokenExists) {
      console.error("Invalid refresh token.");
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    console.log("New access token generated:", newAccessToken);

    const newRefreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    console.log("New refresh token generated:", newRefreshToken);

    user.refreshTokens = user.refreshTokens.filter(
      (tokenObj) => tokenObj.token !== refreshToken
    );
    user.refreshTokens.push({ token: newRefreshToken });

    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Tokens refreshed successfully",
      user: { username: user.username, role: user.role }, // Send user data along with the tokens
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
