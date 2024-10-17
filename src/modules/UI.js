import { format } from "date-fns";
import { Manager } from "./Manager.js"

export function UI() {
    const taskManager = Manager();
    let activeSidebarID = "all";

    taskManager.addProject("General");
    taskManager.addProject("Work");
    taskManager.addProject("Home");
    taskManager.addProject("Secret Project");
    taskManager.addTask("First Task", "2024-10-29", "high", "proj-1", "this is the description");
    taskManager.addTask("Second Task", "2024-11-12", "low", "proj-1", "this is the description");
    taskManager.addTask("Third Task", "2024-10-23", "med", "proj-1", "this is the description");
    taskManager.addTask("Fourth Task", "2024-10-30", "high", "proj-1", "this is the description");
    taskManager.addTask("Fifth Task", "2024-10-25", "low", "proj-2", "this is the description");
    taskManager.addTask("Sixth Task", "2024-10-31", "high", "proj-2", "this is the description");
    taskManager.addTask("Seventh Task", "2024-11-16", "low", "proj-2", "this is the description");
    taskManager.addTask("Eighth Task", "2024-10-30", "high", "proj-3", "this is the description");
    taskManager.addTask("Ninth Task", "2024-11-06", "med", "proj-3", "this is the description");
    taskManager.addTask("Tenth Task", "2024-10-21", "med", "proj-3", "this is the description");
    taskManager.addTask("Eleventh Task", "2024-11-09", "high", "proj-4", "this is the description");
    taskManager.addTask("Twelth Task", "2024-11-29", "med", "proj-4", "this is the description");
    taskManager.addTask("Thirteenth Task", "2024-10-29", "high", "proj-4", "this is the description");
    taskManager.addTask("Fourteenth Task", "2024-11-02", "low", "proj-4", "this is the description");

    const initConstButtons = () => {
        const byDueDate = document.querySelectorAll(".by-due-date");
        byDueDate.forEach((item) => {
            item.addEventListener("click", () => {
                activeSidebarID = item.id;
                displayTasks();
                initTaskButtons();
                initCheckboxes();
            });
        });

        const newTask = document.querySelector("#new-task-btn");
        newTask.addEventListener("click", () => {
            if (!checkIfIDExists("task-name")) {
                handleEditTask(newTask.id);
            }
        });

        const newProject = document.querySelector("#new-project-btn");
        newProject.addEventListener("click", () => {
            if (!checkIfIDExists("proj-name")) {
                handleEditProject(newProject.id);
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
                initCheckboxes();
            });
        });

        const projectEdit = document.querySelectorAll(".proj-edit");
        projectEdit.forEach((button) => {
            button.addEventListener("click", (e) => {
                if (!checkIfIDExists("proj-name")) {
                    const id = button.closest("li.project").id;
                    handleEditProject(id);
                    e.stopPropagation();
                };
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
        taskEdit.forEach((button) => {
            button.addEventListener("click", (e) => {
                if (!checkIfIDExists("task-name")) {
                    const id = button.closest("div.task").id;
                    handleEditTask(id);
                    e.stopPropagation();
                }
            });
        });

        const taskDelete = document.querySelectorAll(".task-delete");
        taskDelete.forEach((button) => {
            button.addEventListener("click", (e) => {
                const task = button.closest("div.task");
                deleteTask(task.id);
                e.stopPropagation();
            });
        });
    };

    const initCheckboxes = () => {
        const checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach((box) => {
            box.addEventListener('change', () => {
                taskManager.toggleTaskComplete(box.value);
                handleCheckbox(box.value);
            })
        })
    }

    const initInteractiveElements = () => {
        initConstButtons();
        initProjectButtons();
        initTaskButtons();
        initCheckboxes();
    };

    const checkIfIDExists = (id) => {
        return document.getElementById(id) !== null;
    };

    const handleEditProject = (id) => {
        if (id === "new-project-btn") {
            const projectsDiv = document.querySelector("#projects");
            projectsDiv.appendChild(getEditProjectHTML("new-project"));
        } else {
            const projectDiv = document.querySelector("#" + id);
            const projectName = taskManager.getProjectByID(id).name;
            projectDiv.replaceWith(getEditProjectHTML(id, projectName));
        };

        document.querySelector("#proj-name").focus();
    };

    const getEditProjectHTML = (id, projectName = "") => {
        const formItem = document.createElement("form");
        formItem.id = id;
        formItem.classList.add("add-sidebar-item");
        formItem.addEventListener("submit", (e) => {
            handleEditProjectSubmit(projectInput.value, id);
            e.preventDefault();
        });

        const projectInput = document.createElement("input");
        projectInput.type = "text";
        projectInput.id = "proj-name";
        projectInput.required = true;
        projectInput.value = projectName;

        const buttonGroup = document.createElement("span");
        buttonGroup.classList.add("btn-grp");

        const confirmButton = document.createElement("button");
        confirmButton.type = "submit";
        confirmButton.setAttribute("form", id);
        confirmButton.classList.add("icon-btn", "confirm", "proj-confirm");

        const cancelButton = document.createElement("button");
        cancelButton.classList.add("icon-btn", "cancel", "proj-cancel");
        cancelButton.addEventListener("click", () => {
            handleEditProjectCancel(id);
        });

        buttonGroup.appendChild(confirmButton);
        buttonGroup.appendChild(cancelButton);

        formItem.appendChild(projectInput);
        formItem.appendChild(buttonGroup);

        return formItem;
    }

    const handleEditProjectSubmit = (name, id) => {
        if (id === "new-project") {
            confirmNewProject(name);
        } else {
            confirmEditProject(name, id);
        };

        displayProjects();
        initProjectButtons();
    };

    const handleEditProjectCancel = (id) => {
        if (id === "new-project") {
            cancelNewProject();
        } else {
            cancelEditProject();
        };
    };

    const confirmNewProject = (name) => {
        taskManager.addProject(name);
    };

    const confirmEditProject = (name, id) => {
        taskManager.editProject(name, id);
    };

    const cancelNewProject = () => {
        document.querySelector(".add-sidebar-item").remove();
    };

    const cancelEditProject = () => {
        displayProjects();
        initProjectButtons();
    };

    const handleEditTask = (id) => {
        if (id === "new-task-btn") {
            const tasksDiv = document.querySelector("#tasks");
            tasksDiv.appendChild(getEditTaskHTML("new-task"));
        } else {
            const taskDiv = document.querySelector("#" + id);
            const taskObj = taskManager.getTaskByID(id);
            const task = taskObj["task"];
            const projID = taskObj["projID"];
            taskDiv.replaceWith(getEditTaskHTML(id, task.title, task.getDueDate(),
                                                task.priority, projID, 
                                                task.description));
        };

        document.querySelector("#task-name").focus();
    };

    const getEditTaskHTML = (id, name = "", date = "", priority = "",
                             project = "", desc = "") => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task", "add-task");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.disabled = "disabled";

        const taskBox = document.createElement("form");
        taskBox.id = id;
        taskBox.classList.add("edit-task-box");
        taskBox.addEventListener("submit", (e) => {
            handleEditTaskSubmit(id, nameInput.value, dateInput.value,
                                 priorityInput.value, projectInput.value,
                                 descriptionInput.value);
            e.preventDefault();
        });

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.name = "task-name";
        nameInput.id = "task-name";
        nameInput.placeholder = "Task name";
        nameInput.value = name;
        nameInput.required = true;

        const dateInput = document.createElement("input");
        dateInput.type = "text";
        dateInput.name = "task-due";
        dateInput.id = "task-due";
        dateInput.placeholder = "Due date";
        dateInput.value = date !== "" ? format(date, "yyyy-MM-dd") : "";
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
        priorityInput.value = priority;

        const projectInput = document.createElement("select");
        projectInput.name = "task-project";
        projectInput.id = "task-project";
        projectInput.required = true;

        const defaultProjectOption = document.createElement("option");
        defaultProjectOption.value = "";
        defaultProjectOption.textContent = "Choose project";
        projectInput.appendChild(defaultProjectOption);

        for (const proj of taskManager.getAllProjects()) {
            const projectOption = document.createElement("option");
            projectOption.value = proj.getID();
            projectOption.textContent = proj.name;
            projectInput.appendChild(projectOption);
        }

        if (project === "") {
            projectInput.value = checkIfProjectSelected() ? activeSidebarID : "";
        } else {
            projectInput.value = project;
        };

        const descriptionInput = document.createElement("textarea");
        descriptionInput.name = "task-desc";
        descriptionInput.id = "task-desc";
        descriptionInput.placeholder = "Task description";
        descriptionInput.value = desc;

        taskBox.appendChild(nameInput);
        taskBox.appendChild(dateInput);
        taskBox.appendChild(priorityInput);
        taskBox.appendChild(projectInput);
        taskBox.appendChild(descriptionInput);

        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("btn-grp");

        const confirmButton = document.createElement("button");
        confirmButton.type = "submit";
        confirmButton.setAttribute("form", id);
        confirmButton.classList.add("icon-btn", "confirm", "task-confirm");

        const cancelButton = document.createElement("button");
        cancelButton.classList.add("icon-btn", "cancel", "task-cancel");
        cancelButton.addEventListener("click", () => {
            handleEditTaskCancel(id);
        });

        buttonGroup.appendChild(confirmButton);
        buttonGroup.appendChild(cancelButton);

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskBox);
        taskDiv.appendChild(buttonGroup);

        return taskDiv;
    };

    const checkIfProjectSelected = () => {
        const generalSidebarIDs = ["all", "today", "week"];
        if (generalSidebarIDs.includes(activeSidebarID)) {
            return false;
        } else {
            return true;
        };
    };

    const handleEditTaskSubmit = (taskID, name, date, priority, project, desc) => {
        if (taskID === "new-task") {
            confirmNewTask(name, date, priority, project, desc);
        } else {
            confirmEditTask(taskID, name, date, priority, project, desc);
        };

        displayTasks();
        initTaskButtons();
        initCheckboxes();
    };

    const handleEditTaskCancel = (id) => {
        if (id === "new-task") {
            cancelNewTask();
        } else {
            cancelEditTask();
        };
    }

    const confirmNewTask = (name, date, priority, project, description) => {
        taskManager.addTask(name, date, priority, project, description);
    };

    const cancelNewTask = () => {
        document.querySelector(".add-task").remove();
    };

    const confirmEditTask = (id, name, date, priority, project, desc) => {
        taskManager.editTask(id, name, date, priority, project, desc);
    };

    const cancelEditTask = () => {
        displayTasks();
        initTaskButtons();
        initCheckboxes();
    };

    const deleteTask = (id) => {
        taskManager.deleteTask(id);
        document.querySelector("#" + id).remove();
    };

    const deleteProject = (id) => {
        taskManager.deleteProject(id);
        document.querySelector("#" + id).remove();
        displayTasks();
        initTaskButtons();
        initCheckboxes();
    };

    const displayProjects = () => {
        const projects = taskManager.getAllProjects();
        const projectsDiv = document.querySelector("#projects");
        projectsDiv.textContent = "";

        projects.forEach((project) => {
            const listItem = getProjectHTML(project);
            projectsDiv.appendChild(listItem);
        });
    };

    const displayTasks = () => {
        const tasks = taskManager.getTasksByProjectID(activeSidebarID);
        const tasksDiv = document.querySelector("#tasks");
        tasksDiv.textContent = "";

        tasks.forEach((task) => {
            const taskDiv = getTaskHTML(task);
            tasksDiv.appendChild(taskDiv);
        })
    };

    const getProjectHTML = (project) => {
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

        return listItem;
    }

    const getTaskHTML = (task) => {
        const taskDiv = document.createElement("div");
        taskDiv.id = task.getID();
        taskDiv.classList.add("task")

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = task.getID();

        const taskBox = document.createElement("div");
        taskBox.classList.add("task-box");

        if (task.priority === "high") {
            taskBox.classList.add("high-priority");
        } else if (task.priority === "med") {
            taskBox.classList.add("med-priority");
        } else {
            taskBox.classList.add("low-priority");
        };

        if (task.isComplete()) {
            taskBox.classList.add("complete");
            checkbox.checked = true;
        };

        const title = document.createElement("span");
        title.classList.add("task-name");
        title.textContent = task.title;

        const dueDate = document.createElement("span");
        dueDate.classList.add("task-due");
        dueDate.textContent = format(task.getDueDate(), "PPP");

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

        return taskDiv;
    }

    const handleCheckbox = (taskID) => {
        const taskObj = taskManager.getTaskByID(taskID);
        const task = taskObj["task"];
        const taskDiv = document.querySelector("#" + taskID);
        const taskBox = taskDiv.querySelector(".task-box");

        if (task.isComplete()) {
            taskBox.classList.add("complete");
        } else {
            taskBox.classList.remove("complete");
        };
    };

    displayProjects();
    displayTasks();
    initInteractiveElements();
};

// Add checkbox ability to fade out task if checked
// Add storage