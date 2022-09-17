const mongoose = require("mongoose");

// TODO: move to .env/sec
// TODO: use async await instead of then/catch
function initializeDBConnection() {
  // Connecting to DB
  mongoose
    .connect("mongodb+srv://test:test123@cluster0.of47lyp.mongodb.net/test", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("successfully connected"))
    .catch((error) => console.error("mongoose connection failed...", error));
}

module.exports = { initializeDBConnection };
