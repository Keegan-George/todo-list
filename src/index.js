import "./styles.css";
import {createTask, createTodoList} from "./scripts.js";


const task = createTask("Pay VISA bill", "April 1, 2026", "April 6, 2026", 1, "Partial pay for flight");
console.log(task.getTitle());
