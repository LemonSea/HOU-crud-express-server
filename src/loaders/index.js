const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const Logger = require('./logger');

module.exports = async ( app ) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');
  await expressLoader( app );
  Logger.info('✌️ Express loaded');

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
}