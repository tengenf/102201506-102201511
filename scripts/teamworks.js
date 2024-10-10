// 将 teamworks 和 currentUser 设为全局变量
currentUser = {
    id: 1,
    name: "张三",
    role: "tutor" // 可以是 'tutor' 或 'student'
};

// 作业状态
const TEAMWORK_STATUSES = ['未完成', '已完成'];

// 将 teamworks 设为全局变量
let teamworks = [
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

document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();
    renderTeamworkManagement();
    loadTeamworks();
});

function renderNavigation() {
    // ... (保持原有的导航渲染逻辑)
}

function renderTeamworkManagement() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="teamwork-management">
            <h2>团队作业管理</h2>
            <div class="teamwork-controls">
                ${currentUser.role === 'tutor' ? `<button id="createTeamwork" class="btn-primary">发布新作业</button>` : ''}
                <input type="text" id="teamworkSearch" placeholder="搜索作业...">
            </div>
            <div class="teamwork-lists">
                <div class="all-teamworks">
                    <h3>所有作业</h3>
                    <div id="allTeamworkList" class="teamwork-grid"></div>
                </div>
                <div class="my-teamworks">
                    <h3>我的作业</h3>
                    <div id="myTeamworkList" class="teamwork-grid"></div>
                </div>
            </div>
        </div>
    `;

    if (currentUser.role === 'tutor') {
        document.getElementById('createTeamwork').addEventListener('click', showCreateTeamworkModal);
    }
    document.getElementById('teamworkSearch').addEventListener('input', handleTeamworkSearch);
}

function loadTeamworks() {
    displayTeamworks(teamworks);
}

function displayTeamworks(teamworksToDisplay) {
    const allTeamworkList = document.getElementById('allTeamworkList');
    const myTeamworkList = document.getElementById('myTeamworkList');
    
    if (allTeamworkList) allTeamworkList.innerHTML = '';
    if (myTeamworkList) myTeamworkList.innerHTML = '';

    teamworksToDisplay.forEach(teamwork => {
        const teamworkElement = createTeamworkElement(teamwork);
        if (allTeamworkList) allTeamworkList.appendChild(teamworkElement.cloneNode(true));
        
        if (currentUser.role === 'tutor' && teamwork.creator.id === currentUser.id) {
            if (myTeamworkList) myTeamworkList.appendChild(teamworkElement);
        } else if (currentUser.role === 'student' && teamwork.submissions.some(sub => sub.studentId === currentUser.id)) {
            if (myTeamworkList) myTeamworkList.appendChild(teamworkElement);
        }
    });
}

function createTeamworkElement(teamwork) {
    const teamworkElement = document.createElement('div');
    teamworkElement.className = 'teamwork-item';
    teamworkElement.dataset.id = teamwork.id;

    // 使用模板字符串创建 HTML 内容
    teamworkElement.innerHTML = `
        <h3>${teamwork.name}</h3>
        <p>${teamwork.content}</p>
        <p>状态: ${teamwork.status}</p>
        <p>所需人数: ${teamwork.requiredMembers}</p>
        <p>创建者: ${teamwork.creator.name}</p>
    `;

    // 根据用户角色和作业状态添加不同的按钮
    if (currentUser.role === 'student') {
        if (!teamwork.members.some(member => member.id === currentUser.id)) {
            const joinButton = document.createElement('button');
            joinButton.textContent = '加入作业';
            joinButton.onclick = () => joinTeamwork(teamwork.id);
            teamworkElement.appendChild(joinButton);
        } else {
            const leaveButton = document.createElement('button');
            leaveButton.textContent = '退出作业';
            leaveButton.onclick = () => leaveTeamwork(teamwork.id);
            teamworkElement.appendChild(leaveButton);
        }

        if (teamwork.status === '未完成') {
            const submitButton = document.createElement('button');
            submitButton.textContent = '提交作业';
            submitButton.onclick = () => submitTeamwork(teamwork.id);
            teamworkElement.appendChild(submitButton);
        }
    } else if (currentUser.role === 'tutor' && teamwork.creator.id === currentUser.id) {
        const changeStatusButton = document.createElement('button');
        changeStatusButton.textContent = '更改状态';
        changeStatusButton.onclick = () => changeTeamworkStatus(teamwork.id);
        teamworkElement.appendChild(changeStatusButton);
    }

    return teamworkElement;
}

function showCreateTeamworkModal() {
    const teamworkName = prompt('请输入作业名称:');
    if (teamworkName) {
        const teamworkContent = prompt('请输入作业内容:');
        const requiredMembers = prompt('请输入所需人数:');
        createTeamwork(teamworkName, teamworkContent, parseInt(requiredMembers));
    }
}

function createTeamwork(name, content, requiredMembers) {
    const newTeamwork = {
        id: Date.now(),
        name,
        content,
        status: '未完成',
        requiredMembers,
        creator: currentUser,
        submissions: [],
        members: []
    };
    teamworks.push(newTeamwork);
    displayTeamworks(teamworks);
    alert('新作业已发布!');
}

function viewTeamwork(teamworkId) {
    const teamwork = teamworks.find(t => t.id === teamworkId);
    if (teamwork) {
        alert(`
            作业名称: ${teamwork.name}
            内容: ${teamwork.content}
            状态: ${teamwork.status}
            所需人数: ${teamwork.requiredMembers}
            创建者: ${teamwork.creator.name}
            提交数: ${teamwork.submissions.length}
        `);
    }
}

function editTeamwork(teamworkId) {
    const teamwork = teamworks.find(t => t.id === teamworkId);
    if (teamwork && teamwork.creator.id === currentUser.id) {
        const newName = prompt('请输入新的作业名称:', teamwork.name);
        if (newName) {
            const newContent = prompt('请输入新的作业内容:', teamwork.content);
            const newRequiredMembers = prompt('请输入新的所需人数:', teamwork.requiredMembers);
            teamwork.name = newName;
            teamwork.content = newContent;
            teamwork.requiredMembers = parseInt(newRequiredMembers);
            displayTeamworks(teamworks);
            alert('作业信息已更新!');
        }
    } else {
        alert('只有作业创建者可以编辑作业信息。');
    }
}

function deleteTeamwork(teamworkId) {
    const teamwork = teamworks.find(t => t.id === teamworkId);
    if (teamwork && teamwork.creator.id === currentUser.id) {
        if (confirm('确定要删除这个作业吗?')) {
            teamworks = teamworks.filter(t => t.id !== teamworkId);
            displayTeamworks(teamworks);
            alert('作业已删除!');
        }
    } else {
        alert('只有作业创建者可以删除作业。');
    }
}

function changeTeamworkStatus(teamworkId) {
    const teamwork = teamworks.find(t => t.id === teamworkId);
    if (teamwork && teamwork.creator.id === currentUser.id) {
        const currentIndex = TEAMWORK_STATUSES.indexOf(teamwork.status);
        teamwork.status = TEAMWORK_STATUSES[(currentIndex + 1) % TEAMWORK_STATUSES.length];
        displayTeamworks(teamworks);
        alert(`作业状态已更改为: ${teamwork.status}`);
    } else {
        alert('只有作业创建者可以更改作业状态。');
    }
}

function submitTeamwork(teamworkId) {
    const teamwork = teamworks.find(t => t.id === teamworkId);
    if (teamwork && currentUser.role === 'student') {
        const submission = prompt('请输入您的作业提交内容:');
        if (submission) {
            teamwork.submissions.push({
                studentId: currentUser.id,
                studentName: currentUser.name,
                content: submission,
                submissionTime: new Date().toISOString()
            });
            displayTeamworks(teamworks);
            alert('作业已提交!');
        }
    } else {
        alert('只有学生可以提交作业。');
    }
}

function handleTeamworkSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    if (searchTerm === '') {
        displayTeamworks(teamworks);
    } else {
        const filteredTeamworks = teamworks.filter(teamwork => 
            teamwork.name.toLowerCase().includes(searchTerm) ||
            teamwork.content.toLowerCase().includes(searchTerm) ||
            teamwork.status.toLowerCase().includes(searchTerm)
        );
        displayTeamworks(filteredTeamworks);
    }
}

// 将 joinTeamwork 函数设为全局可访问
joinTeamwork = function(teamworkId) {
    const teamwork = teamworks.find(t => t.id === teamworkId);
    if (teamwork && currentUser.role === 'student') {
        if (!teamwork.members) {
            teamwork.members = [];
        }
        if (teamwork.members.length < teamwork.requiredMembers) {
            if (!teamwork.members.some(member => member.id === currentUser.id)) {
                teamwork.members.push({
                    id: currentUser.id,
                    name: currentUser.name
                });
                displayTeamworks(teamworks);
                alert('您已成功加入作业!');
            } else {
                alert('您已经是该作业的成员了。');
            }
        } else {
            alert('该作业已达到所需人数上限。');
        }
    } else {
        alert('只有学生可以加入作业。');
    }
};

function leaveTeamwork(teamworkId) {
    const teamwork = teamworks.find(t => t.id === teamworkId);
    if (teamwork && teamwork.members && teamwork.members.some(member => member.id === currentUser.id)) {
        if (confirm('确定要退出这个作业吗?')) {
            teamwork.members = teamwork.members.filter(member => member.id !== currentUser.id);
            displayTeamworks(teamworks);
            alert('您已退出作业!');
        }
    } else {
        alert('您不是该作业的成员。');
    }
    
}
