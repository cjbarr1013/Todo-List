export function Project(name) {
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