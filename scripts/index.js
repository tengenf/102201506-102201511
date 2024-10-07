document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();
    renderMainContent();
});

function renderNavigation() {
    const nav = document.getElementById('mainNav');
    nav.innerHTML = `
        <ul>
            <li><a href="index.html">首页</a></li>
            <li><a href="pages/login.html">登录</a></li>
            <li><a href="pages/register.html">注册</a></li>
        </ul>
    `;
}

function renderMainContent() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <section class="hero">
            <h1>欢迎来到大学生团队协作平台</h1>
            <p>高效协作,成就卓越项目</p>
            <div class="cta-buttons">
                <a href="pages/login.html" class="cta-button">登录</a>
                <a href="pages/register.html" class="cta-button">注册</a>
            </div>
        </section>
        <section class="features">
            <div class="feature">
                <h3>项目管理</h3>
                <p>轻松创建和管理项目,分配任务,跟踪进度。</p>
                <a href="pages/project-list.html" class="feature-button">查看项目</a>
            </div>
            <div class="feature">
                <h3>团队协作</h3>
                <p>实时沟通,文件共享,让团队协作更加高效。</p>
                <a href="pages/team-management.html" class="feature-button">管理团队</a>
            </div>
            <div class="feature">
                <h3>日程安排</h3>
                <p>智能日程管理,不错过任何重要事项。</p>
                <a href="pages/calendar.html" class="feature-button">查看日程</a>
            </div>
            <div class="feature">
                <h3>作业管理</h3>
                <p>老师的团队作业，你做了吗？</p>
                <a href="pages/teamworks.html" class="feature-button">查看作业</a>
            </div>
        </section>
        <section class="additional-features">
            <h2>更多功能</h2>
            <div class="feature-buttons">
                <a href="pages/dashboard.html" class="feature-button">仪表板</a>
                <a href="pages/chat.html" class="feature-button">聊天</a>
                <a href="pages/profile.html" class="feature-button">个人资料</a>
            </div>
        </section>
    `;
}