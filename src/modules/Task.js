export function Task(title, description, date, priority, id) {
    let complete = false;
    
    const changeDueDate = (newDate) => date = newDate;

    const getDueDate = () => convertToLocalDate(date);

    const convertToLocalDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return new Date(year, month-1, day);
    };

    const toggleComplete = () => complete ? complete = false : complete = true;

    const isComplete = () => complete;
    
    const getID = () => id;
    
    return {
        title,
        description,
        priority,
        changeDueDate,
        getDueDate,
        toggleComplete,
        isComplete,
        getID
    };
};