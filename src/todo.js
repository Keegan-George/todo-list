function createTask(title, id = crypto.randomUUID(), dueDate, priority, note, complete = false, subtasks = []) {
    const taskID = id;
    let taskTitle = title;
    let taskDueDate = dueDate;
    let taskPriority = priority;
    let taskNote = note;
    let taskComplete = complete;
    let taskSubtasks = subtasks;

    function getID() {
        return taskID;
    }

    function getTitle() {
        return taskTitle;
    }

    function setTitle(newTitle) {
        taskTitle = newTitle;
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
        taskComplete = !taskComplete;
    }

    function isComplete() {
        return taskComplete;
    }

    function addSubtask(subtaskTitle) {
        taskSubtasks.push(createSubtask(subtaskTitle));
    }

    function getSubtask(id) {
        return getItemInArray(id, taskSubtasks);
    }

    function deleteSubtask(id) {
        removeItemFromArray(id, taskSubtasks);
    }

    function getSubtasks() {
        return taskSubtasks;
    }

    function toJSON() {
        return {
            id: getID(),
            title: getTitle(),
            dueDate: getDueDate(),
            priority: getPriority(),
            note: getNote(),
            complete: isComplete(),
            subtasks: getSubtasks().map(subtask => subtask.toJSON()),
        }
    }

    return {
        getID,
        getTitle,
        setTitle,
        getDueDate,
        setDueDate,
        getPriority,
        setPriority,
        getNote,
        setNote,
        toggleComplete,
        isComplete,
        addSubtask,
        getSubtask,
        deleteSubtask,
        getSubtasks,
        toJSON,
    };
}

function createSubtask(title, id = crypto.randomUUID(), complete = false) {
    const subtaskID = id;
    let subtaskTitle = title;
    let subtaskComplete = complete;

    function getID() {
        return subtaskID;
    }

    function getTitle() {
        return subtaskTitle;
    }

    function setTitle(newTitle) {
        subtaskTitle = newTitle;
    }

    function toggleComplete() {
        subtaskComplete = !subtaskComplete;
    }

    function isComplete() {
        return subtaskComplete;
    }

    function toJSON() {
        return {
            id: getID(),
            title: getTitle(),
            complete: isComplete(),
        }
    }

    return {
        getID,
        getTitle,
        setTitle,
        toggleComplete,
        isComplete,
        toJSON,
    }
}

function createTodoList(title, id = crypto.randomUUID(), tasks = []) {
    const todoID = id;
    let todoTitle = title;
    let todoTasks = tasks;

    function getID() {
        return todoID;
    }

    function getTitle() {
        return todoTitle;
    }

    function setTitle(newTitle) {
        todoTitle = newTitle;
    }

    function getTasks() {
        return todoTasks;
    }

    function addTask(title) {
        todoTasks.push(createTask(title));
    }

    function getTask(id) {
        return getItemInArray(id, todoTasks);
    }

    function deleteTask(id) {
        removeItemFromArray(id, todoTasks);
    }

    function toJSON() {
        return {
            id: getID(),
            title: getTitle(),
            tasks: getTasks().map(task => task.toJSON()),
        }
    }

    return {
        getID,
        getTitle,
        setTitle,
        getTasks,
        addTask,
        getTask,
        deleteTask,
        toJSON,
    };
}

function getItemInArray(id, array) {
    return array.find(element => element.getID() === id);
}

function removeItemFromArray(id, array) {
    const index = array.findIndex(element => element.getID() === id);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

export {
    createTask,
    createSubtask,
    createTodoList,
    getItemInArray,
    removeItemFromArray
};