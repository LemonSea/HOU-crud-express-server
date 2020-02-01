const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  gender: {
      type: Number,
      enum: [0, 1],
      default: 0
  },
  age: {
      type: Number,
  },
  phone: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  }
})

// 直接导出模型构造函数
module.exports = mongoose.model('User', User);