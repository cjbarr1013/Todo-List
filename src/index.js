import "./styles.css";
import { UI } from "./modules/UI.js";
import { Manager } from "./modules/Manager.js"

const taskManager = Manager();

//localStorage.clear();
if (localStorage.length === 0) {
    taskManager.addProject("General");
    taskManager.addProject("Work");
    taskManager.addProject("Home");
    taskManager.addTask("First Task", "2024-10-29", "high", "proj-1", "this is the description");
    taskManager.addTask("Second Task", "2024-11-12", "low", "proj-1", "this is the description");
    taskManager.addTask("Third Task", "2024-10-23", "med", "proj-1", "this is the description");
    taskManager.addTask("Fourth Task", "2024-10-30", "high", "proj-1", "this is the description");
    taskManager.addTask("Fifth Task", "2024-10-25", "low", "proj-1", "this is the description");
    taskManager.addTask("Sixth Task", "2024-10-31", "high", "proj-2", "this is the description");
    taskManager.addTask("Seventh Task", "2024-11-16", "low", "proj-2", "this is the description");
    taskManager.addTask("Eighth Task", "2024-10-30", "high", "proj-2", "this is the description");
    taskManager.addTask("Ninth Task", "2024-11-06", "med", "proj-2", "this is the description");
    taskManager.addTask("Tenth Task", "2024-10-21", "med", "proj-3", "this is the description");
    taskManager.addTask("Eleventh Task", "2024-11-09", "high", "proj-3", "this is the description");
    taskManager.addTask("Twelth Task", "2024-11-29", "med", "proj-3", "this is the description");
    taskManager.addTask("Thirteenth Task", "2024-10-29", "high", "proj-3", "this is the description");
    taskManager.addTask("Fourteenth Task", "2024-11-02", "low", "proj-3", "this is the description");
} else {
    taskManager.loadAllFromStorage();
};

const programUI = UI(taskManager);
programUI.initDisplay();




