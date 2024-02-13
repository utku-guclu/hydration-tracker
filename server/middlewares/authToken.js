require("dotenv").config();

const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;

// Middleware to verify the JWT token in protected routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1]; // Extract token without "Bearer" prefix

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = user; // Attach decoded user information to the request
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

// app.get("/protected-route", authenticateToken, (req, res) => {
//   const user = req.user;
//   res.json({ message: `Hello, ${user.username}!` });
// });