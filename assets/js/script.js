//var buttonEl = document.querySelector("#save-task");
var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// buttonEl.addEventListener("click", function () {
//     var listItemEl = document.createElement("li");
//     listItemEl.className = "task-item";
//     listItemEl.textContent = "This is a new  task.";
//     tasksToDoEl.appendChild(listItemEl);
// })

var taskFormHandler = function () {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    // Package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // Send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

}

var createTaskEl = function (taskDataObj) {
    // Create List Item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter)

    // Create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";     // Give Class Name

    // Add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // Import Task Actions
    var taskActionsEl = createTaskActions(taskIdCounter)
    //console.log(taskActionsEl);
    listItemEl.appendChild(taskActionsEl);

    // Add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // Increase task counter for next unique id
    taskIdCounter++;
}

var createTaskActions = function (taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // Create Edit Button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // Create Delete Button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // Create Status Select
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId)

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"]

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;

}

//buttonEl.addEventListener("click", taskFormHandler);
formEl.addEventListener("submit", taskFormHandler);