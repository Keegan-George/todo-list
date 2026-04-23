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
    /**
     * Renders the list of todo lists in the sidebar.
     * @param {Array<Object>} lists - Array of todo list objects.
     */
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

    /**
     * Shows the tasks modal.
     */
    function showTasksModal() {
        tasksModal.classList.remove("hidden");
    }

    /**
     * Hides the tasks modal and also hides the task details modal.
     */
    function hideTasksModal() {
        tasksModal.classList.add("hidden");
        hideTaskDetailsModal();
    }

    /**
    * Displays the title of the currently selected list.
    * @param {string} title - The list title.
    */
    function displayListTitle(title) {
        listTitleElement.textContent = title;
    }

    /**
     * Renders all tasks for the selected list.
     * @param @param {Array<Object>} tasks - Array of task objects.
     */
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

    /**
     * Shows the task details modal.
     */
    function showTaskDetailsModal() {
        taskDetailsModal.classList.remove("hidden");
    }

    /**
     * Hides the task details modal.
     */
    function hideTaskDetailsModal() {
        taskDetailsModal.classList.add("hidden");
    }

    /**
     * Displays the details of a selected task inside the task details modal.
     * @param {Object} task - The task object.
     */
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

    /**
     * Renders all subtasks for the selected task.
     * @param {Array<Object>} subtasks - Array of subtask objects.
     */
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
    /**
     * Creates a trash can icon element.
     * @returns {HTMLImageElement} The trash icon element.
     */
    function createTrashIcon() {
        const img = document.createElement("img");
        img.src = trashCanImg;
        img.alt = "trash can icon";
        return img;
    }

    /**
     * Creates a custom checkbox element.
     * @param {boolean} isChecked - Whether the checkbox should appear checked.
     * @returns {HTMLDivElement} The checkbox element.
     */
    function createCheckbox(isChecked) {
        const checkbox = document.createElement("div");
        checkbox.classList.add("checkbox");

        if (isChecked) {
            checkbox.classList.add("checked");
        }

        return checkbox;
    }

    /**
     * Creates a badge element with a specific type and text.
     * @param {string} className - The base class name (e.g., "priority", "note").
     * @param {string} text - The text content of the badge.
     * @returns {HTMLDivElement} The badge element.
     */
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