var mongoose = require("mongoose");

function connectToDB(dbURL) {
  mongoose.connect(dbURL);
  
  const splitter = dbURL.split("/")
  const DBName = splitter[splitter.length-1]

  mongoose.connection.once("connected", function() {
    console.log(`${DBName} DB Connected successfully`);
  });

  mongoose.connection.on("error", function(err) {
    console.log(`${DBName} DB Connection failed`, err);
  });

  mongoose.connection.on("disconnected", function() {
    console.log(`${DBName} DB disconnected successfully`);
  });

  var gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
      console.log("Mongoose disconnected through " + msg);
      callback();
    });
  };
  process.once("SIGUSR2", function() {
    gracefulShutdown("nodemon restart", function() {
      process.kill(process.pid, "SIGUSR2");
    });
  });
  process.on("SIGINT", function() {
    gracefulShutdown("app termination", function() {
      process.exit(0);
    });
  });
  process.on("SIGTERM", function() {
    gracefulShutdown("Heroku app shutdown", function() {
      process.exit(0);
    });
  });
}
module.exports = connectToDB;
