require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3002;
const express = require("express");
const cors = require("cors");
const cookieparser = require('cookie-parser');
const { sequelize } = require("./models");
const errorHandler = require("./middleware/errorHandler");

const usersRoutes = require("./routes/users");
const userRoutes = require("./routes/user");
// const articlesRoutes = require("./routes/articles");
// const profilesRoutes = require("./routes/profiles");
// const tagsRoutes = require("./routes/tags");

const app = express();

app.use(
  cors({origin: ['http://localhost:3001', 'http://127.0.0.1:3001'], credentials: true})
);
app.use(express.json());
app.use(cookieparser());

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(`Connection with ${env} database has been established.`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/dist"));
} else {
  app.get("/", (req, res) => res.json({ status: "API is running on /api" }));
  
}
app.use("/api/users", usersRoutes);
app.use("/api/user", userRoutes);

app.get("*", (req, res) =>
  res.status(404).json({ errors: { body: ["Not found"] } }),
);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);