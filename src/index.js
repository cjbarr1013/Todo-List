import "./styles.css";
import { UI } from "./modules/UI.js";
import { addDays } from "date-fns";
import { Task } from "./modules/Task.js"
import { Project } from "./modules/Project.js"
import { Manager } from "./modules/Manager.js"

const taskManager = Manager();

const task1 = Task("First Task", "this is the description", new Date(2024, 8, 13), "high");
const task2 = Task("Second Task", "this is the description", new Date(2024, 8, 11), "med");
const task3 = Task("Third Task", "this is the description", new Date(2024, 8, 24), "low");
const task4 = Task("Fourth Task", "this is the description", new Date(2024, 8, 14), "high");
const task5 = Task("Fifth Task", "this is the description", new Date(2024, 8, 15), "med");
const task6 = Task("Sixth Task", "this is the description", new Date(2024, 8, 13), "med");
const task7 = Task("Seventh Task", "this is the description", new Date(2024, 8, 7), "low");
const project1 = Project("Project 1");
const project2 = Project("Project 2");

taskManager.addProject(project1);
taskManager.addProject(project2);
taskManager.addTask(task1, project1)
taskManager.addTask(task2, project1)
taskManager.addTask(task3, project1)
taskManager.addTask(task4, project1)
taskManager.addTask(task5, project2)
taskManager.addTask(task6, project2)
taskManager.addTask(task7, project2)

console.log(taskManager.getAllTasks());
console.log(taskManager.getTodaysTasks());
console.log(taskManager.getWeeksTasks());

taskManager.deleteTask(task6, project2);

console.log(taskManager.getAllTasks());
console.log(taskManager.getTodaysTasks());
console.log(taskManager.getWeeksTasks());




