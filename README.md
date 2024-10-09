# FZUteam - 大学生团队协作平台
## 项目简介
FZUteam 是一个专为大学生设计的团队协作平台。该平台旨在提供一个综合性的解决方案，帮助学生更好地管理项目、组织团队、安排日程，并促进有效的沟通。
## 主要功能
### 用户管理
- 注册：学生和导师可以创建账户并检测账户格式是否合规
- 登录：用户可以登录
- 个人资料：用户可以查看和编辑个人信息
### 项目管理
- 创建项目：用户可以创建新的项目
- 搜索项目：用户可以搜索项目
- 项目列表：查看所有相关项目
- 项目详情：管理项目进度、任务和成员
### 团队管理
- 创建团队：用户可以组建新的团队
- 团队列表：查看已创建和加入的团队
- 成员管理：添加或移除团队成员
### 聊天功能
- 团队聊天：团队成员之间的即时通讯
- 私人聊天：用户之间的一对一交流
### 日程管理
- 日历视图：查看个人和团队事件
- 添加事件：创建新的日程安排

### 作业管理
- 创建作业：教师可以发布作业任务
- 提交作业：学生可以上传完成的作业
- 删除作业：教师可以删除已发布的作业
## 运行项目


- 使用 Node.js 的 http-server：
打开命令行，导航到项目文件夹
运行命令 http-server
在浏览器中访问命令行显示的地址（通常是 http://localhost:8080）
## 技术栈
前端：JavaScript CSS HTML
## 安装与运行
- 克隆仓库到本地
- 使用支持的网络服务器（如 Live Server）打开 index.html 文件
- 浏览器中访问相应的本地地址即可查看项目
## 项目结构

FZUteam/
│
├── index.html
├── styles/
│ ├── main.css
│ ├── common.css
│ ├── login.css
│ ├── register.css
│ ├── profile.css
│ ├── projects.css
│ └── teams.css
│
├── scripts/
│ ├── common.js
│ ├── login.js
│ ├── register.js
│ ├── profile.js
│ ├── dashboard.js
│ ├── projects.js
│ ├── teams.js
│ ├── chat.js
│ └── calendar.js
│
└── pages/
├── login.html
├── register.html
├── dashboard.html
├── project-list.html
├── team-management.html
├── chat.html
├── calendar.html
└── profile.html
## 目录说明

- `index.html`: 项目主页
- `styles/`: 存放所有 CSS 样式文件
- `scripts/`: 存放所有 JavaScript 脚本文件
- `pages/`: 存放除主页外的其他 HTML 页面

### styles/ 目录

包含各个页面和功能模块的样式文件：

- `main.css`: 主要样式
- `common.css`: 通用样式
- `login.css`: 登录页面样式
- `register.css`: 注册页面样式
- `profile.css`: 个人资料页面样式
- `projects.css`: 项目相关页面样式
- `teams.css`: 团队相关页面样式

### scripts/ 目录

包含各个功能模块的 JavaScript 文件：

- `common.js`: 通用脚本
- `login.js`: 登录功能脚本
- `register.js`: 注册功能脚本
- `profile.js`: 个人资料管理脚本
- `dashboard.js`: 仪表板功能脚本
- `projects.js`: 项目管理脚本
- `teams.js`: 团队管理脚本
- `chat.js`: 聊天功能脚本
- `calendar.js`: 日历功能脚本

### pages/ 目录

包含除主页外的其他 HTML 页面：

- `login.html`: 登录页面
- `register.html`: 注册页面
- `dashboard.html`: 仪表板页面
- `project-list.html`: 项目列表页面
- `team-management.html`: 团队管理页面
- `chat.html`: 聊天页面
- `calendar.html`: 日历页面
- `profile.html`: 个人资料页面
## 贡献指南
我们欢迎所有形式的贡献，包括但不限于：
- 报告 bug
- 提出新功能建议
- 改进文档
- 提交代码修复或新功能

请遵循以下步骤：
- Fork 本仓库
- 创建您的特性分支 (git checkout -b feature/AmazingFeature)
- 提交您的更改 (git commit -m 'Add some AmazingFeature')
- 将您的更改推送到分支 (git push origin feature/AmazingFeature)
- 打开一个 Pull Request
## 联系方式
如有任何问题或建议，请通过以下方式联系我们：

项目负责人：刘宇杰、李海锋

邮箱：[刘宇杰](mailto:1914998683@qq.com)、[李海锋](mailto:3071442121@qq.com)

项目 GitHub 地址：[GitHub仓库地址](https://github.com/Socra1/102201506-102201511)

