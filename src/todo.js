import { add } from "date-fns";

function createTask(title, dueDate, priority, note) {
    const id = crypto.randomUUID();
    let taskTitle = title;
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

    function isComplete() {
        return complete;
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

    function toJSON() {
        return {
            id: getID(),
            title: getTitle(),
            dueDate: getDueDate(),
            priority: getPriority(),
            note: getNote(),
            complete: isComplete(),
            subtasks: getSubTasks(),
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
        addSubTask,
        getSubTask,
        deleteSubtask,
        getSubTasks,
        toJSON,
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

    function isComplete() {
        return complete;
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
    let toDoTitle = title;
    let toDoTasks = tasks;

    function getID() {
        return todoID;
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

    function addTask(title, dueDate, priority, note) {
        toDoTasks.push(createTask(title, dueDate, priority, note));
    }

    function getTask(id) {
        return getItemInArray(id, toDoTasks);
    }

    function deleteTask(id) {
        removeItemFromArray(id, toDoTasks);
    }

    function toJSON() {
        return {
            id: getID(),
            title: getTitle(),
            tasks: getTasks(),
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
    return array.find(element => element.getID() == id);
}

function removeItemFromArray(id, array) {
    const index = array.findIndex(element => element.getID() == id);
    array.splice(index, 1);
}

export { createTask, createSubTask, createTodoList, getItemInArray, removeItemFromArray };