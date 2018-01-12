const jwt = require('jsonwebtoken')

class Authentication {
  static authentication(req, res, next){
    console.log(req.headers);
    const token = req.headers['authorization'];
    if (!token) {
      return res.json({success: false, message: 'Token required'})
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.json({success: false, message: 'Problem With Token'})
      } else {
        req.decoded = decoded
        req.userId = decoded.userId
        next()
      }
    })
  }

}

module.exports = Authentication
