const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/db");

const allRoutes = require("./api/index");


async function syncDb() {
  try {
    await sequelize.sync({ alter: true }); // Use { alter: true } to keep data
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}
require("dotenv").config();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Server is running!!");
});
app.use("/api/", allRoutes);

// // Commented so that, no re-init occurs for database while reload
// console.log('Syncing database...')
// syncDb().then(() => {
//   app.listen(process.env.PORT, () => {
//     console.log(
//       `Server is running on port ${process.env.PORT} at http://localhost:${process.env.PORT}`
//     );
//   });
// });

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} at http://localhost:${process.env.PORT}`
  );
});
