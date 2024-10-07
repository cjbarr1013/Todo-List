import { format } from "date-fns";
import { Task } from "./Task.js"
import { Project } from "./Project.js"
import { Manager } from "./Manager.js"

export function UI() {
    const taskManager = Manager();
    let activeSidebarID = "all";

    taskManager.addProject("General");
    taskManager.addProject("Work");
    taskManager.addProject("Home");

    taskManager.addTask("First Task", new Date(2024, 8, 29), "high", "proj-1", "this is the description");
    taskManager.addTask("Second Task", new Date(2024, 9, 11), "high", "proj-1", "this is the description");
    taskManager.addTask("Third Task", new Date(2024, 9, 5), "high", "proj-1", "this is the description");
    taskManager.addTask("Fourth Task", new Date(2024, 9, 8), "high", "proj-2", "this is the description");
    taskManager.addTask("Fifth Task", new Date(2024, 9, 4), "high", "proj-2", "this is the description");
    taskManager.addTask("Sixth Task", new Date(2024, 9, 12), "high", "proj-3", "this is the description");
    taskManager.addTask("Seventh Task", new Date(2024, 9, 3), "high", "proj-3", "this is the description");

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
        newTask.addEventListener("click", () => {
            if (!checkIfIDExists("task-name")) {
                openNewTaskPopup();
                document.querySelector("#task-name").focus();
            }
        });

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
        projectEdit.forEach((button) => {
            button.addEventListener("click", (e) => {
                const project = button.closest("li.project");
                openEditProjectPopup(project);
                document.querySelector("#proj-name").focus();
                e.stopPropagation();
            });
        });

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
        projectInput.required = true;

        const buttonGroup = document.createElement("span");
        buttonGroup.classList.add("btn-grp");

        const confirmButton = document.createElement("button");
        confirmButton.classList.add("icon-btn", "confirm", "proj-confirm");
        confirmButton.addEventListener("click", () => {
            confirmNewProject(projectInput.value);
        });

        const cancelButton = document.createElement("button");
        cancelButton.classList.add("icon-btn", "cancel", "proj-cancel");
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

    const openEditProjectPopup = (project) => {
        project.classList.remove("sidebar-item", "project");
        project.classList.add("add-sidebar-item");

        const projectName = project.querySelector(".proj-name");
        const projectInput = document.createElement("input");
        projectInput.type = "text";
        projectInput.id = "proj-name";
        projectInput.value = projectName.textContent;
        projectInput.required = true;
        projectName.replaceWith(projectInput);

        const editButton = project.querySelector(".edit");
        const confirmButton = document.createElement("button");
        confirmButton.classList.add("icon-btn", "confirm", "proj-confirm");
        confirmButton.addEventListener("click", (e) => {
            confirmProjectEdit(projectInput.value, project.id);
            e.stopPropagation();
        });
        editButton.replaceWith(confirmButton);

        const deleteButton = project.querySelector(".delete");
        const cancelButton = document.createElement("button");
        cancelButton.classList.add("icon-btn", "cancel", "proj-cancel");
        cancelButton.addEventListener("click", (e) => {
            cancelProjectEdit();
            e.stopPropagation();
        });
        deleteButton.replaceWith(cancelButton);
    };

    const confirmProjectEdit = (name, id) => {
        taskManager.editProject(name, id);
        displayProjects();
        initProjectButtons();
    }

    const cancelProjectEdit = () => {
        displayProjects();
        initProjectButtons();
    }

    const openNewTaskPopup = () => {
        const tasksDiv = document.querySelector("#tasks");

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task", "add-task");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.disabled = "disabled";
        checkbox.value = "complete";

        const taskBox = document.createElement("form");
        taskBox.id = "edit-task";
        taskBox.classList.add("edit-task-box");
        taskBox.addEventListener("submit", (e) => {
            confirmNewTask(nameInput.value, dateInput.value, priorityInput.value, 
                projectInput.value, descriptionInput.value);
            e.preventDefault();
        });

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.name = "task-name";
        nameInput.id = "task-name";
        nameInput.placeholder = "Task name";
        nameInput.required = true;

        const dateInput = document.createElement("input");
        dateInput.type = "text";
        dateInput.name = "task-due";
        dateInput.id = "task-due";
        dateInput.placeholder = "Due date";
        dateInput.setAttribute("onfocus", "(this.type='date')")
        dateInput.setAttribute("onblur", "(this.type='text')")
        dateInput.required = true;

        const priorityInput = document.createElement("select");
        priorityInput.name = "task-priority";
        priorityInput.id = "task-priority";
        priorityInput.required = true;

        const defaultPrioityOption = document.createElement("option");
        defaultPrioityOption.value = "";
        defaultPrioityOption.textContent = "Choose priority";

        const highOption = document.createElement("option");
        highOption.value = "high";
        highOption.textContent = "High";

        const medOption = document.createElement("option");
        medOption.value = "med";
        medOption.textContent = "Medium";

        const lowOption = document.createElement("option");
        lowOption.value = "low";
        lowOption.textContent = "Low";

        priorityInput.appendChild(defaultPrioityOption);
        priorityInput.appendChild(highOption);
        priorityInput.appendChild(medOption);
        priorityInput.appendChild(lowOption);

        const projectInput = document.createElement("select");
        projectInput.name = "task-project";
        projectInput.id = "task-project";
        projectInput.required = true;

        const defaultProjectOption = document.createElement("option");
        defaultProjectOption.value = "";
        defaultProjectOption.textContent = "Choose project";
        projectInput.appendChild(defaultProjectOption);

        for (const project of taskManager.getAllProjects()) {
            const projectOption = document.createElement("option");
            projectOption.value = project.getID();
            projectOption.textContent = project.name;
            projectInput.appendChild(projectOption);
        }

        const descriptionInput = document.createElement("textarea");
        descriptionInput.name = "task-desc";
        descriptionInput.id = "task-desc";
        descriptionInput.placeholder = "Task description";

        taskBox.appendChild(nameInput);
        taskBox.appendChild(dateInput);
        taskBox.appendChild(priorityInput);
        taskBox.appendChild(projectInput);
        taskBox.appendChild(descriptionInput);

        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("btn-grp");

        const confirmButton = document.createElement("button");
        confirmButton.type = "submit";
        confirmButton.setAttribute("form", "edit-task");
        confirmButton.classList.add("icon-btn", "confirm", "task-confirm");

        const cancelButton = document.createElement("button");
        cancelButton.classList.add("icon-btn", "cancel", "task-cancel");
        cancelButton.addEventListener("click", cancelNewTask);

        buttonGroup.appendChild(confirmButton);
        buttonGroup.appendChild(cancelButton);

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskBox);
        taskDiv.appendChild(buttonGroup);

        tasksDiv.appendChild(taskDiv);
    };

    const openEditTaskPopup = () => {

    };

    const confirmNewTask = (name, date, priority, project, description) => {
        taskManager.addTask(name, date, priority, project, description);
        displayTasks();
        initTaskButtons();
    };

    const cancelNewTask = () => {
        document.querySelector(".add-task").remove();
    };

    const confirmTaskEdit = () => {
        
    };

    const cancelTaskEdit = () => {
        
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
            title.classList.add("task-name");
            title.textContent = task.title;

            const dueDate = document.createElement("span");
            dueDate.classList.add("task-due");
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

// Work on adding/editing tasks