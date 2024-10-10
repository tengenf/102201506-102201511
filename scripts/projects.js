// 项目状态选项
const PROJECT_STATUSES = ['规划中', '进行中', '已完成'];

// 模拟用户数据
const currentUser = {
    id: 1,
    name: "张三",
    role: "teamLeader" // 可以是 'teamLeader' 或 'member'
};

// 模拟项目数据
let projects = [
    {
        id: 1,
        name: "智能家居系统",
        description: "开发一套智能家居控制系统",
        leader: { id: 1, name: "张三" },
        members: [
            { id: 1, name: "张三" },
            { id: 2, name: "李四" },
            { id: 3, name: "王五" }
        ],
        status: "进行中"
    },
    {
        id: 2,
        name: "移动支付平台",
        description: "构建安全高效的移动支付解决方案",
        leader: { id: 4, name: "赵六" },
        members: [
            { id: 4, name: "赵六" },
            { id: 5, name: "钱七" }
        ],
        status: "规划中"
    }
];

// 渲染项目列表
function renderProjects(projectsToRender = projects) {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';
    projectsToRender.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p>状态: ${project.status}</p>
            <p>团队成员: ${project.members.map(m => m.name).join(', ')}</p>
            <div class="project-actions">
                ${currentUser.id === project.leader.id ? `
                    <button onclick="changeProjectStatus(${project.id})">修改状态</button>
                    <button onclick="deleteProject(${project.id})">删除</button>
                ` : ''}
                ${project.members.some(m => m.id === currentUser.id) ? `<button onclick="editProject(${project.id})">编辑</button>` : ''}
                <button onclick="viewProject(${project.id})">查看详情</button>
            </div>
        `;
        projectList.appendChild(projectCard);
    });

    if (projectsToRender.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = '没有找到匹配的项目';
        noResultsMessage.className = 'no-results-message';
        projectList.appendChild(noResultsMessage);
    }
}

// 创建新项目
function createProject() {
    const name = prompt("请输入项目名称:");
    if (name) {
        const description = prompt("请输入项目描述:");
        const newProject = {
            id: Date.now(),
            name,
            description,
            leader: currentUser,
            members: [currentUser],
            status: "规划中"
        };
        projects.push(newProject);
        renderProjects();
        saveProjects();
    }
}

// 删除项目
function deleteProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project && project.leader.id === currentUser.id) {
        if (confirm("确定要删除这个项目吗?")) {
            projects = projects.filter(p => p.id !== projectId);
            renderProjects();
            saveProjects();
        }
    } else {
        alert("只有项目组长可以删除项目。");
    }
}

// 编辑项目
function editProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project && project.members.some(m => m.id === currentUser.id)) {
        const newName = prompt("请输入新的项目名称:", project.name);
        const newDescription = prompt("请输入新的项目描述:", project.description);
        
        if (newName && newDescription) {
            project.name = newName;
            project.description = newDescription;
            renderProjects();
            saveProjects();
        }
    } else {
        alert("只有项目成员可以编辑项目信息。");
    }
}

// 修改项目状态
function changeProjectStatus(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project && project.leader.id === currentUser.id) {
        const currentIndex = PROJECT_STATUSES.indexOf(project.status);
        const newStatus = PROJECT_STATUSES[(currentIndex + 1) % PROJECT_STATUSES.length];
        project.status = newStatus;
        renderProjects();
        saveProjects();
    } else {
        alert("只有项目组长可以修改项目状态。");
    }
}

// 查看项目详情
function viewProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        alert(`
            项目名称: ${project.name}
            描述: ${project.description}
            状态: ${project.status}
            团队领导: ${project.leader.name}
            团队成员: ${project.members.map(m => m.name).join(', ')}
        `);
    }
}

// 保存项目到本地存储
function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// 从本地存储加载项目
function loadProjects() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
        projects = JSON.parse(storedProjects);
    }
    renderProjects();
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    document.getElementById('createProject').addEventListener('click', createProject);
});

// 项目搜索功能
document.getElementById('projectSearch').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    if (searchTerm === '') {
        renderProjects();
    } else {
        const filteredProjects = projects.filter(project => 
            project.name.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.status.toLowerCase().includes(searchTerm) ||
            project.members.some(member => member.name.toLowerCase().includes(searchTerm))
        );
        renderProjects(filteredProjects);
    }
});