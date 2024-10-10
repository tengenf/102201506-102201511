function renderNavigation() {
    const nav = document.getElementById('mainNav');
    nav.innerHTML = `
        <ul>
            <li><a href="/index.html" class="home-button">主页</a></li>
            <!-- 其他导航项 -->
        </ul>
    `;
}