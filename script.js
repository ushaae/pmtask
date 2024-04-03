// JavaScript for adding rows dynamically and calculating Taken Time
function addRow() {
    const tableBody = document.querySelector('#studyTable tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><input type="text" name="taskName"></td>
      <td><input type="time" name="startTime"></td>
      <td><input type="text" name="functionTime" oninput="calculateTotalTimes()"></td>
      <td><input type="time" name="endTime" onchange="calculateTakenTime(this); calculateTotalTimes()"></td>
      <td><input type="text" name="takenTime" readonly></td>
    `;
    tableBody.appendChild(newRow);
  }
  
  function calculateTakenTime(endTimeInput) {
    const row = endTimeInput.parentElement.parentElement;
    const startTime = row.querySelector('input[name="startTime"]').value;
    const endTime = endTimeInput.value;
  
    if (startTime && endTime) {
      const start = new Date(`2000-01-01 ${startTime}`);
      const end = new Date(`2000-01-01 ${endTime}`);
      const diff = end - start;
      const totalMinutes = Math.floor(diff / 1000 / 60);
  
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
  
      const takenTimeInput = row.querySelector('input[name="takenTime"]');
      takenTimeInput.value = `${hours} hours ${minutes} minutes`;
    }
  }
  
  function calculateTotalTimes() {
    let totalFunctionTime = 0;
    let totalTakenTime = 0;
  
    const rows = document.querySelectorAll('#studyTable tbody tr');
    rows.forEach(row => {
      const functionTimeInput = row.querySelector('input[name="functionTime"]');
      const functionTime = functionTimeInput.value.trim().split(' ');
      const functionHours = parseInt(functionTime[0]) || 0;
      const functionMinutes = parseInt(functionTime[2]) || 0;
      totalFunctionTime += functionHours * 60 + functionMinutes;
  
      const takenTimeInput = row.querySelector('input[name="takenTime"]');
      const takenTime = takenTimeInput.value.trim().split(' ');
      const takenHours = parseInt(takenTime[0]) || 0;
      const takenMinutes = parseInt(takenTime[2]) || 0;
      totalTakenTime += takenHours * 60 + takenMinutes;
    });
  
    const totalFunctionHours = Math.floor(totalFunctionTime / 60);
    const totalFunctionMinutes = totalFunctionTime % 60;
  
    const totalTakenHours = Math.floor(totalTakenTime / 60);
    const totalTakenMinutes = totalTakenTime % 60;
  
    let totalFunctionTimeString = '';
    if (totalFunctionHours > 0) {
      totalFunctionTimeString += `${totalFunctionHours} hours `;
    }
    if (totalFunctionMinutes > 0 || totalFunctionTimeString === '') {
      totalFunctionTimeString += `${totalFunctionMinutes} minutes`;
    }
  
    let totalTakenTimeString = '';
    if (totalTakenHours > 0) {
      totalTakenTimeString += `${totalTakenHours} hours `;
    }
    if (totalTakenMinutes > 0 || totalTakenTimeString === '') {
      totalTakenTimeString += `${totalTakenMinutes} minutes`;
    }
  
    document.getElementById('totalFunctionTime').querySelector('span').textContent = totalFunctionTimeString;
    document.getElementById('totalTakenTime').querySelector('span').textContent = totalTakenTimeString;
  }
  // JavaScript for adding rows dynamically and calculating Taken Time

// Function to save data to local storage
function saveDataToLocalStorage() {
    const tableRows = document.querySelectorAll('#studyTable tbody tr');
    const data = [];
    tableRows.forEach(row => {
      const rowData = {
        taskName: row.querySelector('input[name="taskName"]').value,
        startTime: row.querySelector('input[name="startTime"]').value,
        functionTime: row.querySelector('input[name="functionTime"]').value,
        endTime: row.querySelector('input[name="endTime"]').value,
        takenTime: row.querySelector('input[name="takenTime"]').value
      };
      data.push(rowData);
    });
    localStorage.setItem('studyData', JSON.stringify(data));
  }
  
  // Function to load data from local storage
  function loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('studyData');
    if (storedData) {
      const data = JSON.parse(storedData);
      const tableBody = document.querySelector('#studyTable tbody');
      tableBody.innerHTML = '';
      data.forEach(rowData => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td><input type="text" name="taskName" value="${rowData.taskName}"></td>
          <td><input type="time" name="startTime" value="${rowData.startTime}"></td>
          <td><input type="text" name="functionTime" value="${rowData.functionTime}" oninput="calculateTotalTimes()"></td>
          <td><input type="time" name="endTime" value="${rowData.endTime}" onchange="calculateTakenTime(this); calculateTotalTimes()"></td>
          <td><input type="text" name="takenTime" value="${rowData.takenTime}" readonly></td>
        `;
        tableBody.appendChild(newRow);
      });
    }
  }
  
  // Add event listeners for input and window load events to save and load data
  document.addEventListener('DOMContentLoaded', loadDataFromLocalStorage);
  document.querySelector('#studyTable').addEventListener('input', saveDataToLocalStorage);
// Sample data structure to store tasks for each date
const tasksByDate = {
  "5/3/2024": [
    { taskName: "Task 1", startTime: "10:00 AM", functionTime: "Study", endTime: "11:30 AM", takenTime: "1 hour 30 minutes" },
    // More tasks for 5/3/2024
  ],
  // Tasks for other dates...
};

// Function to display tasks for a selected date
function displayTasksForDate(selectedDate) {
  const tasks = tasksByDate[selectedDate];
  // Display tasks in the table
}

// Function to handle date change at midnight
function checkDateChange() {
  const now = new Date();
  const currentDate = now.toLocaleDateString("en-US");
  const currentTime = now.toLocaleTimeString("en-US");
  if (currentTime > "23:59:59") {
    // Automatically switch to the next day's tasks
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const nextDate = tomorrow.toLocaleDateString("en-US");
    displayTasksForDate(nextDate);
  }
}

// Function to handle date navigation
function handleDateNavigation(selectedDate) {
  // Display tasks for the selected date
  displayTasksForDate(selectedDate);
}

// Sample usage
const selectedDate = "5/3/2024"; // Default to today's date
handleDateNavigation(selectedDate);

// Check for date change at midnight every second
setInterval(checkDateChange, 1000);
  