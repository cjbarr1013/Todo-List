import { Task } from "./Task.js"
import { Project } from "./Project.js"

export function Storage() {
    const saveProject = (projectID, project) => {
        localStorage.setItem(projectID, JSON.stringify({
            name: project.name,
            id: project.getID(),
            taskIDs: project.getTasks().map(task => task.getID()),
        }));
    };

    const saveTask = (taskID, task) => {
        localStorage.setItem(taskID, JSON.stringify({
            title: task.title,
            description: task.description,
            date: task.getDueDateStr(),
            priority: task.priority,
            id: task.getID(),
            complete: task.isComplete(),
        }));
    };

    const deleteItem = (id) => {
        localStorage.removeItem(id);
    };

    const saveProjectIDNumber = (number) => {
        localStorage.setItem("projectIDNumber", number);
    };

    const saveTaskIDNumber = (number) => {
        localStorage.setItem("taskIDNumber", number);
    };

    const loadProject = (projectID) => {
        const project = JSON.parse(localStorage.getItem(projectID));
        const tasks = project.taskIDs.map(id => loadTask(id));
        return Project(project.name, project.id, tasks);
    };

    const loadTask = (taskID) => {
        const task = JSON.parse(localStorage.getItem(taskID));
        return Task(task.title, task.description, task.date, task.priority, task.id, task.complete);
    };

    const loadAllProjects = () => {
        const projects = [];
        const projectKeys = Object.keys(localStorage).filter(x =>
            x.startsWith("proj-")
        );

        for (const key of projectKeys.sort()) {
            const project = loadProject(key);
            projects.push(project);
        };

        return projects;
    };

    const loadProjectIDNumber = () => {
        return localStorage.getItem("projectIDNumber");
    };

    const loadTaskIDNumber = () => {
        return localStorage.getItem("taskIDNumber");
    };

    return {
        saveProject,
        saveTask,
        deleteItem,
        saveProjectIDNumber,
        saveTaskIDNumber,
        loadAllProjects,
        loadProjectIDNumber,
        loadTaskIDNumber
    }
};
