const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

// 模拟 alert 函数
global.alert = jest.fn();

// 模拟浏览器环境
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// 在 describe 块之前添加这段代码
beforeAll(() => {
  // 创建必要的 DOM 元素
  document.body.innerHTML = `
    <div id="allTeamworkList"></div>
    <div id="myTeamworkList"></div>
  `;
});

// 导入 teamworks.js 文件
require('../scripts/teamworks.js');

// 确保 displayTeamworks 函数被正确地赋值给 global 对象
global.displayTeamworks = global.displayTeamworks || window.displayTeamworks;

describe('displayTeamworks function', () => {
  // 每个测试之前重置 teamworks 和 currentUser
  beforeEach(() => {
    global.teamworks = [
      {
        id: 1,
        name: "测试作业1",
        content: "这是测试作业1",
        status: '未完成',
        requiredMembers: 2,
        creator: { id: 1, name: "张三" },
        submissions: [],
        members: []
      },
      {
        id: 2,
        name: "测试作业2",
        content: "这是测试作业2",
        status: '未完成',
        requiredMembers: 3,
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

  test('显示所有作业', () => {
    global.displayTeamworks(global.teamworks, 'allTeamworkList');
    const container = document.getElementById('allTeamworkList');
    expect(container.children.length).toBe(2);
    expect(container.innerHTML).toContain('测试作业1');
    expect(container.innerHTML).toContain('测试作业2');
  });

  test('显示空作业列表', () => {
    global.displayTeamworks([], 'allTeamworkList');
    const container = document.getElementById('allTeamworkList');
    expect(container.children.length).toBe(1);
    expect(container.innerHTML).toContain('没有找到匹配的作业');
  });

  test('显示我的作业', () => {
    const myTeamworks = global.teamworks.filter(teamwork => 
      teamwork.creator.id === global.currentUser.id || 
      teamwork.members.some(member => member.id === global.currentUser.id)
    );
    global.displayTeamworks(myTeamworks, 'myTeamworkList');
    const container = document.getElementById('myTeamworkList');
    expect(container.children.length).toBe(1);
    expect(container.innerHTML).toContain('测试作业1');
  });

  test('处理不存在的容器', () => {
    global.displayTeamworks(global.teamworks, 'nonExistentContainer');
    // 这里我们期望函数不会抛出错误，而是静默失败
    expect(true).toBe(true);
  });
});/*测试逻辑：
环境设置：
导入必要的模块和设置全局变量。
使用 JSDOM 模拟浏览器环境。
创建必要的 DOM 元素（allTeamworkList 和 myTeamworkList）。
导入 teamworks.js 文件。
测试套件设置：
使用 describe 块来组织 displayTeamworks 函数的所有测试。
在每个测试前（beforeEach）重置 teamworks 数组和 currentUser 对象，确保每个测试都有一个干净的起点。
测试用例：
a. 显示所有作业：
调用 displayTeamworks 函数，传入所有作业和 'allTeamworkList' 容器。
检查 'allTeamworkList' 容器中的子元素数量是否正确。
验证容器的 HTML 内容是否包含所有作业的名称。
b. 显示空作业列表：
调用 displayTeamworks 函数，传入空数组和 'allTeamworkList' 容器。
检查容器中是否只有一个子元素（应该是"没有找到匹配的作业"的消息）。
验证容器的 HTML 内容是否包含预期的无结果消息。
c. 显示我的作业：
根据当前用户筛选出"我的作业"。
调用 displayTeamworks 函数，传入筛选后的作业和 'myTeamworkList' 容器。
检查 'myTeamworkList' 容器中的子元素数量是否正确。
验证容器的 HTML 内容是否包含当前用户创建的作业名称。
d. 处理不存在的容器：
调用 displayTeamworks 函数，传入一个不存在的容器 ID。
验证函数不会抛出错误，而是静默失败。
断言逻辑：
使用 expect 函数来进行断言。
检查元素数量使用 toBe 匹配器。
检查 HTML 内容使用 toContain 匹配器，查找特定的字符串。
5. 错误处理：
测试函数在异常情况下（如容器不存在）的行为。 */