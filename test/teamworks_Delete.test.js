const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

// 模拟 alert 和 confirm 函数
global.alert = jest.fn();
global.confirm = jest.fn();

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

// 确保 deleteTeamwork 函数被正确地赋值给 global 对象
global.deleteTeamwork = global.deleteTeamwork || window.deleteTeamwork;

describe('deleteTeamwork function', () => {
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
      role: "tutor"
    };

    // 清除之前的模拟调用
    jest.clearAllMocks();
  });

  // 模拟 displayTeamworks 函数
  global.displayTeamworks = jest.fn();

  test('导师可以删除自己创建的作业', () => {
    global.confirm.mockReturnValue(true);
    global.deleteTeamwork(1);
    expect(global.teamworks.length).toBe(1);
    expect(global.teamworks[0].id).toBe(2);
    expect(global.displayTeamworks).toHaveBeenCalledTimes(2);
  });

  test('导师不能删除其他人创建的作业', () => {
    global.deleteTeamwork(2);
    expect(global.teamworks.length).toBe(2);
    expect(global.alert).toHaveBeenCalledWith('只有作业的创建者（导师）可以删除作业。');
  });

  test('学生不能删除作业', () => {
    global.currentUser.role = 'student';
    global.deleteTeamwork(1);
    expect(global.teamworks.length).toBe(2);
    expect(global.alert).toHaveBeenCalledWith('只有作业的创建者（导师）可以删除作业。');
  });

  test('用户取消删除操作', () => {
    global.confirm.mockReturnValue(false);
    global.deleteTeamwork(1);
    expect(global.teamworks.length).toBe(2);
    expect(global.displayTeamworks).not.toHaveBeenCalled();
  });

  test('尝试删除不存在的作业', () => {
    global.deleteTeamwork(999);
    expect(global.teamworks.length).toBe(2);
    expect(global.alert).toHaveBeenCalledWith('只有作业的创建者（导师）可以删除作业。');
  });
});
/*测试逻辑：语句覆盖
判定覆盖
条件覆盖
路径覆盖（测试不同的删除场景）
错误推测（测试不存在的作业）
。
1. 导师可以删除自己创建的作业
2. 导师不能删除其他人创建的作业
3. 学生不能删除作业
4. 用户取消删除操作
5. 尝试删除不存在的作业
*/