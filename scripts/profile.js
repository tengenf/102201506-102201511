document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();
    renderProfileForm();
    loadProfileData();
});


function renderProfileForm() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="container profile-container">
            <h2>个人资料</h2>
            <div class="profile-card">
                <div class="profile-header">
                    <img src="../images/me.png" alt="用户头像" class="profile-avatar">
                    <h3 id="userName">用户名</h3>
                </div>
                <form id="profileForm" class="profile-form">
                    <div class="form-group">
                        <label for="email">电子邮箱</label>
                        <input type="email" id="email" name="email" required>
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
                        <label for="grade">年级</label>
                        <select id="grade" name="grade" required>
                            <option value="1">大一</option>
                            <option value="2">大二</option>
                            <option value="3">大三</option>
                            <option value="4">大四</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="skills">技能</label>
                        <input type="text" id="skills" name="skills">
                    </div>
                    <div class="form-group">
                        <label for="bio">个人简介</label>
                        <textarea id="bio" name="bio" rows="4"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">保存更改</button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('profileForm').addEventListener('submit', handleProfileUpdate);
}

function loadProfileData() {
    // 模拟从后端API获取用户资料
    // 在实际应用中,这里应该使用fetch或axios发送GET请求
    setTimeout(() => {
        const profileData = {
            name: '张三',
            email: 'zhangsan@example.com',
            university: '示例大学',
            major: '计算机科学',
            grade: 3,
            skills: '编程, 设计, 项目管理',
            bio: '热爱技术,喜欢团队合作。'
        };
        fillProfileForm(profileData);
    }, 1000);
}

function fillProfileForm(data) {
    document.getElementById('name').value = data.name;
    document.getElementById('email').value = data.email;
    document.getElementById('university').value = data.university;
    document.getElementById('major').value = data.major;
    document.getElementById('grade').value = data.grade;
    document.getElementById('skills').value = data.skills;
    document.getElementById('bio').value = data.bio;
}

function handleProfileUpdate(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const profileData = Object.fromEntries(formData.entries());

    // 模拟向后端API发送更新请求
    // 在实际应用中,这里应该使用fetch或axios发送PUT请求
    console.log('更新的资料:', profileData);
    setTimeout(() => {
        alert('个人资料已成功更新!');
    }, 1000);
}

function handleLogout(event) {
    event.preventDefault();
    // 在实际应用中,这里应该清除用户的session或token
    console.log('用户登出');
    window.location.href = 'login.html';
}

// 可以添加更多辅助函数,如表单验证等