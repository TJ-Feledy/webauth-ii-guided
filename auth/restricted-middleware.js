const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  // Grab a cookie... not username and password
  const { user } = req.session;
  
  // Make sure cookie is valid
  
  if (req.session && user) {
    next();
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
};
