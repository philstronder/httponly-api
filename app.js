const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

//Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

//Simple login route to set an HttpOnly cookie
app.post("/login", (req, res) => {
  //In a real application, you'd validate the user's credentials here
  const { username, password } = req.body;

  if (username === "user" && password === "pass") {
    //Set an HttpOnly cookie
    res.cookie("authToken", "secureTokenValue", {
      httpOnly: true, // This makes the cooke inaccessible to JavaScript
      secure: process.env.NODE_ENV === "production", // Ensure this is secure in production (reuqires HTTPS)
      maxAge: 3600000, //1 hour
    });

    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Route to demonstrate reading the cookie
app.get("/profile", (req, res) => {
  if (req.cookies && req.cookies.authToken) {
    res.status(200).json({ message: "Profile data" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
