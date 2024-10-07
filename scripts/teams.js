// 模拟当前用户数据
const currentUser = {
    id: 1,
    name: "张三"
};

// 团队状态
const TEAM_STATUSES = ['招募中', '招募完成'];

// 模拟团队数据
let teams = [
    { id: 1, name: '创新项目小组', memberCount: 5, description: '致力于开发创新性项目的团队', status: '招募中', creator: { id: 1, name: "张三" }, members: [{ id: 1, name: "张三" }, { id: 2, name: "李四" }] },
    { id: 2, name: '数据分析团队', memberCount: 4, description: '专注于大数据分析和可视化的团队', status: '招募完成', creator: { id: 2, name: "李四" }, members: [{ id: 1, name: "张三" }, { id: 2, name: "李四" }] },
    { id: 3, name: 'UI/UX设计组', memberCount: 3, description: '负责产品界面和用户体验设计的团队', status: '招募中', creator: { id: 3, name: "王五" }, members: [{ id: 3, name: "王五" }, { id: 4, name: "赵六" }] },
];

document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();
    renderTeamManagement();
    loadTeams();
});

function renderNavigation() {
    // ... (保持原有的导航渲染逻辑)
}

function renderTeamManagement() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="team-management">
            <h2>团队管理</h2>
            <div class="team-controls">
                <button id="createTeam" class="btn-primary">创建新团队</button>
                <input type="text" id="teamSearch" placeholder="搜索团队...">
            </div>
            <div class="team-lists">
                <div class="my-teams">
                    <h3>我创建的团队</h3>
                    <div id="createdTeamList" class="team-grid"></div>
                </div>
                <div class="joined-teams">
                    <h3>我加入的团队</h3>
                    <div id="joinedTeamList" class="team-grid"></div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('createTeam').addEventListener('click', showCreateTeamModal);
    document.getElementById('teamSearch').addEventListener('input', handleTeamSearch);
}

function loadTeams() {
    displayTeams(teams);
}

function displayTeams(teamsToDisplay) {
    const createdTeamList = document.getElementById('createdTeamList');
    const joinedTeamList = document.getElementById('joinedTeamList');
    createdTeamList.innerHTML = '';
    joinedTeamList.innerHTML = '';

    teamsToDisplay.forEach(team => {
        const teamElement = createTeamElement(team);
        if (team.creator.id === currentUser.id) {
            createdTeamList.appendChild(teamElement);
        } else if (team.members.some(member => member.id === currentUser.id)) {
            joinedTeamList.appendChild(teamElement);
        }
    });
}

function createTeamElement(team) {
    const teamElement = document.createElement('div');
    teamElement.className = 'team-item';
    teamElement.innerHTML = `
        <h3>${team.name}</h3>
        <p>成员数: ${team.memberCount}</p>
        <p>${team.description}</p>
        <p>状态: ${team.status}</p>
        <div class="team-actions">
            <button onclick="viewTeam(${team.id})">查看详情</button>
            ${team.creator.id === currentUser.id ? `
                <button onclick="editTeam(${team.id})">编辑</button>
                <button onclick="deleteTeam(${team.id})">删除</button>
                <button onclick="changeTeamStatus(${team.id})">更改状态</button>
            ` : `
                <button onclick="leaveTeam(${team.id})">退出团队</button>
            `}
        </div>
    `;
    return teamElement;
}

function showCreateTeamModal() {
    const teamName = prompt('请输入团队名称:');
    if (teamName) {
        const teamDescription = prompt('请输入团队描述:');
        createTeam(teamName, teamDescription);
    }
}

function createTeam(name, description) {
    const newTeam = {
        id: Date.now(),
        name,
        description,
        status: '招募中',
        creator: currentUser,
        members: [currentUser],
        memberCount: 1
    };
    teams.push(newTeam);
    displayTeams(teams);
    alert('新团队已创建!');
}

function viewTeam(teamId) {
    const team = teams.find(t => t.id === teamId);
    if (team) {
        alert(`
            团队名称: ${team.name}
            描述: ${team.description}
            状态: ${team.status}
            创建者: ${team.creator.name}
            成员: ${team.members.map(m => m.name).join(', ')}
        `);
    }
}

function editTeam(teamId) {
    const team = teams.find(t => t.id === teamId);
    if (team && team.creator.id === currentUser.id) {
        const newName = prompt('请输入新的团队名称:', team.name);
        if (newName) {
            const newDescription = prompt('请输入新的团队描述:', team.description);
            team.name = newName;
            team.description = newDescription;
            displayTeams(teams);
            alert('团队信息已更新!');
        }
    } else {
        alert('只有团队创建者可以编辑团队信息。');
    }
}

function deleteTeam(teamId) {
    const team = teams.find(t => t.id === teamId);
    if (team && team.creator.id === currentUser.id) {
        if (confirm('确定要删除这个团队吗?')) {
            teams = teams.filter(t => t.id !== teamId);
            displayTeams(teams);
            alert('团队已删除!');
        }
    } else {
        alert('只有团队创建者可以删除团队。');
    }
}

function leaveTeam(teamId) {
    const team = teams.find(t => t.id === teamId);
    if (team && team.members.some(m => m.id === currentUser.id)) {
        if (confirm('确定要退出这个团队吗?')) {
            team.members = team.members.filter(m => m.id !== currentUser.id);
            team.memberCount--;
            displayTeams(teams);
            alert('您已退出团队!');
        }
    }
}

function changeTeamStatus(teamId) {
    const team = teams.find(t => t.id === teamId);
    if (team && team.creator.id === currentUser.id) {
        const currentIndex = TEAM_STATUSES.indexOf(team.status);
        team.status = TEAM_STATUSES[(currentIndex + 1) % TEAM_STATUSES.length];
        displayTeams(teams);
        alert(`团队状态已更改为: ${team.status}`);
    } else {
        alert('只有团队创建者可以更改团队状态。');
    }
}

function handleTeamSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    if (searchTerm === '') {
        displayTeams(teams);
    } else {
        const filteredTeams = teams.filter(team => 
            team.name.toLowerCase().includes(searchTerm) ||
            team.description.toLowerCase().includes(searchTerm) ||
            team.status.toLowerCase().includes(searchTerm) ||
            team.members.some(member => member.name.toLowerCase().includes(searchTerm))
        );
        displayTeams(filteredTeams);
    }
}

function handleLogout(event) {
    event.preventDefault();
    console.log('用户登出');
    window.location.href = 'login.html';
}