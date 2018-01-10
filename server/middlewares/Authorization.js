module.exports = {
    isAdmin: (req, res, next) => {
    if (req.decoded.role === 'admin') {
      next()
    }else {
      res.json({message:'User not allowed'})
    }
  }
}
