document.addEventListener('DOMContentLoaded', () => {
    renderNavigation(); // 这是从 common.js 中调用的函数
    renderLoginForm();
});

function renderNavigation() {
    const nav = document.getElementById('mainNav');
    nav.innerHTML = `
        <ul>
            <li><a href="../index.html">首页</a></li>
            <li><a href="login.html">登录</a></li>
            <li><a href="register.html">注册</a></li>
        </ul>
    `;
}

function renderLoginForm() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="container">
            <h2>登录</h2>
            <form id="loginForm" class="card">
                <div class="form-group">
                    <label for="email">电子邮箱:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">密码:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <label>身份</label>
                    <div class="radio-group">
                        <input type="radio" id="roleStudent" name="role" value="student" checked>
                        <label for="roleStudent">学生</label>
                        <input type="radio" id="roleTutor" name="role" value="tutor">
                        <label for="roleTutor">导师</label>
                    </div>
                </div>
                <button type="submit" class="btn">登录</button>
            </form>
            <p>还没有账户? <a href="register.html">立即注册</a></p>
        </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.querySelector('input[name="role"]:checked').value;

    // 模拟登录过程
    console.log('登录信息:', { email, password, role });
    
    // 模拟服务器响应
    setTimeout(() => {
        // 创建用户数据对象
        const userData = {
            id: Math.floor(Math.random() * 1000), // 模拟用户ID
            name: email.split('@')[0], // 使用邮箱的用户名部分作为名字
            role: role
        };

        // 调用 setCurrentUser 函数
        if (typeof window.setCurrentUser === 'function') {
            window.setCurrentUser(userData);
            console.log('当前用户已设置:', userData);
        } else {
            console.error('setCurrentUser 函数未定义');
        }

        alert('登录成功!');
        // 登录成功后重定向到首页
        window.location.href = '../index.html';
    }, 1000);
}