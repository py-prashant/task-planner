function generateTasks() {
    const weekInput = document.getElementById('weekInput').value;
    const taskListContainer = document.getElementById('taskList');
    taskListContainer.value = ''; // Clear previous task list

    if (!weekInput.startsWith('WK') || isNaN(weekInput.slice(2))) {
        alert('Please enter a valid week number (e.g., WK24)');
        return;
    }

    const weekNumber = parseInt(weekInput.slice(2));
    const year = new Date().getFullYear();
    const startDate = getDateOfISOWeek(weekNumber, year);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Weekend'];
    const dateOptions = { day: '2-digit', month: 'short', year: '2-digit' };
    const taskTemplate = `
Task 1
Task 2
`;

    days.forEach((day, index) => {
        let date;
        if (day === 'Weekend') {
            const saturday = formatDate(addDays(startDate, 5), dateOptions);
            const sunday = formatDate(addDays(startDate, 6), dateOptions);
            date = `${saturday}-${sunday}`;
        } else {
            date = formatDate(addDays(startDate, index), dateOptions);
        }
        let header = `${date} [${day.toUpperCase()}]`;
        if (day === 'Monday') {
            header += ` [${weekInput.toUpperCase()}]`;
        }
        taskListContainer.value += `${header}\n${taskTemplate}\n`;
    });
}

function getDateOfISOWeek(w, y) {
    const simple = new Date(y, 0, 1 + (w - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function formatDate(date, options) {
    return date.toLocaleDateString('en-GB', options).replace(',', '').toUpperCase();
}