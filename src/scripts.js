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

    function removeSubTask(id) {
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
        removeSubTask,
        getSubTasks
    };
}

function createSubTask(title) {
    const id = crypto.randomUUID();
    let subTaskTitle = title;

    function getID() {
        return id;
    }

    function getTitle() {
        return subTaskTitle;
    }

    function setTitle(newTitle) {
        subTaskTitle = newTitle;
    }

    return { getID, getTitle, setTitle }
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

    function removeTask(id) {
        removeItemFromArray(id, tasks);
    }

    return { getID, getTitle, setTitle, getTasks, addTask, getTask, removeTask };
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
            toDoListsElement.appendChild(li);
        });
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
            li.textContent = task.getTitle();
            li.dataset.id = task.getID();
            tasksListElement.appendChild(li);
        })
    }

    function displayTaskDetails(task) {
        const taskTitleElement = document.querySelector(".task-title");
        const dueDateElement = document.querySelector("#due-date");
        const priorityElement = document.querySelector("#priority");
        const noteElement = document.querySelector("#note");
        const subtasksListElement = document.querySelector("#subtasks");

        taskTitleElement.textContent = task.getTitle();

        const dueDate = task.getDueDate();
        if (dueDate) {
            dueDateElement.value = dueDate
        }

        const priority = task.getPriority();
        if (priority) {
            priorityElement.value = priority;
        }

        const note = task.getNote();
        if (note) {
            noteElement.value = note;
        }

        const subTasks = task.getSubTasks();
        if (subTasks) {
            subTasks.forEach(subtask => {
                const li = document.createElement("li");
                li.textContent = subtask.getTitle();
                li.dataset.id = subtask.getID();
                subtasksListElement.appendChild(li);
            })
        }
    }

    return { displayLists, displayListTitle, displayTasks, displayTaskDetails };
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
        const listItem = event.target.closest("li")

        if (!listItem) { return; }

        const list = getList(listItem.dataset.id);
        currentListID = listItem.dataset.id;

        ui.displayListTitle(list.getTitle());
        ui.displayTasks(list.getTasks());
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

    //Task details
    const tasksListElement = document.querySelector(".tasks");
    tasksListElement.addEventListener("click", event => {
        const taskItem = event.target.closest("li");

        if (!taskItem) { return; }

        currentTaskID = taskItem.dataset.id;

        const currentList = getList(currentListID);

        const task = currentList.getTask(currentTaskID);

        ui.displayTaskDetails(task);
    });

    const taskDetailsForm = document.querySelector(".task-details-form")
    taskDetailsForm.addEventListener("submit", event => {
        event.preventDefault();

        const currentList = getList(currentListID);
        const task = currentList.getTask(currentTaskID);

        const dueDateElement = document.querySelector("#due-date");
        const priorityElement = document.querySelector("#priority");
        const noteElement = document.querySelector("#note");
        const subtasksListElement = document.querySelector("#subtasks");

        task.setDueDate(dueDateElement.value);
        task.setPriority(priorityElement.value);
        task.setNote(noteElement.value);
    });


})();


export { createTodoList };