const arr = [
    {
        task: "meeting",
        description: "client meeting",
        duration: "00:50:40",
    },
    {
        task: "project-abc",
        description: "Development-xyz",
        duration: "01:42:02",
    },
    {
        task: "Personal break",
        description: "-",
        duration: "00:22:15",
    },
    {
        task: "Personal break",
        description: "break",
        duration: "00:02:35",
    },
    {
        task: "project-abc",
        description: "Development-xyz",
        duration: "00:32:07",
    },
    {
        task: "meeting",
        description: "daily scrum",
        duration: "00:32:28",
    },
    {
        task: "Personal break",
        description: "break",
        duration: "00:02:35",
    },
    {
        task: "project-abc",
        description: "development",
        duration: "00:02:30",
    },
    {
        task: "meeting",
        description: "client-meeting",
        duration: "00:22:40",
    },
    {
        task: "Personal-break",
        description: "development-xyz",
        duration: "00:42:10",
    },
];

function table() {
    let body = document.getElementById('body');
    let tableRows = arr.map(array => `
        <tr>
            <td>${array.task}</td>
            <td>${array.description}</td>
            <td>${array.duration}</td>
            <td> <button type="button" class="btn-update" onclick="updateItem(this)">Update</button></td>
            <td> <button type="button" class="btn-danger" onclick="removeItem(this)">Delete</button></td>
        </tr>
    `).join('');
    body.innerHTML = tableRows;
}
table();

//filtering using select option 
document.getElementById('select').addEventListener('change', filterTable);

function filterTable() {
    const selectedOption = document.getElementById('select').value;
    const tableRows = document.querySelectorAll('#body tr');

    tableRows.forEach(row => {
        const rowTask = row.children[0].textContent; 
        if (selectedOption === 'all tasks' || rowTask === selectedOption) {
            row.style.display = ""; 
        } else {
            row.style.display = "none";
        }
    });
}
//  // deleting rows
 function removeItem(val){
    var item=val.parentNode.parentNode;
    item.parentNode.removeChild(item);
 }

 //update 
 function updateItem(button) {
    const row = button.closest('tr');
    const cells = row.children;

    const newTask = prompt('Enter new task name:', cells[0].innerText);
    if (newTask === null) {
        return; // User clicked Cancel
    }

    const newDescription = prompt('Enter new description:', cells[1].innerText);
    const newDuration = prompt('Enter new duration:', cells[2].innerText);

    cells[0].innerText = newTask;
    cells[1].innerText = newDescription || '-';
    cells[2].innerText = newDuration;
}

document.addEventListener('DOMContentLoaded', function() {
    const startStopButton = document.getElementById('start-stop-button');
    const resetButton = document.getElementById('reset');
    const timeDisplay = document.getElementById('time');
    const stopwatch = document.getElementById('stopwatch');
    const addTaskButton = document.getElementById('addTask');
    const taskTable = document.getElementById('taskTable');
    const taskBody = document.getElementById('body');

    let timer;
    let isRunning = false;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    function updateStopwatch() {
        seconds++;
        if (seconds / 60 === 1) {
            seconds = 0;
            minutes++;
            if (minutes / 60 === 1) {
                minutes = 0;
                hours++;
            }
        }

        timeDisplay.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    function startStop() {
        if (isRunning) {
            clearInterval(timer);
            startStopButton.textContent = 'Start';
        } else {
            timer = setInterval(updateStopwatch, 1000);
            startStopButton.textContent = 'Stop';
        }
        isRunning = !isRunning;
    }

    function resetStopwatch() {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
        isRunning = false;
        seconds = 0;
        minutes = 0;
        hours = 0;
        timeDisplay.textContent = '00:00:00';
    }

    function addTask() {
        const taskName = prompt("Enter task name:");
        const description = prompt("Enter description:");
        const duration = timeDisplay.textContent;

        // Create a new row
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${taskName}</td>
            <td>${description}</td>
            <td>${duration}</td>\
            <td> <button type="button" class="btn-update" onclick="updateItem(this)">Update</button></td>
            <td> <button type="button" class="btn-danger" onclick="removeItem(this)">Delete</button></td>
        `;

        // Append the new row to the table body
        taskBody.appendChild(newRow);
    }

    startStopButton.addEventListener('click', startStop);
    resetButton.addEventListener('click', resetStopwatch);
    addTaskButton.addEventListener('click', addTask);
});
