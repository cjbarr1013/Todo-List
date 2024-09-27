import { format } from "date-fns";
import { Task } from "./Task.js"
import { Project } from "./Project.js"
import { Manager } from "./Manager.js"

export function UI() {
    const taskManager = Manager();
    let activeSidebarID = "all";

    const task1 = Task("First Task", "this is the description", new Date(2024, 8, 25), "high", "task-1");
    const task2 = Task("Second Task", "this is the description", new Date(2024, 8, 30), "med", "task-2");
    const task3 = Task("Third Task", "this is the description", new Date(2024, 8, 24), "low", "task-3");
    const task4 = Task("Fourth Task", "this is the description", new Date(2024, 8, 25), "high", "task-4");
    const task5 = Task("Fifth Task", "this is the description", new Date(2024, 8, 19), "med", "task-5");
    const task6 = Task("Sixth Task", "this is the description", new Date(2024, 8, 28), "med", "task-6");
    const task7 = Task("Seventh Task", "this is the description", new Date(2024, 8, 26), "low", "task-7");
    const project1 = Project("General", "proj-1");
    const project2 = Project("Work", "proj-2");
    const project3 = Project("Home", "proj-3");

    taskManager.addProject(project1);
    taskManager.addProject(project2);
    taskManager.addProject(project3);

    taskManager.addTask(task1, project1);
    taskManager.addTask(task2, project1);
    taskManager.addTask(task3, project1);
    taskManager.addTask(task4, project2);
    taskManager.addTask(task5, project2);
    taskManager.addTask(task6, project3);
    taskManager.addTask(task7, project3);

    const initConstButtons = () => {
        const byDueDate = document.querySelectorAll(".by-due-date");
        byDueDate.forEach((item) => {
            item.addEventListener("click", () => {
                activeSidebarID = item.id;
                displayTasks();
            });
        });

        const newTask = document.querySelector("#new-task");
        newTask.addEventListener("click", openNewTaskPopup);

        const newProject = document.querySelector("#new-project");
        newProject.addEventListener("click", openNewProjectPopup);
    };

    const initProjectButtons = () => {
        const projects = document.querySelectorAll(".project");
        projects.forEach((project) => {
            project.addEventListener("click", () => {
                activeSidebarID = project.id;
                displayTasks();
            });
        });

        const projectEdit = document.querySelectorAll(".proj-edit");
        projectEdit.forEach((project) => project.addEventListener("click", openEditProjectPopup));

        const projectDelete = document.querySelectorAll(".proj-delete");
        projectDelete.forEach((button) => {
            button.addEventListener("click", (e) => {
                const project = button.closest("li.project");
                deleteProject(project.id);
                e.stopPropagation();
            });
        });
    };

    const initTaskButtons = () => {
        const taskEdit = document.querySelectorAll(".task-edit");
        taskEdit.forEach((task) => task.addEventListener("click", openEditTaskPopup));

        const taskDelete = document.querySelectorAll(".task-delete");
        taskDelete.forEach((button) => {
            button.addEventListener("click", (e) => {
                const task = button.closest("div.task");
                deleteTask(task.id);
                e.stopPropagation();
            });
        });
    };

    const initAllButtons = () => {
        initConstButtons();
        initProjectButtons();
        initTaskButtons();
    };

    const openNewTaskPopup = () => {

    };

    const openNewProjectPopup = () => {

    };

    const openEditTaskPopup = () => {

    };

    const openEditProjectPopup = () => {

    };

    const deleteTask = (id) => {
        taskManager.deleteTask(id);
        displayTasks();
        initTaskButtons();
    };

    const deleteProject = (id) => {
        taskManager.deleteProject(id);
        displayProjects();
        initProjectButtons();
        displayTasks();
    };

    const displayProjects = () => {
        const projects = taskManager.getAllProjects();
        const projectsDiv = document.querySelector("#projects");
        projectsDiv.textContent = "";

        projects.forEach((project) => {
            const listItem = document.createElement("li");
            listItem.id = project.getID();
            listItem.classList.add("sidebar-item");
            listItem.classList.add("project");

            const projectName = document.createElement("span");
            projectName.classList.add("proj-name");
            projectName.textContent = project.name;

            const buttonGroup = document.createElement("span");
            buttonGroup.classList.add("btn-grp");

            const editButton = document.createElement("button");
            editButton.classList.add("icon-btn");
            editButton.classList.add("edit");
            editButton.classList.add("proj-edit");

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("icon-btn");
            deleteButton.classList.add("delete");
            deleteButton.classList.add("proj-delete");

            buttonGroup.appendChild(editButton);
            buttonGroup.appendChild(deleteButton);

            listItem.appendChild(projectName);
            listItem.appendChild(buttonGroup);

            projectsDiv.appendChild(listItem);
        });
    };

    const displayTasks = () => {
        const tasks = taskManager.getTasksByProjectID(activeSidebarID);
        const tasksDiv = document.querySelector("#tasks");
        tasksDiv.textContent = "";

        tasks.forEach((task) => {
            const taskDiv = document.createElement("div");
            taskDiv.id = task.getID();
            taskDiv.classList.add("task")

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = task.getID();
            checkbox.name = task.getID();
            checkbox.value = "complete"

            const taskBox = document.createElement("div");
            taskBox.classList.add("task-box");

            const title = document.createElement("span");
            title.classList.add("title");
            title.textContent = task.title;

            const dueDate = document.createElement("span");
            dueDate.classList.add("due");
            dueDate.textContent = format(task.dueDate, "PPP");

            taskBox.appendChild(title);
            taskBox.appendChild(dueDate);

            const buttonGroup = document.createElement("div");
            buttonGroup.classList.add("btn-grp");

            const editButton = document.createElement("button");
            editButton.classList.add("icon-btn");
            editButton.classList.add("edit");
            editButton.classList.add("task-edit");

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("icon-btn");
            deleteButton.classList.add("delete");
            deleteButton.classList.add("task-delete");

            buttonGroup.appendChild(editButton);
            buttonGroup.appendChild(deleteButton);

            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(taskBox);
            taskDiv.appendChild(buttonGroup);

            tasksDiv.appendChild(taskDiv);
        })
    };

    displayProjects();
    displayTasks();
    initAllButtons();
};

// Finished delete buttons, maybe look into not having to
// re-display all tasks and projects upon deletion