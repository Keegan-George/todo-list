function createTask(title, startDate, dueDate, priority, note) {
    const id = crypto.randomUUID();
    let taskTitle = title;
    let taskStartDate = startDate;
    let taskDueDate = dueDate;
    let taskPriority = priority;
    let taskNote = note;
    let complete = false;
    let subtasks = [];

    function getID(){
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

    function addSubTask(subtask) {
        subtasks.push(subtask);
    }

    //need a delete subtask function here

    return {
        getID;
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
    const id = crypto.randomUUID();
    let toDoTitle = title;
    let toDoTasks = [];

    function getID(){
        return id;
    }

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

    //need a delete task function here

    return { getID, getTitle, setTitle, getTasks, addTask };
}





const app = (() => {
    const lists = [];





})();





export { createTask, createTodoList };