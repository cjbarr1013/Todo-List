import { Task } from "./Task.js"
import { Project } from "./Project.js"
import { isToday, isSameWeek } from "date-fns";

export function Manager() {
    let allProjects = [];
    
    const getAllTasks = () => {
        let allTasks = [];
        allProjects.forEach((project) => allTasks.push(...project.getTasks()));
        return allTasks;
    };

    const getTodaysTasks = () => getAllTasks().filter((task) => isToday(task.dueDate));

    const getWeeksTasks = () => getAllTasks().filter((task) => isSameWeek(new Date(), task.dueDate));

    const getAllProjects = () => allProjects;

    const addTask = (task, project) => {
        project.addTask(task);
    };

    const addProject = (project) => {
        allProjects.push(project);
    };

    const editTask = () => {

    };

    const editProject = () => {

    };

    const deleteTask = (task, project) => {
        project.removeTask(task);
    };

    const deleteProject = (project) => {
        project.removeAllTasks;
        const index = allProjects.indexOf(project);
        allProjects.splice(index, 1);
    };

    return {
        getAllTasks,
        getTodaysTasks,
        getWeeksTasks,
        getAllProjects,
        addTask,
        addProject,
        editTask,
        editProject,
        deleteTask,
        deleteProject
    };
};