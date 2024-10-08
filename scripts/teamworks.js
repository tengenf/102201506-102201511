(function() {
    // 判断运行环境
    const isNode = typeof window === 'undefined';
    const globalObject = isNode ? global : window;

    // 设置全局变量
    globalObject.currentUser = {
        id: 1,
        name: "张三",
        role: "student" // 可以是 'tutor' 或 'student'
    };

    // 作业状态
    const TEAMWORK_STATUSES = ['未完成', '已完成'];

    // 将 teamworks 设为全局变量
    globalObject.teamworks = [
        {
            id: 1,
            name: "数据结构课程设计",
            content: "实现一个基于红黑树的键值存储系统",
            status: '未完成',
            requiredMembers: 3,
            creator: { id: 1, name: "张三" },
            submissions: [],
            members: []
        },
        {
            id: 2,
            name: "机器学习实践",
            content: "使用深度学习方法解决图像分类问题",
            status: '未完成',
            requiredMembers: 2,
            creator: { id: 2, name: "李四" },
            submissions: [],
            members: []
        }
    ];

    // 将需要在测试中访问的函数添加到全局对象
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

    function createTeamworkElement(teamwork, containerType) {
        const teamworkDiv = document.createElement('div');
        teamworkDiv.className = 'teamwork';
        teamworkDiv.innerHTML = `
            <h3>${teamwork.name}</h3>
            <p>${teamwork.content}</p>
            <p>状态: ${teamwork.status}</p>
            <p>所需人数: ${teamwork.requiredMembers}</p>
            <p>创建者: ${teamwork.creator.name}</p>
            <p>当前成员数: ${teamwork.members ? teamwork.members.length : 0}</p>
            <div class="teamwork-actions">
                ${getActionButton(teamwork, containerType)}
                ${globalObject.currentUser.role === 'tutor' && globalObject.currentUser.id === teamwork.creator.id ? 
                    `<button onclick="deleteTeamwork(${teamwork.id})">删除作业</button>` : ''}
                <button onclick="viewTeamwork(${teamwork.id})">查看详情</button>
            </div>
        `;

        return teamworkDiv;
    }

    function getActionButton(teamwork, containerType) {
        if (globalObject.currentUser.role === 'student' && containerType === 'allTeamworkList') {
            if (!teamwork.members || !teamwork.members.some(member => member.id === globalObject.currentUser.id)) {
                return `<button onclick="joinTeamwork(${teamwork.id})">加入作业</button>`;
            } else {
                return '<button disabled>已加入</button>';
            }
        }
        return '';
    }

    globalObject.renderTeamworkManagement = function() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="container">
                <h2>团队作业管理</h2>
                <div class="teamwork-controls">
                    ${globalObject.currentUser.role === 'tutor' ? '<button id="createTeamwork" class="btn-primary">创建新作业</button>' : ''}
                    <input type="text" id="teamworkSearch" placeholder="搜索作业...">
                </div>
                <div id="teamworkManagement">
                    <div id="allTeamworks">
                        <h3>所有作业</h3>
                        <div id="allTeamworkList"></div>
                    </div>
                    <div id="myTeamworks">
                        <h3>我的作业</h3>
                        <div id="myTeamworkList"></div>
                    </div>
                </div>
            </div>
        `;

        if (globalObject.currentUser.role === 'tutor') {
            document.getElementById('createTeamwork').addEventListener('click', globalObject.showCreateTeamworkModal);
        }

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
    };

    globalObject.deleteTeamwork = function(teamworkId) {
        const teamwork = globalObject.teamworks.find(t => t.id === teamworkId);
        if (teamwork && globalObject.currentUser.role === 'tutor' && globalObject.currentUser.id === teamwork.creator.id) {
            if (confirm('确定要删除这个作业吗？')) {
                globalObject.teamworks = globalObject.teamworks.filter(t => t.id !== teamworkId);
                globalObject.displayTeamworks(globalObject.teamworks, 'allTeamworkList');
                globalObject.displayTeamworks(globalObject.teamworks.filter(teamwork => 
                    teamwork.creator.id === globalObject.currentUser.id || 
                    teamwork.members.some(member => member.id === globalObject.currentUser.id)
                ), 'myTeamworkList');
            }
        } else {
            alert('只有作业的创建者（导师）可以删除作业。');
        }
    };

    globalObject.viewTeamwork = function(teamworkId) {
        const teamwork = globalObject.teamworks.find(t => t.id === teamworkId);
        if (teamwork) {
            alert(`
                作业名称: ${teamwork.name}
                描述: ${teamwork.content}
                状态: ${teamwork.status}
                所需人数: ${teamwork.requiredMembers}
                创建者: ${teamwork.creator.name}
                当前成员: ${teamwork.members.map(m => m.name).join(', ')}
            `);
        }
    };

    globalObject.showCreateTeamworkModal = function() {
        if (isNode) return; // 在 Node 环境中不执行 DOM 操作

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>创建新作业</h2>
                <input type="text" id="teamworkName" placeholder="作业名称">
                <textarea id="teamworkContent" placeholder="作业内容"></textarea>
                <input type="number" id="requiredMembers" placeholder="所需人数">
                <button id="createTeamworkButton">创建</button>
                <button id="cancelButton">取消</button>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('createTeamworkButton').onclick = () => {
            const name = document.getElementById('teamworkName').value;
            const content = document.getElementById('teamworkContent').value;
            const requiredMembers = parseInt(document.getElementById('requiredMembers').value);
            globalObject.createTeamwork(name, content, requiredMembers);
            document.body.removeChild(modal);
        };

        document.getElementById('cancelButton').onclick = () => {
            document.body.removeChild(modal);
        };

        modal.style.display = 'block';
    };

    globalObject.createTeamwork = function(name, content, requiredMembers) {
        if (globalObject.currentUser.role !== 'tutor') {
            alert('只有导师可以创建作业。');
            return;
        }

        const newTeamwork = {
            id: globalObject.teamworks.length + 1,
            name,
            content,
            status: '未完成',
            requiredMembers,
            creator: { id: globalObject.currentUser.id, name: globalObject.currentUser.name },
            submissions: [],
            members: []
        };

        globalObject.teamworks.push(newTeamwork);
        if (!isNode) {
            globalObject.displayTeamworks(globalObject.teamworks, 'allTeamworkList');
            globalObject.displayTeamworks(globalObject.teamworks.filter(teamwork => 
                teamwork.creator.id === globalObject.currentUser.id || 
                teamwork.members.some(member => member.id === globalObject.currentUser.id)
            ), 'myTeamworkList');
        }
    };

    // 初始化函数
    function initTeamworks() {
        globalObject.renderTeamworkManagement();
        globalObject.displayTeamworks(globalObject.teamworks, 'allTeamworkList');
        globalObject.displayTeamworks(globalObject.teamworks.filter(teamwork => 
            teamwork.creator.id === globalObject.currentUser.id || 
            teamwork.members.some(member => member.id === globalObject.currentUser.id)
        ), 'myTeamworkList');
    }

    // 确保在页面加载完成后调用初始化函数
    if (!isNode) {
        document.addEventListener('DOMContentLoaded', initTeamworks);
    }

    // 为了在全局范围内访问这些函数，我们需要将它们添加到 window 对象
    if (!isNode) {
        window.joinTeamwork = globalObject.joinTeamwork;
        window.deleteTeamwork = globalObject.deleteTeamwork;
        window.viewTeamwork = globalObject.viewTeamwork;
        window.showCreateTeamworkModal = globalObject.showCreateTeamworkModal;
        window.createTeamwork = globalObject.createTeamwork;
        window.applyForTeamwork = globalObject.applyForTeamwork;
    }
})();