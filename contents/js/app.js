const taskInput = document.querySelector(".taskInput");
const addBtn = document.querySelector(".primary-btn");
const clearTasks = document.querySelector(".secondary-btn");
const filterTask = document.querySelector(".filterInput");
const ul = document.querySelector(".ul");
const formList = document.querySelector(".taskList");
const reportCardForm = document.querySelector(".reportList");
const reportCard_ul = document.querySelector(".reportList-ul");
const reportCardList = document.querySelector(".completed-lists");

// events

function loadAllevent() {
  // DOM load evet

  document.addEventListener("DOMContentLoaded", getTask);
  document.addEventListener("DOMContentLoaded", getTask2);

  //

  addBtn.addEventListener("click", addTask);
  formList.addEventListener("click", removeTask);
  clearTasks.addEventListener("click", reset);
  filterTask.addEventListener("input", filter);

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
    alert("Congratulations, Keep it up!");
    return deleteLs(
      e.target.parentElement.parentElement.firstChild.textContent
    );
  }
  //

  function run(e) {
    e.target.parentElement.parentElement.remove();
    return write(e.target.parentElement.parentElement.firstChild.textContent);
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
    li.textContent = one;
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

  // check list event listeners

  check.addEventListener("click", run);
  check.addEventListener("click", run2);

  //

  //  check Funtion to get task-list value to add to completed task local storage

  function run2(e) {
    alert("Congratulations, Keep it up!");
    return deleteLs(
      e.target.parentElement.parentElement.firstChild.textContent
    );
  }

  //

  // Funtion to get task-list value to delete from task local storage

  function run(e) {
    e.target.parentElement.parentElement.remove();
    return write(e.target.parentElement.parentElement.firstChild.textContent);
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
  li.textContent = e;
  ol.appendChild(li);
  reportCardForm.appendChild(ol);
  console.log(e);
  storeTaskToLocalStorage2(e);
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
  if (formList.innerHTML === "" && reportCardForm.innerHTML === "") {
    alert("Done");
  } else {
    if (confirm("Do you want to reset ?")) {
      while (formList.firstChild) {
        formList.removeChild(formList.firstChild);
      }
      while (reportCardForm.firstChild) {
        reportCardForm.removeChild(reportCardForm.firstChild);
        localStorage.clear();
      }
    }
  }
}

//

// no.4 Filter task funtion

function filter(e) {
  let text = e.target.value.toLowerCase();

  let task = document.querySelectorAll(".list-items");

  task.forEach((task) => {
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "flex";
      task.style.justifyContent = "space-between";
    } else {
      task.style.display = "none";
    }
  });
}

//

// no.5 save task function
// function saveTask() {
//   if (formList.innerHTML === "") {
//     alert("Task list is empty!, please add task to proceed");
//   } else {
//     if (confirm("Proceed to Submit Tasks?")) {
//       alert("Task saved");
//       let items = document.querySelectorAll(".list-items");

//       items.forEach((items) => {
//         let text = items.firstChild.textContent;
//         let taskResult;
//         if (localStorage.getItem("taskResult") === null) {
//           taskResult = [];
//         } else {
//           taskResult = JSON.parse(localStorage.getItem("taskResult"));
//         }
//         taskResult.push(text);
//         localStorage.setItem("taskResult", JSON.stringify(taskResult));
//       });

//       formList.innerHTML = "";
//     }
//   }
// }

//
