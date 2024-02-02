// Middleware to validate password
const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long" });
  }

  // Check for at least one digit
  if (!/\d/.test(password)) {
    return res.status(400).json({ error: "Password must contain at least one digit" });
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({ error: "Password must contain at least one uppercase letter" });
  }

  // If all checks pass, proceed to the next middleware or route
  next();
};

module.exports = validatePassword;