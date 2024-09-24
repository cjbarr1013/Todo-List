import { Task } from "./Task.js"
import { Project } from "./Project.js"
import { Manager } from "./Manager.js"

export function UI() {
    const taskManager = Manager();

    const initButtons = () => {
        const newTask = document.querySelector("#new-task");
        newTask.addEventListener("click", openNewTaskPopup);

        const newProject = document.querySelector("#new-project");
        newProject.addEventListener("click", openNewProjectPopup);

        const taskEdit = document.querySelectorAll(".task-edit");
        taskEdit.forEach((item) => item.addEventListener("click", openEditTaskPopup));

        const projectEdit = document.querySelectorAll(".proj-edit");
        projectEdit.forEach((project) => project.addEventListener("click", openEditProjectPopup));

        const taskDelete = document.querySelectorAll(".task-delete");
        taskDelete.forEach((item) => item.addEventListener("click", deleteTask));

        const projectDelete = document.querySelectorAll(".proj-delete");
        projectDelete.forEach((item) => item.addEventListener("click", deleteProject));
    };

    const openNewTaskPopup = () => {

    };

    const openNewProjectPopup = () => {

    };

    const openEditTaskPopup = () => {

    };

    const openEditProjectPopup = () => {

    };

    const deleteTask = () => {
        taskManager.deleteTask();
    };

    const deleteProject = () => {
        taskManager.deleteProject();
    };
};