function createTask(title, startDate, dueDate, priority, note) {
    const id = crypto.randomUUID();
    let taskTitle = title;
    let taskStartDate = startDate;
    let taskDueDate = dueDate;
    let taskPriority = priority;
    let taskNote = note;
    let complete = false;
    let subtasks = [];

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
        subtasks.push(createSubTask(subtaskTitle));
    }

    function getSubTask(id) {
        return getItemInArray(id, subtasks);
    }

    function removeSubTask(subtask) {
        removeItemFromArray(subtask, subtasks);
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
        removeSubTask
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

    function addTask(title, startDue, dueDate, priority, note) {
        tasks.push(createTask(title, startDue, dueDate, priority, note));
    }

    function getTask(id) {
        return getItemInArray(id, tasks);
    }

    function removeTask(task) {
        removeItemFromArray(task, tasks);
    }

    return { getID, getTitle, setTitle, getTasks, addTask, getTask, removeTask };
}

function getItemInArray(id, array) {
    return array.find(element => element.getID() == id);
}

function removeItemFromArray(item, array) {
    const index = array.findIndex(element => element.getID() == item.getID());
    array.splice(index, 1);
}


const app = (() => {
    const lists = [];

})();


export { createTodoList };