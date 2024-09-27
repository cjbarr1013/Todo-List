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

    taskManager.addProject("General");
    taskManager.addProject("Work");
    taskManager.addProject("Home");

    taskManager.addTask(task1, "proj-1");
    taskManager.addTask(task2, "proj-1");
    taskManager.addTask(task3, "proj-1");
    taskManager.addTask(task4, "proj-2");
    taskManager.addTask(task5, "proj-2");
    taskManager.addTask(task6, "proj-3");
    taskManager.addTask(task7, "proj-3");

    const initConstButtons = () => {
        const byDueDate = document.querySelectorAll(".by-due-date");
        byDueDate.forEach((item) => {
            item.addEventListener("click", () => {
                activeSidebarID = item.id;
                displayTasks();
                initTaskButtons();
            });
        });

        const newTask = document.querySelector("#new-task");
        newTask.addEventListener("click", openNewTaskPopup);

        const newProject = document.querySelector("#new-project");
        newProject.addEventListener("click", () => {
            if (!checkIfIDExists("proj-name")) {
                openNewProjectPopup();
                document.querySelector("#proj-name").focus();
            }
        });
    };

    const initProjectButtons = () => {
        const projects = document.querySelectorAll(".project");
        projects.forEach((project) => {
            project.addEventListener("click", () => {
                activeSidebarID = project.id;
                displayTasks();
                initTaskButtons();
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

    const checkIfIDExists = (id) => {
        return document.getElementById(id) !== null;
    };

    const openNewProjectPopup = () => {
        const projectsDiv = document.querySelector("#projects");

        const listItem = document.createElement("li");
        listItem.classList.add("add-sidebar-item");

        const projectInput = document.createElement("input");
        projectInput.type = "text";
        projectInput.id = "proj-name";

        const buttonGroup = document.createElement("span");
        buttonGroup.classList.add("btn-grp");

        const confirmButton = document.createElement("button");
        confirmButton.classList.add("icon-btn");
        confirmButton.classList.add("confirm");
        confirmButton.classList.add("proj-confirm");
        confirmButton.addEventListener("click", () => {
            confirmNewProject(projectInput.value);
        });

        const cancelButton = document.createElement("button");
        cancelButton.classList.add("icon-btn");
        cancelButton.classList.add("cancel");
        cancelButton.classList.add("proj-cancel");
        cancelButton.addEventListener("click", cancelNewProject);

        buttonGroup.appendChild(confirmButton);
        buttonGroup.appendChild(cancelButton);

        listItem.appendChild(projectInput);
        listItem.appendChild(buttonGroup);

        projectsDiv.appendChild(listItem);
    };

    const confirmNewProject = (name) => {
        taskManager.addProject(name);
        displayProjects();
        initProjectButtons();
    };

    const cancelNewProject = () => {
        document.querySelector(".add-sidebar-item").remove();
    };

    const openEditProjectPopup = () => {

    };

    const openNewTaskPopup = () => {

    };

    const openEditTaskPopup = () => {

    };

    const confirmNewTask = () => {
        
    };

    const cancelNewTask = () => {
        
    };

    const deleteTask = (id) => {
        taskManager.deleteTask(id);
        document.querySelector("#" + id).remove();
    };

    const deleteProject = (id) => {
        taskManager.deleteProject(id);
        document.querySelector("#" + id).remove();
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

// Work on editing project names
// then work on adding/editing tasks