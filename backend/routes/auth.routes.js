const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");
const { getMe } = require("../controllers/me.controller");
const { register } = require("../controllers/register.controller");
const { login } = require("../controllers/login.controller");
const { logout } = require("../controllers/logout.controller");
const { refreshToken } = require("../controllers/refresh.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/me", authMiddleware, getMe);

module.exports = router;
