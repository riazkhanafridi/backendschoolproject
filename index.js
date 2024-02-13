const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/UserRoutes");
const schoolRoute = require("./routes/SchoolRoutes");
const roleRoute = require("./routes/RoleRoutes");
const classRoute = require("./routes/ClassRoutes");
const taskRoute = require("./routes/TaskRoutes");
const assigntaskroute = require("./routes/assignTaskRoutes");
const tasksolutionroute = require("./routes/solutionTaskRoutes");
const commentroute = require("./routes/CommentRoutes");
const awardRoute = require("./routes/AwardRoutes");
const AssignAwardRoute = require("./routes/AssignAwardRoute");
const cookieParser = require("cookie-parser");
// ...

const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://riazkhanafridi96:afridi12345@riaz1.ddga6ic.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api", userRoute);
app.use("/api", schoolRoute);
app.use("/api", roleRoute);
app.use("/api", classRoute);
app.use("/api", taskRoute);
app.use("/api", assigntaskroute);
app.use("/api", tasksolutionroute);
app.use("/api", commentroute);
app.use("/api", awardRoute);
app.use("/api", AssignAwardRoute);

app.get("/", (req, res) => {
  res.send("Server is running!");
});
