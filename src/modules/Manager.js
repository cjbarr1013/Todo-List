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

    const getTasksByProjectID = (id) => {
        const tasks = {};
        switch(id) {
            case "all":
                return getAllTasks();
            case "today":
                return getTodaysTasks();
            case "week":
                return getWeeksTasks();
            default:
                for (const project of allProjects) {
                    if (project.getID() === id) {
                        return project.getTasks();
                    };
                };
                return [];
        };
    };

    const getAllProjects = () => allProjects;

    const getProjectByID = (id) => {
        for (const project of allProjects) {
            if (project.getID() === id) {
                return project;
            };
        };
        return {};
    };

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

    const deleteTask = (id) => {
        for (const project of allProjects) {
            for (const task of project.getTasks()) {
                if (task.getID() === id) {
                    project.removeTask(task);
                    return;
                };
            };
        };
    };

    const deleteProject = (id) => {
        const project = getProjectByID(id);
        project.removeAllTasks();
        const index = allProjects.indexOf(project);
        allProjects.splice(index, 1);
    };

    return {
        getTasksByProjectID,
        getAllProjects,
        addTask,
        addProject,
        editTask,
        editProject,
        deleteTask,
        deleteProject
    };
};