// 处理登录
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // 这里应该调用后端API进行验证
    console.log('登录:', email, password);
    // 登录成功后跳转到仪表板
    navigateTo('dashboard.html');
});

// 处理注册
// ... 类似的代码用于处理注册表单 ...