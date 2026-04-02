function createTask(title, startDate, dueDate, priority, note) {
    let taskTitle = title;
    let taskStartDate = startDate;
    let taskDueDate = dueDate;
    let taskPriority = priority;
    let taskNote = note;
    let complete = false;
    let subtasks = [];

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

    function addSubTask(subtask) {
        subtasks.push(subtask);
    }

    return {
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
    };
}

function createTodoList(title) {
    let toDoTitle = title;
    let toDoTasks = [];

    function getTitle() {
        return toDoTitle;
    }

    function setTitle(newTitle) {
        toDoTitle = newTitle;
    }

    function getTasks() {
        return toDoTasks;
    }

    function addTask(task) {
        toDoTasks.push(task);
    }

    return { getTitle, setTitle, getTasks, addTask };
}

export { createTask, createTodoList };