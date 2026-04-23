/**
 * Creates a Task object with encapsulated state and behavior.
 *
 * @param {string} title - The title of the task.
 * @param {string} [id=crypto.randomUUID()] - Unique task identifier.
 * @param {string|null} [dueDate=null] - ISO date string representing the due date.
 * @param {string|null} [priority=null] - Priority label (e.g., "P1", "P2").
 * @param {string|null} [note=null] - Optional note text.
 * @param {boolean} [complete=false] - Whether the task is completed.
 * @param {Array<Object>} [subtasks=[]] - Array of subtask objects.
 * @returns {Object} Task API with getters, setters, and serialization.
 */
function createTask(title, id = crypto.randomUUID(), dueDate = null, priority = null, note = null, complete = false, subtasks = []) {
    const taskID = id;
    let taskTitle = title;
    let taskDueDate = dueDate;
    let taskPriority = priority;
    let taskNote = note;
    let taskComplete = complete;
    let taskSubtasks = subtasks;

    /**
     * @returns {string} The task's unique ID.
     */
    function getID() {
        return taskID;
    }

    /**
    * @returns {string} The task title.
    */
    function getTitle() {
        return taskTitle;
    }

    /**
     * Updates the task title.
     * @param {string} newTitle
     */
    function setTitle(newTitle) {
        taskTitle = newTitle;
    }

    /**
     * @returns {string|null} The task's due date.
     */
    function getDueDate() {
        return taskDueDate;
    }

    /**
     * Sets the task's due date.
     * @param {string|null} newDate - ISO date string or null.
     */
    function setDueDate(newDate) {
        taskDueDate = newDate;
    }

    /**
     * @returns {string|null} The task's priority.
     */
    function getPriority() {
        return taskPriority;
    }

    /**
     * Sets the task's priority.
     * @param {string|null} newPriority
     */
    function setPriority(newPriority) {
        taskPriority = newPriority;
    }

    /**
     * @returns {string|null} The task's note.
     */
    function getNote() {
        return taskNote;
    }

    /**
     * Sets the task's note.
     * @param {string|null} newNote
     */
    function setNote(newNote) {
        taskNote = newNote
    }

    /**
     * Toggles the task's completion state.
     */
    function toggleComplete() {
        taskComplete = !taskComplete;
    }

    /**
     * @returns {boolean} Whether the task is complete.
     */
    function isComplete() {
        return taskComplete;
    }

    /**
     * Adds a new subtask to the task.
     * @param {string} subtaskTitle - Title of the new subtask.
     */
    function addSubtask(subtaskTitle) {
        taskSubtasks.push(createSubtask(subtaskTitle));
    }

    /**
     * Retrieves a subtask by ID.
     * @param {string} id - Subtask ID.
     * @returns {Object|undefined} The matching subtask or undefined.
     */
    function getSubtask(id) {
        return getItemInArray(id, taskSubtasks);
    }

    /**
     * Deletes a subtask by ID.
     * @param {string} id - Subtask ID.
     */
    function deleteSubtask(id) {
        removeItemFromArray(id, taskSubtasks);
    }

    /**
     * @returns {Array<Object>} Array of subtask objects.
     */
    function getSubtasks() {
        return taskSubtasks;
    }

    /**
     * Serializes the task into a plain JSON object.
     * @returns {Object}
     */
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

/**
 * Creates a Subtask object with encapsulated state.
 *
 * @param {string} title - The subtask title.
 * @param {string} [id=crypto.randomUUID()] - Unique subtask identifier.
 * @param {boolean} [complete=false] - Whether the subtask is completed.
 * @returns {Object} Subtask API with getters, setters, and serialization.
 */
function createSubtask(title, id = crypto.randomUUID(), complete = false) {
    const subtaskID = id;
    let subtaskTitle = title;
    let subtaskComplete = complete;

    /**
     * @returns {string} The subtask ID.
     */
    function getID() {
        return subtaskID;
    }

    /**
    * @returns {string} The subtask title.
    */
    function getTitle() {
        return subtaskTitle;
    }

    /**
    * Updates the subtask title.
    * @param {string} newTitle
    */
    function setTitle(newTitle) {
        subtaskTitle = newTitle;
    }

    /**
     * Toggles the subtask's completion state.
     */
    function toggleComplete() {
        subtaskComplete = !subtaskComplete;
    }

    /**
     * @returns {boolean} Whether the subtask is complete.
     */
    function isComplete() {
        return subtaskComplete;
    }

    /**
     * Serializes the subtask into a plain JSON object.
     * @returns {Object}
     */
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

/**
 * Creates a Todo List object containing tasks.
 *
 * @param {string} title - The list title.
 * @param {string} [id=crypto.randomUUID()] - Unique list identifier.
 * @param {Array<Object>} [tasks=[]] - Array of task objects.
 * @returns {Object} Todo List API with task management methods.
 */
function createTodoList(title, id = crypto.randomUUID(), tasks = []) {
    const todoID = id;
    let todoTitle = title;
    let todoTasks = tasks;

    /**
     * @returns {string} The list ID.
     */
    function getID() {
        return todoID;
    }

    /**
     * @returns {string} The list title.
     */
    function getTitle() {
        return todoTitle;
    }

    /**
     * Updates the list title.
     * @param {string} newTitle
     */
    function setTitle(newTitle) {
        todoTitle = newTitle;
    }

    /**
     * @returns {Array<Object>} Array of task objects.
     */
    function getTasks() {
        return todoTasks;
    }

    /**
     * Adds a new task with the given title.
     * @param {string} title - Title of the new task.
     */
    function addTask(title) {
        todoTasks.push(createTask(title));
    }

    /**
     * Retrieves a task by ID.
     * @param {string} id - Task ID.
     * @returns {Object|undefined} The matching task or undefined.
     */
    function getTask(id) {
        return getItemInArray(id, todoTasks);
    }

    /**
     * Deletes a task by ID.
     * @param {string} id - Task ID.
     */
    function deleteTask(id) {
        removeItemFromArray(id, todoTasks);
    }

    /**
     * Serializes the list into a plain JSON object.
     * @returns {Object}
     */
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

/**
 * Finds an item in an array by matching its getID() value.
 *
 * @param {string} id - ID to search for.
 * @param {Array<Object>} array - Array of objects with getID().
 * @returns {Object|undefined} The matching item or undefined.
 */
function getItemInArray(id, array) {
    return array.find(element => element.getID() === id);
}

/**
 * Removes an item from an array by ID.
 *
 * @param {string} id - ID of the item to remove.
 * @param {Array<Object>} array - Array of objects with getID().
 * @returns {void}
 */
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