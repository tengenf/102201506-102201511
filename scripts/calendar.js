let events = []; // 定义全局的 events 数组
let currentYear;
let currentMonth;

document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();
    renderCalendar();
    loadEvents();
});

function renderCalendar() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="container">
            <h2>日程</h2>
            <div class="flex-container">
                <div class="card" id="calendarContainer">
                    <div id="calendarHeader">
                        <button id="prevMonth" class="btn">&lt;</button>
                        <h3 id="currentMonth"></h3>
                        <button id="nextMonth" class="btn">&gt;</button>
                    </div>
                    <div id="calendarGrid"></div>
                </div>
                <div class="event-sidebar" id="eventSidebar">
                    <h3>事件栏</h3>
                    <ul id="eventList"></ul>
                    <button id="addEvent" class="btn">添加新事件</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
    document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));
    document.getElementById('addEvent').addEventListener('click', showAddEventModal);

    renderCalendarGrid(new Date());
    renderEventSidebar();
}

function renderCalendarGrid(date) {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    
    currentYear = date.getFullYear();
    currentMonth = date.getMonth();
    
    currentMonthElement.textContent = `${currentYear}年${currentMonth + 1}月`;
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
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
        dayElement.addEventListener('click', (e) => showDayEvents(new Date(currentYear, currentMonth, i)));
        calendarGrid.appendChild(dayElement);
        
        // 显示事件标题
        const dayEvents = events.filter(event => 
            new Date(event.date).toDateString() === new Date(currentYear, currentMonth, i).toDateString()
        );
        if (dayEvents.length > 0) {
            dayEvents.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'event-title';
                eventElement.textContent = event.title;
                dayElement.appendChild(eventElement);
            });
        }
    }
}

function renderEventSidebar() {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    // 默认添加一个事件
    const defaultEvent = { date: '2024-10-25', title: '英语小测' };
    events.push(defaultEvent);
    renderEventItem(defaultEvent);

    events.forEach(event => {
        renderEventItem(event);
    });
}

function renderEventItem(event) {
    const eventList = document.getElementById('eventList');
    const eventItem = document.createElement('li');
    eventItem.className = 'event-item';
    eventItem.innerHTML = `
        <span>${event.title} - ${event.date}</span>
        <button class="delete-event" data-event-date="${event.date}">删除</button>
    `;
    eventList.appendChild(eventItem);

    const deleteButton = eventItem.querySelector('.delete-event');
    deleteButton.addEventListener('click', function() {
        // 过滤掉要删除的事件
        events = events.filter(e => e.date !== this.dataset.eventDate);
        // 重新渲染事件栏
        renderEventSidebar();
        // 重新渲染日历
        renderCalendarGrid(new Date(currentYear, currentMonth));
    });
}

function renderEventSidebar() {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = ''; // 清除旧的事件项

    // 添加默认事件和动态添加的事件
    events.forEach(event => {
        renderEventItem(event);
    });
}

function changeMonth(delta) {
    const newMonth = currentMonth + delta;
    const newYear = currentYear;
    if (newMonth < 0) {
        newYear--;
        newMonth = 11;
    } else if (newMonth > 11) {
        newYear++;
        newMonth = 0;
    }
    currentYear = newYear;
    currentMonth = newMonth;

    renderCalendarGrid(new Date(currentYear, currentMonth));
    loadEvents();
}

function loadEvents() {
    setTimeout(() => {
        events = [
            { date: '2023-05-15', title: '团队会议' },
            { date: '2023-05-20', title: '项目截止日期' },
            // 更多事件...
        ];
        renderCalendarGrid(new Date(currentYear, currentMonth));
        renderEventSidebar();
    }, 1000);
}

function showDayEvents(date) {
    console.log('显示日期事件:', date);
}

function showAddEventModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>添加新事件</h3>
            <button class="modal-close">取消</button>
            <form id="addEventForm">
                <input type="date" id="eventDate" required>
                <input type="text" id="eventTitle" placeholder="事件标题" required>
                <textarea id="eventDescription" placeholder="事件描述"></textarea>
                <button type="submit">添加</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    const closeButton = document.querySelector('.modal-close');
    closeButton.addEventListener('click', function() {
        document.body.removeChild(modal);
    });

    const form = document.getElementById('addEventForm');
    form.addEventListener('submit', handleAddEvent);
}

function handleAddEvent(event) {
    event.preventDefault();
    const date = document.getElementById('eventDate').value;
    const title = document.getElementById('eventTitle').value;
    const description = document.getElementById('eventDescription').value;
    const newEvent = { date, title, description };

    // 检查事件是否已经存在
    if (!events.some(e => e.date === newEvent.date && e.title === newEvent.title)) {
        events.push(newEvent);
        renderCalendarGrid(new Date(currentYear, currentMonth));
        renderEventSidebar();
        document.body.removeChild(event.target.closest('.modal'));
    } else {
        console.log('事件已存在');
    }
}
function renderEventSidebar() {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = ''; // 清除旧的事件项

    // 添加默认事件和动态添加的事件
    events.forEach(event => {
        renderEventItem(event);
    });
}
