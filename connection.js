const mongoose = require("mongoose");

//Connect with db

mongoose.connect(
  "mongodb://localhost/test",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

mongoose.connection
  .once("open", () => {
    console.log("Connection made!");
  })
  .on("error", (error) => {
    console.log(error);
  });
