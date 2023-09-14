const taskInput = document.querySelector(".taskInput");
const addBtn = document.querySelector(".primary-btn");
const clearTasks = document.querySelector(".secondary-btn");
const filterTask = document.querySelector(".filterInput");
const ul = document.querySelector(".ul");
const formList = document.querySelector(".taskList");
const reportCardForm = document.querySelector(".reportList");
const reportCard_ul = document.querySelector(".reportList-ul");
const reportCardList = document.querySelector(".completed-lists");
const clearCompleteTaskBtn = document.querySelector(".clearCompleteBtn");
const filterTask2 = document.querySelector(".filterInput2");
const clearAllAddedTask = document.querySelector(".clearTask");
const doneBtn = document.querySelector(".completed");
const newRepo = document.querySelector(".savedReport");

// events

function loadAllevent() {
  // DOM load events

  document.addEventListener("DOMContentLoaded", getTask);
  document.addEventListener("DOMContentLoaded", getTask2);
  document.addEventListener("DOMContentLoaded", getTask3);

  //
  doneBtn.addEventListener("click", finished);
  addBtn.addEventListener("click", addTask);
  formList.addEventListener("click", removeTask);
  clearTasks.addEventListener("click", reset);
  filterTask.addEventListener("input", filter);
  clearCompleteTaskBtn.addEventListener("click", clearCompleteTask);
  filterTask2.addEventListener("input", filter2);
  clearAllAddedTask.addEventListener("click", clearAddedTask);

  // submit.addEventListener("click", saveTask);
}

loadAllevent();

//

// Functions

// Get Tasklist tasks From local storage
function getTask() {
  let tasks;
  if (localStorage.getItem("task") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("task"));
  }
  tasks.forEach((task) => {
    let ul = document.createElement("ul");
    ul.className = "ul";
    let li = document.createElement("li");
    li.className = "list-items";
    li.appendChild(document.createTextNode(task));
    let div = document.createElement("div");
    div.className = "div";
    let check = document.createElement("i");
    check.className = "fa-solid fa-check";
    check.style.color = "green";
    check.style.marginLeft = "80px";
    let a = document.createElement("a");
    a.setAttribute("href", "#");
    a.className = "a-tag";
    let i = document.createElement("i");
    i.className = "fa-solid fa-xmark fa-flip";
    i.style.color = "rgba(209, 43, 43, 0.822)";
    i.style.padding = "5px";
    a.appendChild(i);
    div.appendChild(a);
    div.appendChild(check);
    li.appendChild(div);
    ul.appendChild(li);
    formList.appendChild(ul);

    // check list event listeners

    check.addEventListener("click", run);
    check.addEventListener("click", run2);

    //
  });

  //  check Funtion to get task-list value

  function run2(e) {
    return deleteLs(
      e.target.parentElement.parentElement.firstChild.textContent
    );
  }
  //

  function run(e) {
    if (confirm("proceed")) {
      alert("Congratulations, Keep it up!");
      e.target.parentElement.parentElement.remove();
      return write(e.target.parentElement.parentElement.firstChild.textContent);
    }
  }
}
//

// Get complted task from local storage
function getTask2() {
  let completedTask;
  if (localStorage.getItem("completedTask") === null) {
    completedTask = [];
  } else {
    completedTask = JSON.parse(localStorage.getItem("completedTask"));
  }
  completedTask.forEach((one) => {
    let ol = document.createElement("ol");
    ol.className = "ol";
    let li = document.createElement("li");
    li.className = "completed-lists";
    let div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.gap = "20px";
    let date = new Date().toDateString();
    let time = new Date().toLocaleTimeString();
    let pTime = document.createElement("p");
    pTime.textContent = time;
    pTime.style.fontSize = "10px";
    let pDate = document.createElement("p");
    pDate.textContent = date;
    pDate.style.fontSize = "10px";
    div.appendChild(pDate);
    div.appendChild(pTime);
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.textContent = one;
    li.appendChild(div);
    ol.appendChild(li);
    reportCardForm.appendChild(ol);
  });
}
//

//  Add task funtion

function addTask(e) {
  e.preventDefault();

  let ul = document.createElement("ul");
  ul.className = "ul";
  let li = document.createElement("li");
  li.className = "list-items";
  li.appendChild(document.createTextNode(taskInput.value));
  let div = document.createElement("div");
  div.className = "div";
  let check = document.createElement("i");
  check.className = "fa-solid fa-check";
  check.style.color = "green";
  check.style.marginLeft = "80px";
  let a = document.createElement("a");
  a.setAttribute("href", "#");
  a.className = "a-tag";
  let i = document.createElement("i");
  i.className = "fa-solid fa-xmark fa-flip";
  i.style.color = "rgba(209, 43, 43, 0.822)";
  i.style.padding = "5px";

  a.appendChild(i);
  div.appendChild(a);
  div.appendChild(check);
  li.appendChild(div);
  ul.appendChild(li);

  if (taskInput.value === "") {
    alert("Please add a task to proceed");
  } else {
    formList.appendChild(ul);
    storeTaskToLocalStorage(taskInput.value);
  }

  //

  //Finished funtion

  // check list event listeners

  check.addEventListener("click", run);
  check.addEventListener("click", run2);

  //

  //  check Funtion to get task-list value to add to completed task local storage

  function run2(e) {
    return deleteLs(
      e.target.parentElement.parentElement.firstChild.textContent
    );
  }

  //

  // Funtion to get task-list value to delete from task local storage

  function run(e) {
    if (confirm("Add to completed tasks?")) {
      alert("Congratulations, Keep it up!");
      e.target.parentElement.parentElement.remove();
      return write(e.target.parentElement.parentElement.firstChild.textContent);
    }
  }

  //

  // clear input task bar

  taskInput.value = "";

  //
}

// Add to completed Task

function write(e) {
  let ol = document.createElement("ol");
  ol.className = "ol";
  let li = document.createElement("li");
  li.className = "completed-lists";
  let div = document.createElement("div");
  div.style.display = "flex";
  div.style.justifyContent = "space-between";
  div.style.gap = "20px";
  let date = new Date().toDateString();
  let time = new Date().toLocaleTimeString();
  let pTime = document.createElement("p");
  pTime.textContent = time;
  pTime.style.fontSize = "10px";
  let pDate = document.createElement("p");
  pDate.textContent = date;
  pDate.style.fontSize = "10px";
  div.appendChild(pDate);
  div.appendChild(pTime);
  li.style.display = "flex";
  li.style.justifyContent = "space-between";
  li.textContent = e;
  li.appendChild(div);
  ol.appendChild(li);
  reportCardForm.appendChild(ol);

  storeTaskToLocalStorage2(e);
  // done(e);
}

//

// store to completed task local storage

function storeTaskToLocalStorage2(para) {
  let completedTask;
  if (localStorage.getItem("completedTask") === null) {
    completedTask = [];
  } else {
    completedTask = JSON.parse(localStorage.getItem("completedTask"));
  }
  completedTask.push(para);
  localStorage.setItem("completedTask", JSON.stringify(completedTask));
}

//

// store to task local storage funtion

function storeTaskToLocalStorage(paramiter) {
  let task;
  if (localStorage.getItem("task") === null) {
    task = [];
  } else {
    task = JSON.parse(localStorage.getItem("task"));
  }
  task.push(paramiter);
  localStorage.setItem("task", JSON.stringify(task));
}

//

//  Remove from task list

function removeTask(e) {
  if (e.target.parentElement.classList.contains("a-tag")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.parentElement.remove();
      // delete from local storage
      deleteFromLocalSrorage(
        e.target.parentElement.parentElement.parentElement
      );
    }
  }
}

//

// clear added task list

function clearAddedTask() {
  if (confirm("Are you sure")) {
    while (formList.firstChild) {
      formList.removeChild(formList.firstChild);
    }
    localStorage.removeItem("task");
  }
}

//

// Delete from task local storage through the check icon

function deleteLs(parameter) {
  let task;
  if (localStorage.getItem("task") === null) {
    task = [];
  } else {
    task = JSON.parse(localStorage.getItem("task"));
  }

  task.forEach((taskText, index) => {
    if (parameter === taskText) {
      task.splice(index, 1);
    }
  });
  localStorage.setItem("task", JSON.stringify(task));
}

//

// Delete from task local storage through the x icon

function deleteFromLocalSrorage(parameter) {
  let task;
  if (localStorage.getItem("task") === null) {
    task = [];
  } else {
    task = JSON.parse(localStorage.getItem("task"));
  }

  task.forEach((taskText, index) => {
    if (parameter.textContent === taskText) {
      task.splice(index, 1);
    }
  });
  localStorage.setItem("task", JSON.stringify(task));
}

//

//Reset function

function reset() {
  if (
    formList.innerHTML === "" &&
    reportCardForm.innerHTML === "" &&
    newRepo.innerHTML === ""
  ) {
    alert("Done");
  } else {
    if (confirm("Do you want to reset ?")) {
      while (formList.firstChild) {
        formList.removeChild(formList.firstChild);
      }
      while (reportCardForm.firstChild) {
        reportCardForm.removeChild(reportCardForm.firstChild);
      }
      while (newRepo.firstChild) {
        newRepo.removeChild(newRepo.firstChild);
        localStorage.clear();
      }
    }
  }
}

//

// no.4 Filter completed task funtion

function filter(e) {
  let text = e.target.value.toLowerCase();

  let task = document.querySelectorAll(".completed-lists");

  task.forEach((task) => {
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
      task.style.listStyle = "disc";
    } else {
      task.style.display = "none";
    }
  });
}

//

// Filter  task funtion

function filter2(e) {
  let input = e.target.value.toLowerCase();
  let list = document.querySelectorAll(".list-items");
  list.forEach((list) => {
    let item = list.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(input) != -1) {
      list.style.display = "flex";
      list.style.justifyContent = "space-between";
    } else {
      list.style.display = "none";
    }
  });
}

//

// Clear completed task

function clearCompleteTask() {
  if (reportCardForm.innerHTML === "") {
    alert("Cleared");
  } else {
    if (confirm("Are you sure?")) {
      while (reportCardForm.firstChild) {
        reportCardForm.removeChild(reportCardForm.firstChild);
      }

      localStorage.removeItem("completedTask");
    }
  }
}

// finished function
function finished() {
  let result = document.querySelectorAll(".completed-lists");

  result.forEach((result) => {
    let div = document.querySelector(".savedReport");
    let div2 = document.createElement("div");
    div2.className = "resultWrapper";
    div.appendChild(div2);
    let i = document.createElement("i");
    i.className = "fa-solid fa-check-double done";
    let timeHolder = document.createElement("div");
    let date = new Date().toLocaleDateString();
    timeHolder.textContent = date;
    timeHolder.className = "time";
    div2.appendChild(i);
    div2.appendChild(timeHolder);
    let ul = document.createElement("ul");
    ul.className = "resultUl";
    let li = document.createElement("li");
    li.className = "resultLi";
    ul.appendChild(li);
    div.appendChild(ul);
    let parent = document.querySelector(".report");
    parent.appendChild(div);
    li.textContent = result.firstChild.textContent;
    repo(result.firstChild.textContent);
  });
  let newReport = document.querySelector(".reportList");
  localStorage.removeItem("completedTask");
  while (newReport.firstChild) {
    newReport.removeChild(newReport.firstChild);
  }
}

//

// store  report to local storage

function repo(e) {
  if (localStorage.getItem("report") === null) {
    report = [];
  } else {
    report = JSON.parse(localStorage.getItem("report"));
  }
  report.push(e);
  localStorage.setItem("report", JSON.stringify(report));
}

//
function getTask3() {
  let report;
  if (localStorage.getItem("report") === null) {
    report = [];
  } else {
    report = JSON.parse(localStorage.getItem("report"));
  }
  report.forEach((put) => {
    let div = document.querySelector(".savedReport");
    let div2 = document.createElement("div");
    div2.className = "resultWrapper";
    div.appendChild(div2);
    let i = document.createElement("i");
    i.className = "fa-solid fa-check-double done";
    let timeHolder = document.createElement("div");
    let date = new Date().toLocaleDateString();
    timeHolder.textContent = date;
    timeHolder.className = "time";
    div2.appendChild(i);
    div2.appendChild(timeHolder);
    let ul = document.createElement("ul");
    ul.className = "resultUl";
    let li = document.createElement("li");
    li.className = "resultLi";
    ul.appendChild(li);
    div.appendChild(ul);
    let parent = document.querySelector(".report");
    parent.appendChild(div);
    li.textContent = put;
  });
}
