const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// DECLARING THE ONCLICK FUNCTION FOR THE ADD BUTTON
function addTask() {
  if (inputBox.value === "") {
    alert("Add Task Field cannot be Empty");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "&#128465;";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

// SAVING DATA TO LOCAL STORAGE
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// displaying data whenever we open the browser
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

function getGreeting() {
  const now = new Date();
  const currentTime = now.getHours();

  let greeting, message;

  if (currentTime <= 5 && currentTime < 12) {
    greeting = "Good morning, champ!";
    message = "Let's achieve those goals this morning.";
  } else if (currentTime >= 12 && currentTime < 17) {
    greeting = "Good afternoon!";
    message = "You're doing great today. Keep it up!";
  } else {
    greeting = "Good evening!";
    message = "Rest and recharge for a new day ahead.";
  }

  // Return an array with the greeting and message
  return [greeting, message];
}

const [greeting, message] = getGreeting();

// Display the greeting and message in your HTML
document.getElementById("greeting").textContent = greeting;
document.getElementById("message").textContent = message;

// TIME FUNCTION
function getCurrentDateTime() {
  const now = new Date();

  // Format the day of the month as "11th" or "1st"
  const day = now.getDate();
  const dayFormatted = getFormattedDay(day);

  // Get the current day of the week as "Sun"
  const dayOfWeek = getDayOfWeek(now.getDay());

  // Get the current year as "2023"
  const year = now.getFullYear();

  // Combine the formatted date, day of the week, and year`
  const formattedDate = `${dayFormatted}, ${dayOfWeek}, ${year}`;

  const time = now.toLocaleTimeString(); // Format the time as a string

  const dateTime = `${formattedDate} - ${time}`;

  return dateTime;
}

function getFormattedDay(day) {
  const suffixes = ["th", "st", "nd", "rd"];
  const relevantDigits = day < 30 ? day % 20 : day % 30;
  const suffix = relevantDigits <= 3 ? suffixes[relevantDigits] : suffixes[0];
  return `${day}${suffix}`;
}

function getDayOfWeek(dayIndex) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfWeek[dayIndex];
}

// Update the HTML content with the current date and time
function updateDateTime() {
  const currentDateTimeElement = document.getElementById("currentDateTime");
  if (currentDateTimeElement) {
    currentDateTimeElement.textContent = getCurrentDateTime();
  }
}

// Call the function to update the date and time
updateDateTime();

// Optionally, you can set a timer to update the date and time periodically
setInterval(updateDateTime, 1000); // Update every second
