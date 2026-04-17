import trashCanImg from "./img/trash-can.svg"
import {formatDistanceToNow} from "date-fns"

const ui = (() => {
    function displayLists(lists) {
        const toDoListsElement = document.querySelector(".todo-lists");
        toDoListsElement.replaceChildren();

        lists.forEach(list => {
            const li = document.createElement("li");
            li.textContent = list.getTitle();
            li.dataset.id = list.getID();

            const trashIcon = document.createElement("img");
            trashIcon.src = trashCanImg;
            trashIcon.alt = "trash can icon";

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.classList.add("delete-list");
            deleteButton.appendChild(trashIcon);
            li.appendChild(deleteButton);

            toDoListsElement.appendChild(li);
        });
    }

    const tasksModal = document.querySelector(".tasks-modal");
    function showTasksModal() {
        tasksModal.classList.remove("hidden");
    }

    function hideTasksModal() {
        tasksModal.classList.add("hidden");
        hideTaskDetailsModal();
    }

    function displayListTitle(title) {
        const listTitle = document.querySelector(".list-title");
        listTitle.textContent = title;
    }

    function displayTasks(tasks) {
        const tasksListElement = document.querySelector(".tasks");
        tasksListElement.replaceChildren();

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.dataset.id = task.getID();
            li.classList.add("task");

            const checkbox = document.createElement("div");
            checkbox.classList.add("checkbox");
            li.appendChild(checkbox);

            if (task.isComplete()) {
                checkbox.classList.add("checked");
            }

            const taskName = document.createElement("div");
            taskName.classList.add("task-name");
            taskName.textContent = task.getTitle();
            li.appendChild(taskName);

            const badges = document.createElement("div");
            badges.classList.add("badges");
            li.appendChild(badges);

            const dueDate = task.getDueDate();
            if (dueDate) {
                const dueDateBadge = document.createElement("div");
                dueDateBadge.classList.add("due-date-badge", "badge");

                const timeRemaining = formatDistanceToNow(new Date(dueDate), {addSuffix: true});
                dueDateBadge.textContent = `Due ${timeRemaining}`;

                badges.appendChild(dueDateBadge);
            }

            const priority = task.getPriority();
            if (priority) {
                const priorityBadge = document.createElement("div");
                priorityBadge.classList.add("priority-badge", "badge", priority);
                priorityBadge.textContent = priority;
                badges.appendChild(priorityBadge);
            }

            if (task.getNote()) {
                const noteBadge = document.createElement("div");
                noteBadge.classList.add("note-badge", "badge");
                noteBadge.textContent = "See note";
                badges.appendChild(noteBadge);
            }

            const subtasks = task.getSubTasks();
            const numberOfSubtasks = subtasks.length
            if (numberOfSubtasks) {
                const subtasksBadge = document.createElement("div");
                subtasksBadge.classList.add("subtasks-badge", "badge");
                subtasksBadge.textContent = `${numberOfSubtasks} ${numberOfSubtasks > 1 ? "subtasks" : "subtask"}`;

                badges.appendChild(subtasksBadge);
            }

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.classList.add("delete-task");
            li.appendChild(deleteButton);

            const trashIcon = document.createElement("img");
            trashIcon.src = trashCanImg;
            trashIcon.alt = "trash can icon";
            deleteButton.appendChild(trashIcon);

            tasksListElement.appendChild(li);
        });
    }

    const taskDetailsModal = document.querySelector(".task-details");
    function showTaskDetailsModal() {
        taskDetailsModal.classList.remove("hidden");
    }

    function hideTaskDetailsModal() {
        taskDetailsModal.classList.add("hidden");
    }

    function displayTaskDetails(task) {
        const taskTitleElement = document.querySelector(".task-header");
        const dueDateElement = document.querySelector("#due-date");
        const priorityElement = document.querySelector("#priority");
        const noteElement = document.querySelector("#note");

        taskTitleElement.textContent = task.getTitle();

        const dueDate = task.getDueDate();
        dueDateElement.value = dueDate === undefined ? "" : dueDate;

        const priority = task.getPriority();
        priorityElement.value = priority === undefined ? "default" : priority;

        const note = task.getNote();
        noteElement.value = note === undefined ? "" : note;

        displaySubtasks(task.getSubTasks());
    }

    function displaySubtasks(subtasks) {
        const subtasksListElement = document.querySelector("#subtasks");
        subtasksListElement.replaceChildren();

        subtasks.forEach(subtask => {
            const li = document.createElement("li");
            li.dataset.id = subtask.getID();
            li.classList.add("subtask");

            const checkbox = document.createElement("div");
            checkbox.classList.add("checkbox");
            li.appendChild(checkbox);

            if (subtask.isComplete()) {
                checkbox.classList.add("checked");
            }

            const subtaskName = document.createElement("div");
            subtaskName.classList.add("subtask-name");
            subtaskName.textContent = subtask.getTitle();
            li.appendChild(subtaskName);

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.classList.add("delete-subtask");
            li.appendChild(deleteButton);

            const trashIcon = document.createElement("img");
            trashIcon.src = trashCanImg;
            trashIcon.alt = "trash can icon";
            deleteButton.appendChild(trashIcon);

            subtasksListElement.appendChild(li);
        });
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