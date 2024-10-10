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
});/*测试逻辑：语句覆盖
判定覆盖
条件覆盖（测试不同的显示条件）
边界值分析（测试空列表）
错误推测（测试不存在的容器）

a. 显示所有作业：
b. 显示空作业列表：
c. 显示我的作业：
d. 处理不存在的容器：
 */