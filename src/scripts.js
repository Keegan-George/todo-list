import trashCanImg from "./img/trash-can.svg"

function createTask(title, startDate, dueDate, priority, note) {
    const id = crypto.randomUUID();
    let taskTitle = title;
    let taskStartDate = startDate;
    let taskDueDate = dueDate;
    let taskPriority = priority;
    let taskNote = note;
    let complete = false;
    let subTasks = [];

    function getID() {
        return id;
    }

    function getTitle() {
        return taskTitle;
    }

    function setTitle(newTitle) {
        taskTitle = newTitle;
    }

    function getStartDate() {
        return taskStartDate;
    }

    function setStartDate(newDate) {
        taskStartDate = newDate;
    }

    function getDueDate() {
        return taskDueDate;
    }

    function setDueDate(newDate) {
        taskDueDate = newDate;
    }

    function getPriority() {
        return taskPriority;
    }

    function setPriority(newPriority) {
        taskPriority = newPriority;
    }

    function getNote() {
        return taskNote;
    }

    function setNote(newNote) {
        taskNote = newNote
    }

    function toggleComplete() {
        complete = !complete;
    }

    function addSubTask(subtaskTitle) {
        subTasks.push(createSubTask(subtaskTitle));
    }

    function getSubTask(id) {
        return getItemInArray(id, subTasks);
    }

    function deleteSubtask(id) {
        removeItemFromArray(id, subTasks);
    }

    function getSubTasks() {
        return subTasks;
    }

    return {
        getID,
        getTitle,
        setTitle,
        getStartDate,
        setStartDate,
        getDueDate,
        setDueDate,
        getPriority,
        setPriority,
        getNote,
        setNote,
        toggleComplete,
        addSubTask,
        getSubTask,
        deleteSubtask,
        getSubTasks
    };
}

function createSubTask(title) {
    const id = crypto.randomUUID();
    let subTaskTitle = title;
    let complete = false;

    function getID() {
        return id;
    }

    function getTitle() {
        return subTaskTitle;
    }

    function setTitle(newTitle) {
        subTaskTitle = newTitle;
    }

    function toggleComplete() {
        complete = !complete;
    }

    return { getID, getTitle, setTitle, toggleComplete }
}

function createTodoList(title) {
    const id = crypto.randomUUID();
    let toDoTitle = title;
    let tasks = [];

    function getID() {
        return id;
    }

    function getTitle() {
        return toDoTitle;
    }

    function setTitle(newTitle) {
        toDoTitle = newTitle;
    }

    function getTasks() {
        return tasks;
    }

    function addTask(title, dueDate, priority, note) {
        tasks.push(createTask(title, dueDate, priority, note));
    }

    function getTask(id) {
        return getItemInArray(id, tasks);
    }

    function deleteTask(id) {
        removeItemFromArray(id, tasks);
    }

    return { getID, getTitle, setTitle, getTasks, addTask, getTask, deleteTask };
}

function getItemInArray(id, array) {
    return array.find(element => element.getID() == id);
}

function removeItemFromArray(id, array) {
    const index = array.findIndex(element => element.getID() == id);
    array.splice(index, 1);
}

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

            const taskName = document.createElement("div");
            taskName.classList.add("task-name");
            taskName.textContent = task.getTitle();
            li.appendChild(taskName);

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

const app = (() => {
    const lists = [];
    let currentListID = undefined;
    let currentTaskID = undefined;

    //List functions
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
        }
        else {
            ui.displayListTitle(list.getTitle());
            ui.showTasksModal();
            ui.displayTasks(list.getTasks());
        }
    });

    //Task functions
    const newTaskForm = document.querySelector(".new-task-form");
    newTaskForm.addEventListener("submit", event => {
        event.preventDefault();

        const newTaskName = document.querySelector("#new-task-name").value;

        if (!newTaskName) { return; }

        const currentList = getList(currentListID);

        currentList.addTask(newTaskName);

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
            ui.displayTasks(currentList.getTasks())
            ui.hideTaskDetailsModal();
        }
        else if (checkbox) {
            checkbox.classList.toggle("checked");
            currentTask.toggleComplete();
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
    });

    const prioritySelector = document.querySelector("#priority");
    prioritySelector.addEventListener("change", () => {
        const currentList = getList(currentListID);
        const task = currentList.getTask(currentTaskID);
        task.setPriority(prioritySelector.value);
    });

    const noteInput = document.querySelector("#note");
    noteInput.addEventListener("change", () => {
        const currentList = getList(currentListID);
        const task = currentList.getTask(currentTaskID);
        task.setNote(noteInput.value);
    });

    const subtaskInput = document.querySelector("#new-subtask-name");
    subtaskInput.addEventListener("change", () => {
        const currentList = getList(currentListID);
        const task = currentList.getTask(currentTaskID);
        task.addSubTask(subtaskInput.value);

        ui.displaySubtasks(task.getSubTasks());
        subtaskInput.value = "";
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
            ui.displaySubtasks(currentTask.getSubTasks());
        }
        else if (checkbox) {
            checkbox.classList.toggle("checked");
            currentTask.getSubTask(subtaskID).toggleComplete();
        }
    });
})();


export { createTodoList };