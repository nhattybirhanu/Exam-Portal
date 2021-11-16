const User = require('../models/Users');

async function getProf(req, res) {
   const { name } = req.params;
   const users = await User.find({ role: 'professor' }).select('-password');
   res.json({ success: 1, payload: users });
}

module.exports = { getProf };
