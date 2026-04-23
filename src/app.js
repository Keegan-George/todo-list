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
    let currentListID = null;
    let currentTaskID = null;

    // Helper functions for rebuilding subtasks, tasks and lists
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

    //Helper functions for retrieving the current list and current task
    function getCurrentList() {
        return getList(currentListID);
    }

    function getCurrentTask() {
        return getCurrentList().getTask(currentTaskID);
    }

    //Helper funtions for refreshing the UI
    function refreshTasksUI() {
        ui.displayTasks(getCurrentList().getTasks());
    }

    function refreshSubtasksUI() {
        ui.displaySubtasks(getCurrentTask().getSubtasks());
    }


    function loadLists() {
        const data = JSON.parse(localStorage.getItem("savedLists"));

        if (!data) { return; }

        lists = data.map(rebuildList);

        ui.displayLists(lists)
    }

    loadLists();


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
            refreshTasksUI();
        }

        ui.hideTaskDetailsModal();
    });


    newTaskForm.addEventListener("submit", event => {
        event.preventDefault();

        const newTaskName = newTaskNameInput.value;

        if (!newTaskName) { return; }

        const currentList = getCurrentList();

        currentList.addTask(newTaskName);
        saveLists();

        refreshTasksUI();

        newTaskForm.reset();
    });

    tasksListElement.addEventListener("click", event => {
        const taskItem = event.target.closest("li");

        if (!taskItem) { return; }

        currentTaskID = taskItem.dataset.id;
        const currentList = getCurrentList();
        const currentTask = getCurrentTask();

        const deleteTaskButton = event.target.closest(".delete-task");

        const checkbox = event.target.closest(".checkbox");

        if (deleteTaskButton) {
            currentList.deleteTask(currentTaskID);
            currentTaskID = undefined;
            refreshTasksUI();
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
        const currentList = getCurrentList();
        const task = getCurrentTask();

        task.setDueDate(dueDateInput.value);
        saveLists();
        refreshTasksUI();
    });

    prioritySelector.addEventListener("change", () => {
        const currentList = getCurrentList();
        const task = getCurrentTask();

        task.setPriority(prioritySelector.value);

        saveLists();

        refreshTasksUI();
    });

    noteInput.addEventListener("change", () => {
        const currentList = getCurrentList();
        const task = getCurrentTask();

        task.setNote(noteInput.value);

        saveLists();

        refreshTasksUI();
    });

    subtaskInput.addEventListener("change", () => {
        const currentList = getCurrentList();
        const currentTask = getCurrentTask();

        currentTask.addSubtask(subtaskInput.value);
        subtaskInput.value = "";

        saveLists();

        refreshSubtasksUI();
        refreshTasksUI();
    });

    taskDetailsForm.addEventListener("submit", event => {
        event.preventDefault();
    });

    subtasksListElement.addEventListener("click", event => {
        const listItem = event.target.closest("li");

        if (!listItem) { return; }

        const currentList = getCurrentList();
        const currentTask = getCurrentTask();
        const subtaskID = listItem.dataset.id;

        const deleteSubtaskButton = event.target.closest(".delete-subtask");

        const checkbox = event.target.closest(".checkbox");

        if (deleteSubtaskButton) {
            currentTask.deleteSubtask(subtaskID);

            refreshSubtasksUI();
            refreshTasksUI();
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