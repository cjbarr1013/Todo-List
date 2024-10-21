import { Task } from "./Task.js"
import { Project } from "./Project.js"
import { Storage } from "./Storage.js"
import { isToday, isSameWeek } from "date-fns";

export function Manager() {
    const storage = Storage();
    let allProjects = [];
    let projectIDNumber = 1;
    let taskIDNumber = 1;

    const loadAllFromStorage = () => {
        allProjects = storage.loadAllProjects();
        projectIDNumber = parseInt(storage.loadProjectIDNumber());
        taskIDNumber = parseInt(storage.loadTaskIDNumber());
    }
    
    const getAllTasks = () => {
        let allTasks = [];
        allProjects.forEach((project) => allTasks.push(...project.getTasks()));
        return allTasks;
    };

    const getTodaysTasks = () => getAllTasks().filter((task) => isToday(task.getDueDate()));

    const getWeeksTasks = () => getAllTasks().filter((task) => isSameWeek(new Date(), task.getDueDate()));

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
                        "projID": project.getID(),
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

        storage.saveTask(id, newTask);
        storage.saveProject(projectID, project);
        storage.saveTaskIDNumber(taskIDNumber);
    };

    const addProject = (name) => {
        const id = "proj-" + projectIDNumber++;
        const newProject = Project(name, id);
        allProjects.push(newProject);

        storage.saveProject(id, newProject);
        storage.saveProjectIDNumber(projectIDNumber);
    };

    const editTask = (id, name, due, priority, newProjID, description) => {
        const taskObj = getTaskByID(id);
        const task = taskObj["task"];
        const projectID = taskObj["projID"];
        const project = getProjectByID(projectID);

        task.title = name;
        task.description = description;
        task.changeDueDate(due);
        task.priority = priority;

        // Move task to new project, if applicable
        if (projectID !== newProjID) {
            project.removeTask(task);

            const newProj = getProjectByID(newProjID);
            newProj.addTask(task);

            storage.saveProject(projectID, project);
            storage.saveProject(newProjID, newProj);

            return;
        };

        storage.saveTask(id, task);
        storage.saveProject(projectID, project);
    };

    const editProject = (newName, id) => {
        const project = getProjectByID(id);
        project.name = newName;
        storage.saveProject(id, project);
    };

    const deleteTask = (id) => {
        for (const project of allProjects) {
            for (const task of project.getTasks()) {
                if (task.getID() === id) {
                    project.removeTask(task);
                    storage.deleteItem(id);
                    storage.saveProject(project.getID(), project);
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
        storage.deleteItem(id);
    };

    const toggleTaskComplete = (taskID) => {
        const taskObj = getTaskByID(taskID);
        const task = taskObj["task"];
        task.toggleComplete();
        storage.saveTask(taskID, task);
    }

    return {
        loadAllFromStorage,
        getTasksByProjectID,
        getAllProjects,
        getProjectByID,
        getTaskByID,
        addTask,
        addProject,
        editTask,
        editProject,
        deleteTask,
        deleteProject,
        toggleTaskComplete
    };
};