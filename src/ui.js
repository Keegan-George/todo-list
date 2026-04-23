import trashCanImg from "./img/trash-can.svg"
import { formatDistanceToNow } from "date-fns"

//DOM Static Element References
const toDoListsElement = document.querySelector(".todo-lists");
const listTitleElement = document.querySelector(".list-title");
const tasksListElement = document.querySelector(".tasks");

const tasksModal = document.querySelector(".tasks-modal");
const taskDetailsModal = document.querySelector(".task-details");

const taskTitleElement = document.querySelector(".task-header");
const dueDateElement = document.querySelector("#due-date");
const priorityElement = document.querySelector("#priority");
const noteElement = document.querySelector("#note");
const subtasksListElement = document.querySelector("#subtasks");


const ui = (() => {
    function displayLists(lists) {
        toDoListsElement.replaceChildren();

        lists.forEach(list => {
            const li = document.createElement("li");
            li.textContent = list.getTitle();
            li.dataset.id = list.getID();

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.classList.add("delete-list");
            deleteButton.appendChild(createTrashIcon());
            li.appendChild(deleteButton);

            toDoListsElement.appendChild(li);
        });
    }

    function showTasksModal() {
        tasksModal.classList.remove("hidden");
    }

    function hideTasksModal() {
        tasksModal.classList.add("hidden");
        hideTaskDetailsModal();
    }

    function displayListTitle(title) {
        listTitleElement.textContent = title;
    }

    function displayTasks(tasks) {
        tasksListElement.replaceChildren();

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.dataset.id = task.getID();
            li.classList.add("task");

            li.appendChild(createCheckbox(task.isComplete()));

            const taskName = document.createElement("div");
            taskName.classList.add("task-name");
            taskName.textContent = task.getTitle();
            li.appendChild(taskName);

            const badges = document.createElement("div");
            badges.classList.add("badges");
            li.appendChild(badges);

            const dueDate = task.getDueDate();
            if (dueDate) {
                const timeRemaining = formatDistanceToNow(new Date(dueDate), { addSuffix: true });
                badges.appendChild(createBadge("due-date", `Due ${timeRemaining}`));
            }

            const priority = task.getPriority();
            if (priority) {
                const priorityBadge = createBadge("priority", priority)
                priorityBadge.classList.add(priority);
                badges.appendChild(priorityBadge);
            }

            if (task.getNote()) {
                badges.appendChild(createBadge("note", "See note"));
            }

            const subtasks = task.getSubtasks();
            const numberOfSubtasks = subtasks.length
            if (numberOfSubtasks) {
                badges.appendChild(createBadge("subtasks", `${numberOfSubtasks} ${numberOfSubtasks > 1 ? "subtasks" : "subtask"}`));
            }

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.classList.add("delete-task");
            li.appendChild(deleteButton);

            deleteButton.appendChild(createTrashIcon());

            tasksListElement.appendChild(li);
        });
    }

    function showTaskDetailsModal() {
        taskDetailsModal.classList.remove("hidden");
    }

    function hideTaskDetailsModal() {
        taskDetailsModal.classList.add("hidden");
    }

    function displayTaskDetails(task) {
        taskTitleElement.textContent = task.getTitle();

        const dueDate = task.getDueDate();
        dueDateElement.value = dueDate ?? "";

        const priority = task.getPriority();
        priorityElement.value = priority ?? "";

        const note = task.getNote();
        noteElement.value = note ?? "";

        displaySubtasks(task.getSubtasks());
    }

    function displaySubtasks(subtasks) {
        subtasksListElement.replaceChildren();

        subtasks.forEach(subtask => {
            const li = document.createElement("li");
            li.dataset.id = subtask.getID();
            li.classList.add("subtask");

            li.appendChild(createCheckbox(subtask.isComplete()));

            const subtaskName = document.createElement("div");
            subtaskName.classList.add("subtask-name");
            subtaskName.textContent = subtask.getTitle();
            li.appendChild(subtaskName);

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.classList.add("delete-subtask");
            li.appendChild(deleteButton);

            deleteButton.appendChild(createTrashIcon());

            subtasksListElement.appendChild(li);
        });
    }

    //Helper Functions    
    function createTrashIcon() {
        const img = document.createElement("img");
        img.src = trashCanImg;
        img.alt = "trash can icon";
        return img;
    }

    function createCheckbox(isChecked) {
        const checkbox = document.createElement("div");
        checkbox.classList.add("checkbox");

        if (isChecked) {
            checkbox.classList.add("checked");
        }

        return checkbox;
    }

    function createBadge(className, text) {
        const badge = document.createElement("div");
        badge.classList.add("badge", `${className}-badge`);
        badge.textContent = text;

        return badge;
    }

    return {
        displayLists,
        displayListTitle,
        displayTasks,
        displayTaskDetails,
        displaySubtasks,
        showTasksModal,
        hideTasksModal,
        showTaskDetailsModal,
        hideTaskDetailsModal
    };
})();

export { ui };