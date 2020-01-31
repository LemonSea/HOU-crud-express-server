# 简介

crud-server 是**家政预约服务平台**后台管理界面的服务端，包含针对后台服务的各项功能。

该服务端的初步构想是同时针对系统管理员，网站管理员，企业管理员的后台管理服务。

整个系统前端使用 React 构建单页引用程序，后端使用 Express 帮助我们简化 Node.js 的操作。数据库选用 MongoDB，连接工具使用 Mongoose。

# 写在前面

整个 Server 是我学习了 Node.js 的知识后做的第一个小案例，有很多不完善之处。

# 目录结构

```js
src
  │   app.js          # App 入口
  └───api             # Express route controllers for all the endpoints of the app
  └───config          # 环境变量和配置相关
  └───loaders         # 将启动过程拆分为模块
  └───models          # 数据库模型
  └───services        # 所有的业务逻辑应该在这里
  └───subscribers     # 异步任务的事件处理程序
```
