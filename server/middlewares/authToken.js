require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY

// Middleware to verify the JWT token in protected routes
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;

/* 
// Use authenticateToken as middleware for protected routes
app.get("/protected-route", authenticateToken, (req, res) => {
  // Access granted for authenticated users
  res.json({ message: "Access granted to protected route" });
}); */