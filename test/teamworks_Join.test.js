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

// 确保 joinTeamwork 函数被正确地赋值给 global 对象
global.joinTeamwork = global.joinTeamwork || window.joinTeamwork;

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
    // 注意：这个测试可能需要修改，因为原始代码可能没有处理不存在的作业的情况
  });
});