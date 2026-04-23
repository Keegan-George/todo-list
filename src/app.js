import { ui } from "./ui.js";
import { createTask, createSubtask, createTodoList, getItemInArray, removeItemFromArray } from "./todo.js";

//DOM Static Element References

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

    // Help functions for rebuilding lists, tasks and subtasks
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

    const newListModal = document.querySelector(".new-list-modal");

    function getList(id) {
        return getItemInArray(id, lists);
    }

    function deleteList(id) {
        removeItemFromArray(id, lists);
    }

    function closeNewListModal() {
        newListModal.classList.toggle("hidden");
    }

    const addListButton = document.querySelector(".add-list");
    addListButton.addEventListener("click", () => {
        closeNewListModal()
    });

    const newListCancelButton = document.querySelector(".new-list-cancel");
    newListCancelButton.addEventListener("click", () => {
        closeNewListModal();
    });

    const newListForm = document.querySelector(".new-list-form");
    newListForm.addEventListener("submit", event => {
        event.preventDefault();

        const newListName = document.querySelector("#new-list-name").value;

        if (!newListName) { return; }

        lists.push(createTodoList(newListName));
        saveLists();

        newListForm.reset();
        newListModal.classList.toggle("hidden");

        ui.displayLists(lists);
    });

    const toDoLists = document.querySelector(".todo-lists");
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

    const newTaskForm = document.querySelector(".new-task-form");
    newTaskForm.addEventListener("submit", event => {
        event.preventDefault();

        const newTaskName = document.querySelector("#new-task-name").value;

        if (!newTaskName) { return; }

        const currentList = getList(currentListID);

        currentList.addTask(newTaskName);
        saveLists();

        ui.displayTasks(currentList.getTasks());

        newTaskForm.reset();
    });

    //Tasks
    const tasksListElement = document.querySelector(".tasks");
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

    const dueDateInput = document.querySelector("#due-date");
    dueDateInput.addEventListener("change", () => {
        const currentList = getList(currentListID);
        const task = currentList.getTask(currentTaskID);
        task.setDueDate(dueDateInput.value);
        saveLists();
        ui.displayTasks(currentList.getTasks());
    });

    const prioritySelector = document.querySelector("#priority");
    prioritySelector.addEventListener("change", () => {
        const currentList = getList(currentListID);
        const task = currentList.getTask(currentTaskID);
        task.setPriority(prioritySelector.value);
        saveLists();
        ui.displayTasks(currentList.getTasks());
    });

    const noteInput = document.querySelector("#note");
    noteInput.addEventListener("change", () => {
        const currentList = getList(currentListID);
        const task = currentList.getTask(currentTaskID);
        task.setNote(noteInput.value);
        saveLists();
        ui.displayTasks(currentList.getTasks());
    });

    const subtaskInput = document.querySelector("#new-subtask-name");
    subtaskInput.addEventListener("change", () => {
        const currentList = getList(currentListID);
        const task = currentList.getTask(currentTaskID);
        task.addSubtask(subtaskInput.value);
        saveLists();

        ui.displaySubtasks(task.getSubtasks());
        subtaskInput.value = "";
        ui.displayTasks(currentList.getTasks());
    });

    const taskDetailsForm = document.querySelector(".task-details-form");
    taskDetailsForm.addEventListener("submit", event => {
        event.preventDefault();
    });

    const subtasksListElement = document.querySelector("#subtasks");
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