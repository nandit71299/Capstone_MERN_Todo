const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const router = express.Router();
const { connectDB } = require("./config/db");

app.use(express.json());
app.use(cors());

const notesRoutes = require("./routes");

connectDB()
  .then((success) => {
    console.log("MongoDB Connected...");
    app.use("/api/", notesRoutes);
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch((error) => {
    console.error(error);
    process.exit(1); // Exit process with failure status code 1 when error occurs.
  });
