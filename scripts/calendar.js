document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();
    renderCalendar();
    loadEvents();
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

function renderCalendar() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="container">
            <h2>日程</h2>
            <div class="card" id="calendarContainer">
                <div id="calendarHeader">
                    <button id="prevMonth" class="btn">&lt;</button>
                    <h3 id="currentMonth"></h3>
                    <button id="nextMonth" class="btn">&gt;</button>
                </div>
                <div id="calendarGrid"></div>
            </div>
            <button id="addEvent" class="btn">添加新事件</button>
        </div>
    `;

    document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
    document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));
    document.getElementById('addEvent').addEventListener('click', showAddEventModal);

    renderCalendarGrid(new Date());
}

function renderCalendarGrid(date) {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonth = document.getElementById('currentMonth');
    
    const year = date.getFullYear();
    const month = date.getMonth();
    
    currentMonth.textContent = `${year}年${month + 1}月`;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    calendarGrid.innerHTML = '';
    
    // 添加星期头
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    weekdays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day weekday';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // 添加空白天数
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    // 添加月份天数
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = i;
        dayElement.addEventListener('click', () => showDayEvents(new Date(year, month, i)));
        calendarGrid.appendChild(dayElement);
    }
}

function changeMonth(delta) {
    const currentMonth = document.getElementById('currentMonth').textContent;
    const [year, month] = currentMonth.split('年')[0].split('月');
    const newDate = new Date(parseInt(year), parseInt(month) - 1 + delta, 1);
    renderCalendarGrid(newDate);
    loadEvents();
}

function loadEvents() {
    // 模拟从后端API获取事件数据
    // 在实际应用中,这里应该使用fetch或axios发送GET请求
    setTimeout(() => {
        const events = [
            { date: '2023-05-15', title: '团队会议' },
            { date: '2023-05-20', title: '项目截止日期' },
            // 更多事件...
        ];
        displayEvents(events);
    }, 1000);
}

function displayEvents(events) {
    const days = document.querySelectorAll('.calendar-day:not(.empty):not(.weekday)');
    days.forEach(day => {
        const dayDate = new Date(currentYear, currentMonth, parseInt(day.textContent));
        const dayEvents = events.filter(event => new Date(event.date).toDateString() === dayDate.toDateString());
        if (dayEvents.length > 0) {
            const eventIndicator = document.createElement('div');
            eventIndicator.className = 'event-indicator';
            eventIndicator.textContent = dayEvents.length;
            day.appendChild(eventIndicator);
        }
    });
}

function showDayEvents(date) {
    // 显示选中日期的事件
    console.log('显示日期事件:', date);
    // 这里应该实现一个模态框或侧边栏来显示当天的事件
}

function showAddEventModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>添加新事件</h3>
            <form id="addEventForm">
                <input type="date" id="eventDate" required>
                <input type="text" id="eventTitle" placeholder="事件标题" required>
                <textarea id="eventDescription" placeholder="事件描述"></textarea>
                <button type="submit">添加</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('addEventForm').addEventListener('submit', handleAddEvent);
}

function handleAddEvent(event) {
    event.preventDefault();
    const date = document.getElementById('eventDate').value;
    const title = document.getElementById('eventTitle').value;
    const description = document.getElementById('eventDescription').value;

    // 在实际应用中,这里应该发送POST请求到后端API
    console.log('添加新事件:', { date, title, description });
    
    // 模拟添加事件
    events.push({ date, title, description });
    displayEvents(events);
    
    // 关闭模态框
    document.body.removeChild(event.target.closest('.modal'));
}

function handleLogout(event) {
    event.preventDefault();
    // 在实际应用中,这里应该清除用户的session或token
    console.log('用户登出');
    window.location.href = 'login.html';
}

// 可以添加更多辅助函数,如事件管理、日期格式化等