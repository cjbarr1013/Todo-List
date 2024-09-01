import "./styles.css";

function Task(title, description, dueDate, priority) {
    return {
        title,
        description,
        dueDate,
        priority
    };
};

function Project(name) {
    let tasks = [];

    const addTask = (task) => {
        tasks.push(task);
    };

    const removeTask = (task) => {
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
    };

    return {
        name,
        tasks,
        addTask,
        removeTask
    }
};

const myProject = Project("Work");
const task1 = Task("finish spreadhseet", "add date and format for boss", "9/12/22", "low");
const task2 = Task("finish poopy", "take a poopy", "8/2/24", "high");
const task3 = Task("kill self", "do it now bitch", "12/11/23", "high");
myProject.addTask(task1);
myProject.addTask(task2);
myProject.addTask(task3);
console.log(myProject.tasks);