exports.getMe = async (req, res) => {
  try {
    // User details are already attached to `req.user` by the auth middleware
    const { username, role } = req.user;

    res.status(200).json({
      message: "User details fetched successfully",
      user: { username, role },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};
