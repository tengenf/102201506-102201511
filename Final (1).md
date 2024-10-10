本作业属于哪个课程|https://edu.cnblogs.com/campus/fzu/SE2024
:-|:-:|
本作业要求博客链接|https://edu.cnblogs.com/campus/fzu/SE2024/homework/13281
结对同学博客链接|
github仓库地址|[将军走此小道](https://github.com/Socra1/102201506-102201511)
# 目录
- [目录](#目录)
- [1.具体分工](#1具体分工)
- [2.PSP表格](#2psp表格)
- [3.解题思路描述与设计实现说明](#3解题思路描述与设计实现说明)
  - [1.团队作业功能的实现思路如下：](#1团队作业功能的实现思路如下)
  - [2.关键实现的流程图](#2关键实现的流程图)
  - [3.贴出你认为重要的/有价值的代码片段，并解释：](#3贴出你认为重要的有价值的代码片段并解释)
    - [1. 用户信息获取函数：](#1-用户信息获取函数)
    - [2.作业显示函数：](#2作业显示函数)
    - [3.作业加入函数：](#3作业加入函数)
    - [4.搜索功能实现：](#4搜索功能实现)
- [4.附加特点设计与展示](#4附加特点设计与展示)
  - [1.设计的创意独到之处，这个设计的意义](#1设计的创意独到之处这个设计的意义)
  - [2.实现思路](#2实现思路)
  - [3.我认为重要的/有价值的代码片段与解释](#3我认为重要的有价值的代码片段与解释)
  - [4.成果展示](#4成果展示)
- [5.目录说明和使用说明](#5目录说明和使用说明)
  - [1.目录的组织](#1目录的组织)
  - [目录说明](#目录说明)
    - [styles/ 目录](#styles-目录)
    - [scripts/ 目录](#scripts-目录)
    - [pages/ 目录](#pages-目录)
    - [images/图片](#images图片)
  - [2.如何运行](#2如何运行)
    - [方法一：](#方法一)
    - [方法二：](#方法二)
- [6.单元测试](#6单元测试)
  - [1.单元测试简易教程](#1单元测试简易教程)
  - [2.部分单元测试代码](#2部分单元测试代码)
  - [3.单元测试的思路](#3单元测试的思路)
- [7.Github的代码签入记录截图](#7github的代码签入记录截图)
- [8.遇到的代码模块异常或结对困难及解决方法](#8遇到的代码模块异常或结对困难及解决方法)
  - [1.问题描述](#1问题描述)
  - [2.做过哪些尝试](#2做过哪些尝试)
  - [3.是否解决](#3是否解决)
  - [4.有何收获](#4有何收获)
- [9.对队友的评价](#9对队友的评价)
  - [1.值得学习的地方](#1值得学习的地方)
  - [2.需要改进的地方](#2需要改进的地方)


# 1.具体分工
|       刘宇杰         |  李海锋      | 
|--------------------|------------------|
| 提供主要设计思路     | 后期界面的美化及导航栏的改进  |
| 页面的初始化搭建     |  日历功能的渲染和优化 |
|页面交互功能的实现    | 项目管理页面部分功能优化 | 
| 完成测试案例        |   后期代码的合并| 
|   博客流程图的绘制       |   |                  

# 2.PSP表格
| PSP2.1 | Personal Software Process Stages | 预估耗时（分钟） | 实际耗时（分钟） |
|-----------------------------------------------|------------------------------------------------|-----------------|-----------------|
| Planning | 计划 | 30 |100 |
| Estimate | 估计这个任务需要多少时间 | 20 |40 |
| Development | 开发 | 420 |450 |
| Analysis | 需求分析 (包括学习新技术) | 240 |320 |
| Design Spec | 生成设计文档 | 45 |30 |
| Design Review | 设计复审 | 30 |15 |
| Coding Standard | 代码规范 (为目前的开发制定合适的规范) | 15 |40 |
| Design | 具体设计 | 60 |120 |
| Coding | 具体编码 | 120 |260 |
| Code Review | 代码复审 | 45 |40 |
| Test | 测试（自我测试，修改代码，提交修改） | 120 |180 |
| Reporting | 报告 | 60 |70 |
| Test Report | 测试报告 | 30 |30 |
| Size Measurement | 计算工作量 | 15 |10 |
| Postmortem & Process Improvement Plan | 事后总结, 并提出过程改进计划 | 30 |60 |
| 合计 | | 1280 |1765  |
# 3.解题思路描述与设计实现说明
(以花时间最多的团队作业功能为例子)
## 1.团队作业功能的实现思路如下：

**1.用户认证与角色管理：**
- 实现 getCurrentUser 函数，从 localStorage 获取用户信息，确保在不同页面间保持用户状态。
- 根据用户角色（学生/导师）动态显示不同的功能和界面元素。
  
**2.作业数据管理：**
- 使用全局变量 teamworks 存储所有作业信息。
- 实现 CRUD（创建、读取、更新、删除）操作来管理作业数据。
  
**3.界面渲染：**
- 创建 renderTeamworkManagement 函数，根据用户角色渲染不同的作业管理界面。
- 使用 displayTeamworks 函数动态显示作业列表，支持筛选和搜索功能。
  
**4.交互功能：**
- 实现作业创建、加入、查看和删除等功能，根据用户角色限制操作权限。
- 使用模态框进行作业创建，提高用户体验。
  
**5. 搜索和筛选：**
- 实现实时搜索功能，根据用户输入过滤显示的作业列表。
  
**6.环境适配：**
- 使用条件语句区分浏览器和 Node.js 环境，确保代码在两种环境下都能正常运行。
  
**7. 模块化和封装：**
- 使用立即执行函数表达式（IIFE）封装代码，避免全局命名空间污染。
- 将关键函数挂载到全局对象，便于外部访问和测试。
## 2.关键实现的流程图
以下是团队作业功能的关键实现流程图

![image](https://img2024.cnblogs.com/blog/3035968/202410/3035968-20241009215756025-201497324.png)

## 3.贴出你认为重要的/有价值的代码片段，并解释：
以teamworks.js为例：
### 1. 用户信息获取函数：
```
function getCurrentUser() {
    if (!isNode) {
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
            return JSON.parse(userJson);
        }
    }
    return {
        id: 1,
        name: "张三",
        role: "student"
    };
}
```
本函数：
实现了用户状态的持久化，通过 localStorage 存储用户信息。
- 提供了环境适配，在非浏览器环境下返回默认用户。
-  确保了用户信息的一致性，在整个应用中使用同一个来源获取用户信息

### 2.作业显示函数：
```
globalObject.displayTeamworks = function(teamworksToDisplay, containerType) {
    if (isNode) return;

    const container = document.getElementById(containerType);
    
    if (container) {
        container.innerHTML = '';

        if (teamworksToDisplay.length === 0) {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = '没有找到匹配的作业';
            noResultsMessage.className = 'no-results-message';
            container.appendChild(noResultsMessage);
        } else {
            teamworksToDisplay.forEach(teamwork => {
                const teamworkElement = createTeamworkElement(teamwork, containerType);
                container.appendChild(teamworkElement);
            });
        }
    }
};
```
本函数：
- 实现了动态渲染作业列表，支持不同类型的容器（如"所有作业"和"我的作业"）。
- 处理了空结果的情况，提供了用户友好的提示。
- 通过 createTeamworkElement 函数封装了单个作业元素的创建逻辑，提高了代码的可维护性。
### 3.作业加入函数：
```
globalObject.joinTeamwork = function(teamworkId) {
    const teamwork = globalObject.teamworks.find(t => t.id === teamworkId);
    if (teamwork && globalObject.currentUser.role === 'student') {
        if (!teamwork.members) {
            teamwork.members = [];
        }
        if (teamwork.members.length < teamwork.requiredMembers) {
            if (!teamwork.members.some(member => member.id === globalObject.currentUser.id)) {
                teamwork.members.push({
                    id: globalObject.currentUser.id,
                    name: globalObject.currentUser.name
                });
                if (!isNode) globalObject.displayTeamworks(globalObject.teamworks, 'allTeamworkList');
                globalObject.alert('您已成功加入作业!');
            } else {
                globalObject.alert('您已经是该作业的成员了。');
            }
        } else {
            globalObject.alert('该作业已达到所需人数上限。');
        }
    } else {
        globalObject.alert('只有学生可以加入作业。');
    }
};
```
本函数：
-  实现了作业加入的核心逻辑，包括权限检查、成员数量限制和重复加入检查。
- 提供了用户反馈，通过 alert 提示用户操作结果。
- 在操作成功后立即更新显示，保证了用户界面的实时性。    
### 4.搜索功能实现：
```
document.getElementById('teamworkSearch').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const filteredTeamworks = globalObject.teamworks.filter(teamwork => 
        teamwork.name.toLowerCase().includes(searchTerm) ||
        teamwork.content.toLowerCase().includes(searchTerm) ||
        teamwork.status.toLowerCase().includes(searchTerm)
    );
    globalObject.displayTeamworks(filteredTeamworks, 'allTeamworkList');
    globalObject.displayTeamworks(filteredTeamworks.filter(teamwork => 
        teamwork.creator.id === globalObject.currentUser.id || 
        teamwork.members.some(member => member.id === globalObject.currentUser.id)
    ), 'myTeamworkList');
});

``` 
本函数：
- 实现了实时搜索功能，根据用户输入过滤显示的作业列表。
- 在搜索结果发生变化时，动态更新两个列表的显示内容。
- 通过两次调用 displayTeamworks 函数，分别更新"所有作业"和"我的作业"列表。
- 提供了用户友好的搜索体验，通过实时反馈用户搜索结果。

# 4.附加特点设计与展示
## 1.设计的创意独到之处，这个设计的意义

**1. 单一界面，多角色适配：FZUteam 的作业管理系统在同一个界面中为不同角色（学生和导师）提供不同的功能和视图，而不是为每个角色创建单独的页面。**

 设计的意义：
- 提高用户体验：用户可以在同一界面完成所有操作，减少了页面跳转和学习成本。
- 增强系统灵活性：适应现代教育环境中角色多变的需求（如助教既是学生又是导师）。

**2.日历系统的实现**
 设计的意义：
- 适应性：日历设计为适应不同的屏幕尺寸，无论是在桌面还是移动设备上都能提供良好的用户体验。
- 事件列表：日历旁边有一个事件侧边栏，列出了所有事件的标题和日期，使得用户能够快速浏览即将发生的事件。
- 事件标题：在日历的每一天下面，如果有事件，会显示事件的标题，这样用户就可以在查看日历时快速了解当天的安排。
## 2.实现思路
1.单一界面，多角色适配
- 使用 localStorage 存储用户信息和角色。
- 实现一个 updateCurrentUser 函数，在用户登录或切换角色时更新用户信息。
- 在页面加载和用户操作时检查当前用户角色，动态渲染相应的界面元素和功能。
- 使用事件委托处理不同角色的操作，确保正确的权限控制。

2.日历系统的实现
- 文档加载完成后，调用 renderNavigation、renderCalendar 和 loadEvents 函数初始化界面和数据。
- renderCalendarGrid 函数根据当前月份生成日历的日期网格。
- showAddEventModal 函数显示一个模态窗口，允许用户输入事件的详细信息。
- handleAddEvent 函数处理添加事件的逻辑。

## 3.我认为重要的/有价值的代码片段与解释
1.单一界面，多角色适配
```
function initTeamworks() {
    globalObject.currentUser = getCurrentUser(); // 确保使用最新的用户信息
    globalObject.renderTeamworkManagement();
    globalObject.displayTeamworks(globalObject.teamworks, 'allTeamworkList');
    globalObject.displayTeamworks(globalObject.teamworks.filter(teamwork => 
        teamwork.creator.id === globalObject.currentUser.id || 
        teamwork.members.some(member => member.id === globalObject.currentUser.id)
    ), 'myTeamworkList');
}
// 新增：更新用户信息的函数
globalObject.updateCurrentUser = function() {
    globalObject.currentUser = getCurrentUser();
    initTeamworks(); // 重新初始化以反映新的用户状态
};
```
  这段代码展示了如何实现动态角色适配。initTeamworks 函数在每次页面加载或用户角色变更时被调用，它会根据最新的用户信息重新渲染整个作业管理界面。updateCurrentUser 函数允许在用户切换角色时更新系统状态，确保界面始终反映当前用户的权限和视图。
2.日历系统的实现
```
function handleAddEvent(event) {
    event.preventDefault();
    const date = document.getElementById('eventDate').value;
    const title = document.getElementById('eventTitle').value;
    const description = document.getElementById('eventDescription').value;
    const newEvent = { date, title, description };

    if (!events.some(e => e.date === newEvent.date && e.title === newEvent.title)) {
        events.push(newEvent);
        renderCalendarGrid(new Date(currentYear, currentMonth));
        renderEventSidebar();
        document.body.removeChild(event.target.closest('.modal'));
    } else {
        console.log('事件已存在');
    }
}
```
这个函数处理添加新事件的逻辑。它从表单中获取事件的日期、标题和描述，检查是否已经存在具有相同日期和标题的事件，如果不存在，则将其添加到 events 数组中，并更新日历网格和事件侧边栏。
## 4.成果展示

**1.单一界面，多角色适配**
- 学生身份
![image](https://img2024.cnblogs.com/blog/3035968/202410/3035968-20241010220624544-407767794.png)

- 导师身份
![image](https://img2024.cnblogs.com/blog/3035968/202410/3035968-20241010221211854-597296121.png)

**2.日历系统的实现**
![image](https://img2024.cnblogs.com/blog/3035968/202410/3035968-20241010221334457-159534390.png)

# 5.目录说明和使用说明
## 1.目录的组织
```
SW_paring_work2
- │
- ├── index.html
- ├── styles/
- │   ├── calendar.css
- │   ├── chat.css
- │   ├── chat-detail.css
- │   ├── common.css
- │   ├── index.css
- │   ├── login.css
- │   ├── main.css
- │   ├── person.css
- │   ├── profile.css
- │   ├── projects.css
- │   ├── register.css
- │   ├── teams.css
- │   └── teamworks.css
- ├── scripts/
- │   ├── auth.js
- │   ├── calendar.js
- │   ├── chat.js
- │   ├── chat-detail.js
- │   ├── common.js
- │   ├── dashboard.js
- │   ├── index.js
- │    ├── login.js
- │   ├── main.js
- │   ├── profile.js
- │   ├── projects.js
- │   ├── register.js
- │   ├── teams.js
- │   └── teamworks.js
- ├── pages/
- │   ├── calendar.html
- │   ├── chat.html
- │   ├── chat-detail.html
- │   ├── dashboard.html
- │   ├── login.html
- │   ├── profile.html
- │   ├── project-list.html
- │   ├── register.html
- │   ├── team-management.html
- │   └── teamworks.html
- ├── images/
- │   ├── background.jpg
- │   ├── calendar_image.jpg
- │   ├── chat_images.png
- │   ├── images.jpg
- │   ├── me.png
- │   ├── person.png
- │   ├── project_images.jpg
- │   └── teamworks_image.jpg
```
## 目录说明

- `index.html`: 项目主页
- `styles/`: 存放所有 CSS 样式文件
- `scripts/`: 存放所有 JavaScript 脚本文件
- `pages/`: 存放除主页外的其他 HTML 页面

### styles/ 目录

包含各个页面和功能模块的样式文件：
- `calendar.css`:日历界面样式
- `chat.css`:聊天界面样式
- `chat-detail.css`:聊天窗口样式
- `index.css`:主页面样式
- `person.css`:个人界面样式
- `teamworks.css`:团队作业界面样式
- `main.css`: 主要样式
- `common.css`: 通用样式
- `login.css`: 登录页面样式
- `register.css`: 注册页面样式
- `profile.css`: 个人资料页面样式
- `projects.css`: 项目相关页面样式
- `teams.css`: 团队相关页面样式

### scripts/ 目录

包含各个功能模块的 JavaScript 文件：

- `teamworks.js`: 团队作业功能脚本
- `register.js`: 注册功能脚本
- `main.js`: 跳转主页面脚本
- `index.js`: 主页面脚本
- `chat-detail.js`: 聊天窗口脚本
- `login.js`: 登录功能脚本
- `auth.js`: 登录跳转脚本
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
- `chat-detail.html`:聊天窗口界面
- `teamworks.html`:团队作业界面
 
 ### images/图片

包含各个功能模块的所使用的图片和背景图片：

 - `background.jpg`:背景图片
 - `calendar_iamge.jpg`:日历界面背景图片
 - `chat_iamges.png`:聊天界面背景图片
 - `images.jpg`:团队管理界面背景图片
 - `me.png`:个人用户头像
 - `person.png`:聊天对象头像
 - `projiet_iamges.jpg`:项目管理头像
 - `teamworks_image.jpg`:团队作业管理背景图片
## 2.如何运行
### 方法一：

  **1.安装依赖:**
  首先，确保您的系统已安装 Node.js 和 npm（Node Package Manager）。然后在项目根目录下运行以下命令安装依赖：
  `npm install`
这将根据 package.json 文件安装所有必要的依赖。

**2.运行测试**：
如果您想运行单元测试，可以使用以下命令：
 `npm test`
 这将运行 test 目录下的所有测试文件。

**3.启动应用：**
使用一个简单的 HTTP 服务器。例如， Node.js 的 http-server 包:
 `npx http-server`
或者，如果您的 package.json 中定义了启动脚本，可以使用
 `npm start`

**4. 访问应用：**
启动服务器后，通常可以在浏览器中访问 http://localhost:8080 （或控制台输出的其他地址）来查看应用
### 方法二：
1. 安装Vscode中的LIVE server插件
  
2. 右键index.html用Live server打开
   
3. （可选）单元测试：
- 终端输入 `npm install`
- 终端输入 `npm test`
# 6.单元测试
## 1.单元测试简易教程
**1.选用的测试工具**
**本项目选用了 Jest 作为单元测试框架。**

它具有以下优点：

- 零配置：开箱即用，无需复杂的配置。
- 快速且并行：Jest 可以并行运行测试，提高测试效率。
- 内置覆盖率报告：无需额外工具即可生成代码覆盖率报告。
- 快照测试：方便对 UI 组件进行测试。
- 模拟功能强大：可以轻松模拟函数、模块和浏览器 API。

**2.如何学习的**

学习 Jest 的过程包括以下步骤：

- 阅读官方文档：Jest 官方文档提供了详细的 API 说明和使用示例。
- 观看视频教程：B站
- 实践练习：实践是最好的老师，从这次作业开始实践
- 观看相关文档：CSDN与知乎
- 询问AI并与队友交流探讨

**3.总结**

**Jest 是一个强大且易用的测试框架，适合 JavaScript 项目的单元测试。通过系统学习和实践，可以快速掌握 Jest 的使用方法，提高代码质量和可维护性。**

## 2.部分单元测试代码
```
describe('joinTeamwork function', () => {
  // 每个测试之前重置 teamworks 和 currentUser
  beforeEach(() => {
    global.teamworks = [
      {
        id: 1,
        name: "测试作业",
        content: "这是一个测试作业",
        status: '未完成',
        requiredMembers: 2,
        creator: { id: 2, name: "李四" },
        submissions: [],
        members: []
      }
    ];
    
    global.currentUser = {
      id: 1,
      name: "张三",
      role: "student"
    };

    // 清除之前的模拟调用
    jest.clearAllMocks();
  });

  // 在 beforeEach 中添加
  global.displayTeamworks = jest.fn();

  // 在 beforeEach 中添加
  global.createTeamworkElement = jest.fn().mockImplementation((teamwork) => {
    const div = document.createElement('div');
    div.innerHTML = `Mocked teamwork: ${teamwork.name}`;
    return div;
  });

  test('学生可以成功加入作业', () => {
    global.joinTeamwork(1);
    expect(global.teamworks[0].members.length).toBe(1);
    expect(global.teamworks[0].members[0].id).toBe(global.currentUser.id);
    expect(global.alert).toHaveBeenCalledWith('您已成功加入作业!');
  });

  test('学生不能重复加入同一作业', () => {
    global.joinTeamwork(1);
    global.joinTeamwork(1);
    expect(global.teamworks[0].members.length).toBe(1);
    expect(global.alert).toHaveBeenCalledWith('您已经是该作业的成员了。');
  });

  test('当作业达到人数上限时，学生不能加入', () => {
    const memberLimit = 2; // 明确设置上限
    global.teamworks[0].requiredMembers = memberLimit; // 设置作业的成员上限
    global.teamworks[0].members = Array(memberLimit).fill().map((_, index) => ({ id: index + 3, name: `成员${index + 1}` }));
    
    global.joinTeamwork(1);
    
    expect(global.teamworks[0].members.length).toBe(memberLimit);
    expect(global.teamworks[0].members.some(member => member.id === global.currentUser.id)).toBeFalsy();
    expect(global.alert).toHaveBeenCalledWith('该作业已达到所需人数上限。');
});

  test('导师不能加入作业', () => {
    global.currentUser.role = 'tutor';
    global.joinTeamwork(1);
    expect(global.teamworks[0].members.length).toBe(0);
    expect(global.alert).toHaveBeenCalledWith('只有学生可以加入作业。');
  });

  test('学生不能加入不存在的作业', () => {
    global.joinTeamwork(999);
    expect(global.teamworks[0].members.length).toBe(0);
  });
});
```
## 3.单元测试的思路
**1.测试数据的思路**
-  使用模拟数据：创建一个包含各种情况的模拟 `teamworks` 数组。
- 边界值测试：测试最小、最大和临界值的情况。
- 典型场景：覆盖常见的使用场景。
- 异常情况：测试错误输入和异常情况的处理


**2.如何考虑各种情况的**
- 正常流程测试：验证在正常情况下功能是否正确。
- 边界条件测试：测试极限情况，如空数组、最大成员数等。
- 错误处理测试：验证系统对无效输入的处理。
- 权限测试：确保不同角色（学生/导师）的权限控制正确。
- 状态变化测试：检查操作后系统状态的正确性。


**3.如何应对测试人员刁难**
- 先按照自己的理解对代码进行测试，再根据测试结果进行修改
- 询问AI看看是否有情况没有考虑到并新增测试
- 尽量完善文档，确保测试人能理解我的想法
- 开放态度：虚心接受建议，不断改进测试策略和方法。   

# 7.Github的代码签入记录截图
![image](https://img2024.cnblogs.com/blog/3035968/202410/3035968-20241009215728431-640312212.png)

# 8.遇到的代码模块异常或结对困难及解决方法
## 1.问题描述

在实现团队作业管理功能时，我们遇到了一个严重的异步操作问题。具体来说，当用户快速切换角色（如从学生切换到导师再切换回学生）时，页面上显示的作业列表和用户权限出现不同步的情况。这导致了错误的数据展示和潜在的安全风险，例如学生可能会短暂地看到或操作本应只有导师才能访问的功能。

## 2.做过哪些尝试

-  初步尝试：我们首先尝试在每次角色切换后强制刷新页面，但这种方法导致了糟糕的用户体验。
- 使用回调函数：我们尝试使用回调函数来确保角色切换完成后再更新界面，但这导致了回调地狱，使代码难以维护。

- 最终解决方案：
- 用户登录信息存储：
在用户成功登录后，将用户信息（包括角色）保存到 localStorage 中。

- 修改 getCurrentUser 函数：
更新函数以从 localStorage 获取用户信息，而不是使用硬编码的身份。

- 更新初始化流程：
修改 initTeamworks 函数，在页面加载时检查用户是否已登录。
如果用户未登录，提示用户并重定向到登录页面。

- 动态渲染界面：
基于获取到的用户角色信息，动态渲染相应的界面元素和功能。

- 添加用户信息更新机制：
创建 updateCurrentUser 函数，用于在用户登录状态改变时更新当前用户信息。

## 3.是否解决

是的，我们最终成功解决了这个问题。

## 4.有何收获

- 异步编程的重要性：我们深刻认识到在复杂的前端应用中正确处理异步操作的重要性。
- 用户体验至关重要：我们意识到性能优化和平滑的状态转换对用户体验的重要影响。
- 团队协作的力量：这个问题的解决过程中，我和队友通过头脑风暴和代码审查，共同找到了最佳解决方案。
- 持续学习的必要性：这个经历强调了在快速发展的前端技术领域中持续学习新概念和实践的重要性。

# 9.对队友的评价
## 1.值得学习的地方


## 2.需要改进的地方


