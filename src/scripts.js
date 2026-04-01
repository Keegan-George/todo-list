function createTask(title, startDate, dueDate, priority, note) {
    let title = title;
    let startDate = startDate;
    let dueDate = dueDate;
    let priority = priority;
    let note = note;

    function getTitle() {
        return title;
    }

    function setTitle(newTitle) {
        title = newTitle;
    }

    function getStartDate() {
        return startDate;
    }

    function setStartDate(newDate) {
        startDate = newDate;
    }

    function getDueDate() {
        return dueDate;
    }

    function setDueDate(newDate) {
        dueDate = newDate;
    }

    function getPriority() {
        return priority;
    }

    function setPriority(newPriority) {
        priority = newPriority;
    }

    function getNote() {
        return note;
    }

    function setNote(newNote) {
        note = newNote
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
        setNote
    };
}

function createTodoList(title, tasks) {
    let title = title;
    let tasks = tasks;

    function getTitle() {
        return title;
    }

    function setTitle(newTitle) {
        title = newTitle;
    }

    function getTasks() {
        return tasks;
    }

    return { getTitle, setTitle, getTasks };
}

export { createTask, createTodoList };