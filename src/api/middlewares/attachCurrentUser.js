const { Container } = require('typedi');
const mongoose = require('mongoose');
const logger = require('../../loaders/logger');
const User = require('../../models/user');

/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  try {
    const userRecord = await User.findById(req.token._id);
    if (!userRecord) {
      return res.sendStatus(401);
    }
    const currentUser = userRecord.toObject();
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

module.exports = attachCurrentUser;
