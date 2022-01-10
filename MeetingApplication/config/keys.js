/**
 * If custom mongoDB Atlas (Cloud) database needs to be used:
 * dbPassword = 'mongodb+srv://YOUR_USERNAME_HERE:'+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true';
 */

// local mongoDB database
dbPassword = "mongodb://localhost:27017/meetingapp";

// export the database URI
module.exports = {
  mongoURI: dbPassword,
};
