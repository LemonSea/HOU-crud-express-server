const Logger = require('./logger');

// 将常用的方法注册为全局变量
module.exports = () => {
  global.logger = Logger;

}