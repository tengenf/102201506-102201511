document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();
    renderRegisterForm();
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

function renderRegisterForm() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="container register-container">
            <h2>创建新账户</h2>
            <form id="registerForm" class="register-form">
                <div class="form-group">
                    <label for="email">电子邮箱</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="username">用户名</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">确认密码</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                </div>
                <div class="form-group">
                    <label for="university">所属大学</label>
                    <input type="text" id="university" name="university" required>
                </div>
                <div class="form-group">
                    <label for="major">专业</label>
                    <input type="text" id="major" name="major" required>
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
                <button type="submit" class="btn btn-primary">注册</button>
            </form>
            <p class="login-link">已有账户? <a href="login.html">立即登录</a></p>
        </div>
    `;

    document.getElementById('registerForm').addEventListener('submit', handleRegister);
}

function handleRegister(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const university = document.getElementById('university').value.trim();
    const major = document.getElementById('major').value.trim();
    const role = document.querySelector('input[name="role"]:checked').value;

    // 表单验证
    if (!validateForm(email, username, password, confirmPassword, university, major)) {
        return;
    }

    // 创建要发送到服务器的数据对象
    const userData = {
        email,
        username,
        password,
        university,
        major,
        role
    };

    // 模拟向服务器发送注册请求
    registerUser(userData);
}

function validateForm(email, username, password, confirmPassword, university, major) {
    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('请输入有效的电子邮箱地址');
        return false;
    }

    // 用户名长度检查
    if (username.length < 3 || username.length > 20) {
        showError('用户名长度应在3到20个字符之间');
        return false;
    }

    // 密码强度检查
    if (password.length < 8) {
        showError('密码长度应至少为8个字符');
        return false;
    }

    // 密码匹配检查
    if (password !== confirmPassword) {
        showError('两次输入的密码不一致');
        return false;
    }

    // 大学和专业不能为空
    if (!university || !major) {
        showError('请填写所属大学和专业');
        return false;
    }

    return true;
}

function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const matchMessage = document.getElementById('passwordMatchMessage');

    if (!matchMessage) {
        const messageElement = document.createElement('p');
        messageElement.id = 'passwordMatchMessage';
        document.getElementById('confirmPassword').parentNode.appendChild(messageElement);
    }

    if (password === confirmPassword) {
        matchMessage.textContent = '密码匹配';
        matchMessage.style.color = 'green';
    } else {
        matchMessage.textContent = '密码不匹配';
        matchMessage.style.color = 'red';
    }
}

function showError(message) {
    alert(message); // 在实际应用中,你可能想使用更友好的错误显示方式
}

function registerUser(userData) {
    // 在实际应用中,这里应该使用 fetch 或 axios 发送 POST 请求到后端 API
    console.log('注册数据:', userData);
    
    // 模拟服务器响应
    setTimeout(() => {
        // 模拟成功注册
        if (Math.random() > 0.1) { // 90% 成功率
            alert('注册成功!');
            // 注册成功后重定向到登录页面
            window.location.href = 'login.html';
        } else {
            // 模拟注册失败
            showError('注册失败,请稍后重试');
        }
    }, 1000);
}