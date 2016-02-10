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
        host: 'localhost'
    },
    production:{
        rootPath: rootPath,
        staticPath: staticPath,
        uploadsPath: uploadsPath,
        port: 80,
        host: 'localhost'
    }
};
