const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
  if (!token) {
    return res.status(403).json({message: "A token is required for authentication"});
  }
  try {
    const j_token = token.split(' ')[1];
    const decoded = jwt.verify(j_token, process.env.SECRET_SALT, (err, decd) => {
        if(err) {
            console.log(err, 'ERROR')
        } else {
            req.user = decoded;
        }
    });
   
    
  } catch (err) {
    return res.status(401).json({message: "Invalid Token"});
  }
  return next();
};

module.exports = verifyToken;