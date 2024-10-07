document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();
    renderDashboard();
    loadDashboardData();
});

function renderNavigation() {
    const nav = document.getElementById('mainNav');
    nav.innerHTML = `
        <ul>
            <li><a href="dashboard.html">仪表板</a></li>
            <li><a href="project-list.html">项目列表</a></li>
            <li><a href="team-management.html">团队管理</a></li>
            <li><a href="chat.html">聊天</a></li>
            <li><a href="calendar.html">日程</a></li>
            <li><a href="profile.html">个人资料</a></li>
            <li><a href="teamworks.html">作业管理</a></li>
            <li><a href="#" id="logout">退出</a></li>
        </ul>
    `;

    document.getElementById('logout').addEventListener('click', handleLogout);
}

function renderDashboard() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <h2>欢迎回来, <span id="userName"></span>!</h2>
        <div class="dashboard-grid">
            <div class="dashboard-item" id="projectSummary">
                <h3>项目概览</h3>
                <div id="projectList"></div>
            </div>
            <div class="dashboard-item" id="teamSummary">
                <h3>我的团队</h3>
                <div id="teamList"></div>
            </div>
            <div class="dashboard-item" id="upcomingEvents">
                <h3>近期事件</h3>
                <div id="eventList"></div>
            </div>
            <div class="dashboard-item" id="recentActivities">
                <h3>最近活动</h3>
                <div id="activityList"></div>
            </div>
        </div>
    `;
}

function loadDashboardData() {
    // 模拟从后端API获取仪表板数据
    // 在实际应用中,这里应该使用fetch或axios发送GET请求
    setTimeout(() => {
        const dashboardData = {
            userName: '张三',
            projects: [
                { id: 1, name: '创新项目A', progress: 75 },
                { id: 2, name: '研究课题B', progress: 30 },
            ],
            teams: [
                { id: 1, name: '创新小组', memberCount: 5 },
                { id: 2, name: '研究团队', memberCount: 3 },
            ],
            events: [
                { id: 1, title: '项目会议', date: '2023-05-20' },
                { id: 2, title: '截止日期: 研究报告', date: '2023-05-25' },
            ],
            activities: [
                { id: 1, description: '张三 更新了项目A的进度', time: '2小时前' },
                { id: 2, description: '李四 加入了创新小组', time: '1天前' },
            ],
        };
        displayDashboardData(dashboardData);
    }, 1000);
}

function displayDashboardData(data) {
    document.getElementById('userName').textContent = data.userName;

    const projectList = document.getElementById('projectList');
    projectList.innerHTML = data.projects.map(project => `
        <div class="project-item">
            <span>${project.name}</span>
            <progress value="${project.progress}" max="100"></progress>
        </div>
    `).join('');

    const teamList = document.getElementById('teamList');
    teamList.innerHTML = data.teams.map(team => `
        <div class="team-item">
            <span>${team.name}</span>
            <span>成员: ${team.memberCount}</span>
        </div>
    `).join('');

    const eventList = document.getElementById('eventList');
    eventList.innerHTML = data.events.map(event => `
        <div class="event-item">
            <span>${event.title}</span>
            <span>${event.date}</span>
        </div>
    `).join('');

    const activityList = document.getElementById('activityList');
    activityList.innerHTML = data.activities.map(activity => `
        <div class="activity-item">
            <span>${activity.description}</span>
            <span>${activity.time}</span>
        </div>
    `).join('');
}

function handleLogout(event) {
    event.preventDefault();
    // 在实际应用中,这里应该清除用户的session或token
    console.log('用户登出');
    window.location.href = 'login.html';
}

// 可以添加更多辅助函数,如处理项目点击、团队点击等