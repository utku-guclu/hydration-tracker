require("dotenv").config();

const express = require("express");

/* app */
const app = express();

const cors = require("cors");
const helmet = require("helmet");

/* routers */
const authRoutes = require("./routes/authRoutes");
const hydrationRoutes = require("./routes/hydrationRoutes");
const userRoutes = require("./routes/userRoutes");

/* WELCOME */
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

/* port */
const PORT = process.env.PORT || 3000;

/* helmet configuration with various security options */
app.use(
  helmet({
    frameguard: {
      // Set frameguard to deny to prevent clickjacking attacks
      action: "deny",
    },
    contentSecurityPolicy: {
      // Enable and configure Content Security Policy (CSP) to restrict sources for loading content
      directives: {
        defaultSrc: ["'self'"], // Allow content from the same origin
        styleSrc: ["style.com"], // Allow styles from 'style.com'
      },
    },
    referrerPolicy: {
      policy: "strict-origin-when-cross-origin",
    },
    dnsPrefetchControl: false, // Disable DNS prefetching
  })
);

/* Hide the 'X-Powered-By' header to reduce information disclosure */
app.use(helmet.hidePoweredBy());

/* Set frameguard to deny to prevent clickjacking attacks */
app.use(helmet.frameguard({ action: "deny" }));

/* Enable XSS (Cross-Site Scripting) filter */
app.use(helmet.xssFilter());

/* Set 'X-Content-Type-Options' header to 'nosniff' to prevent MIME sniffing */
app.use(helmet.noSniff());

/* Set 'X-Download-Options' header to 'noopen' to prevent Internet Explorer from executing downloads in the context of the web page */
app.use(helmet.ieNoOpen());

/* Enable HSTS (HTTP Strict Transport Security) with a max-age of 90 days and force HTTPS */
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
const timeInSeconds = ninetyDaysInSeconds;

app.use(helmet.hsts({ maxAge: timeInSeconds, force: true }));

/* Enable DNS prefetch control to control browser DNS prefetching behavior */
app.use(helmet.dnsPrefetchControl());

/* Content Security Policy (CSP) to restrict sources for loading scripts */
app.use(
  helmet.contentSecurityPolicy({
    defaultSrc: ["'self'"], // Allow scripts from the same origin
    scriptSrc: ["'self'", "'cdnjs.cloudflare.com'"], // Allow scripts from the same origin and 'trusted-cdn'
  })
);

/* cors */
app.use(cors());

/* json */
app.use(express.json());

/* ENDPOINTS */

/* welcome */
app.get("/", (req, res) => {
  res.render("welcome");
});

app.get("/api", (req, res) => {
  res.json({ app: "Hydration Tracker 2024" });
});
/* welcome */

app.use("/user", userRoutes); // For user registration
app.use("/auth", authRoutes); // authenticate user
app.use("/api/hydration", hydrationRoutes); // for hydration

// Only start the server if the file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
