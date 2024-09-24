export function Task(title, description, dueDate, priority, id) {
    const getID = () => id;
    
    return {
        title,
        description,
        dueDate,
        priority,
        getID
    };
};