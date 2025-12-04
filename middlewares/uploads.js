const multer = require ("multer")

//store files in memory buffer
const storage = multer.memoryStorage()
//gain access the stored files
const uploads = multer({ storage });
//export the middleware to allow stored files accessible for pushing to database
module.exports = uploads ;

