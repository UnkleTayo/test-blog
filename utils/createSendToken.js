const generateToken = require('./generateToken');

createSendToken = (user, statusCode, res) => {
  // log the user in
  const token = generateToken(user._id);

  res.status(statusCode).json({ status: 'success', token, data: { user } });
};

module.exports = createSendToken;
