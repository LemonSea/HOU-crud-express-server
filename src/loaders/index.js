const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const Logger = require('./logger');
const Global = require('./global');

module.exports = async ( app ) => {
  // 这里这样写，是为了以后的重复任务进行扩展
  const mongoConnection = await mongooseLoader();

  // 加载全局函数
  Global()
  
  Logger.info('✌️ DB loaded and connected!');
  await expressLoader( app );
  Logger.info('✌️ Express loaded');

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
}