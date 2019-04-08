export function updateTaskOrderForColummn(stageName, tasksInOrder) {
    const idsInOrder = tasksInOrder.map(task => task.taskId);
    localStorage.setItem(stageName, JSON.stringify(idsInOrder));
}

export function orderTasks(stageName, tasks) {
    let tasksLeft = tasks;
    try {
        const idsInOrder = JSON.parse(localStorage.getItem(stageName));
        const tasksInOrder = idsInOrder.map(id => {
            const foundTask = tasksLeft.find(task => task.taskId === id);
            tasksLeft = tasksLeft.filter(task => task.taskId !== foundTask.taskId);
            return foundTask;
        }).filter(task => task !== undefined);
        return tasksInOrder.concat(tasksLeft);
    } catch (error) {
        return tasks;
    }
}
