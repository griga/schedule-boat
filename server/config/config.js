var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../'),
    staticPath = path.normalize(__dirname + '/../../public/'),
    uploadsPath = path.normalize(__dirname + '/../../uploads/');

module.exports = {
    development:{
        rootPath: rootPath,
        staticPath: staticPath,
        uploadsPath: uploadsPath,
        port: 14650,
        host: 'dev.schedule-boat.herokuapp.com',
        mail: {
          user: "scheduleboat@gmail.com",
          password: "scheduleboat4all"
        }
    },
    production:{
        rootPath: rootPath,
        staticPath: staticPath,
        uploadsPath: uploadsPath,
        port: process.env.PORT,
        host: 'localhost',
        mail: {
          user: "scheduleboat@gmail.com",
          password: "scheduleboat4all"
        }
    }
};
