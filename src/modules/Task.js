export function Task(title, description, date, priority, id) {
    const changeDueDate = (newDate) => date = newDate;

    const getDueDate = () => convertToLocalDate(date);

    const convertToLocalDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return new Date(year, month-1, day);
    };
    
    const getID = () => id;
    
    return {
        title,
        description,
        changeDueDate,
        getDueDate,
        priority,
        getID
    };
};