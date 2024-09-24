export function Project(name, id) {
    let tasks = [];

    const getID = () => id;

    const getTasks = () => tasks;

    const addTask = (task) => {
        tasks.push(task);
    };

    const removeTask = (task) => {
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
    };

    const removeAllTasks = () => {
        tasks = [];
    }

    return {
        name,
        getID,
        getTasks,
        addTask,
        removeTask,
        removeAllTasks
    }
};