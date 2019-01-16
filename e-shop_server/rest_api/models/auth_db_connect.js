var mongoose = require("mongoose");

var dbURL = `mongodb://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.AUTH_DB_NAME}`;

mongoose.connect(dbURL);

mongoose.connection.once("connected",function(){
	console.log("DB Connected successfully");
});

mongoose.connection.on("error",function(err){
	console.log("DB Connection failed",err);
});

mongoose.connection.on("disconnected",function(){
	console.log("DB disconnected successfully");
});



var gracefulShutdown = function (msg, callback) {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};
process.once('SIGUSR2', function () {
	gracefulShutdown('nodemon restart', function () {
		process.kill(process.pid, 'SIGUSR2');
	});
});
process.on('SIGINT', function () {
	gracefulShutdown('app termination', function () {
		process.exit(0);
	});
});
process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app shutdown', function () {
		process.exit(0);
	});
});

