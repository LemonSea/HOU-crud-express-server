const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

module.exports = async ( app ) => {
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Intialized');
  await expressLoader( app );
  console.log('Express Intialized');

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
}