import { Task } from "./Task.js"
import { Project } from "./Project.js"
import { isToday, isSameWeek } from "date-fns";

export function Manager() {
    let allProjects = [];
    let projectIDNumber = 1;
    let taskIDNumber = 1;
    
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

    const getTaskByID = (id) => {
        for (const project of allProjects) {
            for (const task of project.getTasks()) {
                if (task.getID() === id) {
                    return {
                        "task": task,
                        "projID": project.getID()
                    };
                };
            };
        };
        return {};
    };

    const addTask = (name, due, priority, projectID, description) => {
        const project = getProjectByID(projectID);
        const id = "task-" + taskIDNumber++;
        const newTask = Task(name, description, due, priority, id)
        project.addTask(newTask);
    };

    const addProject = (name) => {
        const id = "proj-" + projectIDNumber++;
        allProjects.push(Project(name, id));
    };

    const editTask = (id, name, due, priority, projectID, description) => {
        const taskObj = getTaskByID(id);
        const task = taskObj["task"];
        const oldProjID = taskObj["projID"];

        task.title = name;
        task.description = description;
        task.dueDate = due;
        task.priority = priority;

        if (oldProjID !== projectID) {
            const oldProj = getProjectByID(oldProjID);
            oldProj.removeTask(task);

            const newProj = getProjectByID(projectID);
            newProj.addTask(task);
        };
    };

    const editProject = (newName, id) => {
        const project = getProjectByID(id);
        project.name = newName;
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
        getProjectByID,
        getTaskByID,
        addTask,
        addProject,
        editTask,
        editProject,
        deleteTask,
        deleteProject
    };
};