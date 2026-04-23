import { ui } from "./ui.js";
import { createTask, createSubtask, createTodoList, getItemInArray, removeItemFromArray } from "./todo.js";

//DOM Static Element References
const newListModal = document.querySelector(".new-list-modal");
const newListForm = document.querySelector(".new-list-form");
const newListNameInput = document.querySelector("#new-list-name");
const addListButton = document.querySelector(".add-list");
const newListCancelButton = document.querySelector(".new-list-cancel");
const toDoLists = document.querySelector(".todo-lists");

const newTaskForm = document.querySelector(".new-task-form");
const newTaskNameInput = document.querySelector("#new-task-name");
const tasksListElement = document.querySelector(".tasks");

const taskDetailsForm = document.querySelector(".task-details-form");
const dueDateInput = document.querySelector("#due-date");
const prioritySelector = document.querySelector("#priority");
const noteInput = document.querySelector("#note");
const subtasksListElement = document.querySelector("#subtasks");
const subtaskInput = document.querySelector("#new-subtask-name");


const app = (() => {
    let lists = [];
    let currentListID = undefined;
    let currentTaskID = undefined;

    function loadLists() {
        const data = JSON.parse(localStorage.getItem("savedLists"));

        if (!data) { return; }

        lists = data.map(rebuildList);

        ui.displayLists(lists)
    }

    loadLists();

    // Helper functions for rebuilding lists, tasks and subtasks
    function rebuildSubtask(subtask) {
        return createSubtask(subtask.title, subtask.id, subtask.complete);
    }

    function rebuildTask(task) {
        const subtasks = task.subtasks.map(rebuildSubtask);

        return createTask(task.title, task.id, task.dueDate, task.priority, task.note, task.complete, subtasks);
    }

    function rebuildList(list) {
        const tasks = list.tasks.map(rebuildTask);

        return createTodoList(list.title, list.id, tasks);
    }


    function saveLists() {
        localStorage.setItem("savedLists", JSON.stringify(lists));
    }



    function getList(id) {
        return getItemInArray(id, lists);
    }

    function deleteList(id) {
        removeItemFromArray(id, lists);
    }

    function closeNewListModal() {
        newListModal.classList.toggle("hidden");
    }


    addListButton.addEventListener("click", () => {
        closeNewListModal()
    });


    newListCancelButton.addEventListener("click", () => {
        closeNewListModal();
    });


    newListForm.addEventListener("submit", event => {
        event.preventDefault();

        const newListName = newListNameInput.value;

        if (!newListName) { return; }

        lists.push(createTodoList(newListName));
        saveLists();

        newListForm.reset();
        newListModal.classList.toggle("hidden");

        ui.displayLists(lists);
    });


    toDoLists.addEventListener("click", event => {
        const listItem = event.target.closest("li");

        if (!listItem) { return; }

        const list = getList(listItem.dataset.id);
        currentListID = listItem.dataset.id;

        const deleteListButton = event.target.closest(".delete-list");

        if (deleteListButton) {
            deleteList(currentListID);
            currentListID = undefined;
            currentTaskID = undefined;
            ui.hideTasksModal();
            ui.displayLists(lists);
            ui.displayListTitle("");
            saveLists();
        }
        else {
            ui.displayListTitle(list.getTitle());
            ui.showTasksModal();
            ui.displayTasks(list.getTasks());
        }

        ui.hideTaskDetailsModal();
    });


    newTaskForm.addEventListener("submit", event => {
        event.preventDefault();

        const newTaskName = newTaskNameInput.value;

        if (!newTaskName) { return; }

        const currentList = getList(currentListID);

        currentList.addTask(newTaskName);
        saveLists();

        ui.displayTasks(currentList.getTasks());

        newTaskForm.reset();
    });

    //Tasks

    tasksListElement.addEventListener("click", event => {
        const taskItem = event.target.closest("li");

        if (!taskItem) { return; }

        currentTaskID = taskItem.dataset.id;
        const currentList = getList(currentListID);
        const currentTask = currentList.getTask(currentTaskID);

        const deleteTaskButton = event.target.closest(".delete-task");

        const checkbox = event.target.closest(".checkbox");

        if (deleteTaskButton) {
            currentList.deleteTask(currentTaskID);
            currentTaskID = undefined;
            ui.displayTasks(currentList.getTasks());
            ui.hideTaskDetailsModal();
            saveLists();
        }
        else if (checkbox) {
            checkbox.classList.toggle("checked");
            currentTask.toggleComplete();
            saveLists();
        }
        else {
            ui.showTaskDetailsModal();
            ui.displayTaskDetails(currentTask);
        }
    });


    dueDateInput.addEventListener("change", () => {
        const currentList = getList(currentListID);
        const task = currentList.getTask(currentTaskID);
        task.setDueDate(dueDateInput.value);
        saveLists();
        ui.displayTasks(currentList.getTasks());
    });


    prioritySelector.addEventListener("change", () => {
        const currentList = getList(currentListID);
        const task = currentList.getTask(currentTaskID);
        task.setPriority(prioritySelector.value);
        saveLists();
        ui.displayTasks(currentList.getTasks());
    });


    noteInput.addEventListener("change", () => {
        const currentList = getList(currentListID);
        const task = currentList.getTask(currentTaskID);
        task.setNote(noteInput.value);
        saveLists();
        ui.displayTasks(currentList.getTasks());
    });


    subtaskInput.addEventListener("change", () => {
        const currentList = getList(currentListID);
        const task = currentList.getTask(currentTaskID);
        task.addSubtask(subtaskInput.value);
        saveLists();

        ui.displaySubtasks(task.getSubtasks());
        subtaskInput.value = "";
        ui.displayTasks(currentList.getTasks());
    });


    taskDetailsForm.addEventListener("submit", event => {
        event.preventDefault();
    });


    subtasksListElement.addEventListener("click", event => {
        const listItem = event.target.closest("li");

        if (!listItem) { return; }

        const currentList = getList(currentListID);
        const currentTask = currentList.getTask(currentTaskID);
        const subtaskID = listItem.dataset.id;

        const deleteSubtaskButton = event.target.closest(".delete-subtask");

        const checkbox = event.target.closest(".checkbox");

        if (deleteSubtaskButton) {
            currentTask.deleteSubtask(subtaskID);
            ui.displaySubtasks(currentTask.getSubtasks());
            ui.displayTasks(currentList.getTasks());
            saveLists();
        }
        else if (checkbox) {
            checkbox.classList.toggle("checked");
            currentTask.getSubtask(subtaskID).toggleComplete();
            saveLists();
        }
    });
})();


export { app };