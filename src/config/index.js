const dotenv = require('dotenv');
// config() 将读取您的 .env 文件，解析其中的内容并将其分配给 process.env
dotenv.config();

module.exports = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),
  
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
}