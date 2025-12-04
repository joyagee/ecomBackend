const jwt =  require ("jsonwebtoken")
const dotenv = require ("dotenv")
dotenv.config ()

exports.isUser = (req, res, next) => {
const token = req.headers.authorization.split(' ')[1]
if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
}

try {
   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) 
   req.user = decoded
   next()
} catch (error) {
     console.log("error", error.message);
     return res
      .status(403)
      .json({ success: false, message: "invalid or expired token" });
    
}
}



exports.isAdmin = (req, res, next) => {
if (req.user?.role === 'ADMIN') {
    next()
    return
}
return res
      .status(403)
      .json({ success: false, message: "Forbidden route, only admins can  access this route" });

}

exports.isSameUser = (req, res, next) => {
const {uuid} = req.params
if (req.user?.uuid !== uuid) {
    return res
      .status(403)
      .json({ success: false, message: "wrong profile, this is not your profile" });

}
return next ()
}