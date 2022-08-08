const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://Calculator_equation:AGdZrP4ogCVtN0mv@cluster0.fzbub.mongodb.net/?retryWrites=true&w=majority"
);
const taskSchema = {
  name: {
    type: String,
    required: true,
  },
};

const Task = mongoose.model("Task", taskSchema);

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let today = new Date();
  let options = { weekday: "long", day: "numeric", month: "long" };
  let day = today.toLocaleDateString("en-US", options);

  Task.find({}, function (err, foundTasks) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { today: day, tasks: foundTasks });
    }
  });
});


app.listen(process.env.PORT || 3000, function () {
  console.log("Server running at port 3000");
});
