const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

module.exports = async ( app ) => {
  const mongoConnection = await mongooseLoader();
  console.dir('MongoDB Intialized');
  await expressLoader( app );
  console.dir('Express Intialized');

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
}