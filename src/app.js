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

    // ------------------------------------------------------------
    // Rebuild helper functions
    // ------------------------------------------------------------

    /**
     * Rebuilds a subtask object from saved JSON data.
     * @param {Object} subtask - Raw subtask data from storage.
     * @returns {Object} A reconstructed subtask object.
     */
    function rebuildSubtask(subtask) {
        return createSubtask(subtask.title, subtask.id, subtask.complete);
    }

    /**
    * Rebuilds a task object from saved JSON data.
    * @param {Object} task - Raw task data from storage.
    * @returns {Object} A reconstructed task object.
    */
    function rebuildTask(task) {
        const subtasks = task.subtasks.map(rebuildSubtask);

        return createTask(task.title, task.id, task.dueDate, task.priority, task.note, task.complete, subtasks);
    }

    /**
     * Rebuilds a todo list object from saved JSON data.
     * @param {Object} list - Raw list data from storage.
     * @returns {Object} A reconstructed todo list object.
     */
    function rebuildList(list) {
        const tasks = list.tasks.map(rebuildTask);

        return createTodoList(list.title, list.id, tasks);
    }

    // ------------------------------------------------------------
    // Getter functions
    // ------------------------------------------------------------
    /**
     * Retrieves a list by ID.
     * @param {string} id - The list ID.
     * @returns {Object|undefined} The matching list or undefined.
     */
    function getList(id) {
        return getItemInArray(id, lists);
    }

    /**
     * Retrieves the currently selected list.
     * @returns {Object|null} The current list or null.
     */
    function getCurrentList() {
        return getList(currentListID);
    }

    /**
     * Retrieves the currently selected task.
     * @returns {Object|null} The current task or null.
     */
    function getCurrentTask() {
        const list = getCurrentList();

        if (!list) { return; }

        return list.getTask(currentTaskID);
    }


    // ------------------------------------------------------------
    // UI refresh helpers
    // ------------------------------------------------------------
    /**
     * Refreshes the task list UI for the current list.
     */
    function refreshTasksUI() {
        const list = getCurrentList();

        if (!list) { return; }

        ui.displayTasks(list.getTasks());
    }

    /**
     * Refreshes the subtask list UI for the current task.
     */
    function refreshSubtasksUI() {
        const task = getCurrentTask();

        if (!task) { return; }

        ui.displaySubtasks(task.getSubtasks());
    }

    /**
     * Refreshes the sidebar list UI.
     */
    function refreshListsUI() {
        ui.displayLists(lists);
    }

    // ------------------------------------------------------------
    // Load & Save
    // ------------------------------------------------------------
    /**
     * Loads saved lists from localStorage and rebuilds them.
     */
    function loadLists() {
        const data = JSON.parse(localStorage.getItem("savedLists"));

        if (!data) { return; }

        lists = data.map(rebuildList);

        refreshListsUI();
    }

    /**
     * Saves the current lists array to localStorage.
     */
    function saveLists() {
        localStorage.setItem("savedLists", JSON.stringify(lists));
    }

    /**
     * Deletes a list by ID.
     * @param {string} id - The list ID.
     */
    function deleteList(id) {
        removeItemFromArray(id, lists);
    }

    // ------------------------------------------------------------
    // New List Modal
    // ------------------------------------------------------------

    /**
     * Shows the "new list" modal.
     */
    function showNewListModal() {
        newListModal.classList.remove("hidden");
    }

    /**
     * Hides the "new list" modal.
     */
    function hideNewListModal() {
        newListModal.classList.add("hidden");
    }

    addListButton.addEventListener("click", () => {
        showNewListModal();
    });

    newListCancelButton.addEventListener("click", () => {
        hideNewListModal();
    });

    newListForm.addEventListener("submit", event => {
        event.preventDefault();

        const newListName = newListNameInput.value;

        if (!newListName) { return; }

        lists.push(createTodoList(newListName));
        saveLists();

        newListForm.reset();
        hideNewListModal();

        refreshListsUI();
    });

    // ------------------------------------------------------------
    // List interactions
    // ------------------------------------------------------------
    toDoLists.addEventListener("click", event => {
        const listItem = event.target.closest("li");

        if (!listItem) { return; }

        const list = getList(listItem.dataset.id);
        currentListID = listItem.dataset.id;

        const deleteListButton = event.target.closest(".delete-list");

        if (deleteListButton) {
            deleteList(currentListID);
            currentListID = null;
            currentTaskID = null;
            ui.hideTasksModal();
            refreshListsUI();
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

    // ------------------------------------------------------------
    // Task creation
    // ------------------------------------------------------------
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

    // ------------------------------------------------------------
    // Task interactions
    // ------------------------------------------------------------
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
            currentTaskID = null;
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

    // ------------------------------------------------------------
    // Task detail updates
    // ------------------------------------------------------------
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

    // ------------------------------------------------------------
    // Subtask creation
    // ------------------------------------------------------------
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

    // ------------------------------------------------------------
    // Subtask interactions
    // ------------------------------------------------------------
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

    loadLists();
})();


export { app };