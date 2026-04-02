import "./styles.css";
import {createTask, createTodoList} from "./scripts.js";



//TEMPORARY FOR TESTING
const task = createTask("Pay bills", "April 1, 2026", "April 6, 2026", 1, "Partial pay for flight");
console.log(task.getTitle());
task.addSubTask("Pay Visa bill");
task.addSubTask("Pay American Express bill");
task.addSubTask("Pay phone bill");

const mondayToDoList = createTodoList("Monday");
mondayToDoList.addTask(task);
console.log(mondayToDoList.getTasks());