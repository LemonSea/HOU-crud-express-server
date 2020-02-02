# 简介

crud-server 是一个 node.js server，目前已完成了核心骨架。

该系统使用 Express 进行 server 构建。
数据库选用 MongoDB，连接工具使用 Mongoose。

- 已配置 token。
- 已完成用户验证。
- 已完成数据库连接。
- 已完成输出项。
- 已完成用户密码加密和比对。
- 已完成路由模块。
- 已完成模型构建。
- 已完成数据接收验证。

- 待完成模型接口
- 待完成数据接收验证封装
- 待完成长期 job

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
