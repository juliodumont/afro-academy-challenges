import { Task } from '../types';

export const removeTaskFromList = (taskList: Task[], taskIndex: number): Task[] => {
  return taskList.filter((_task, index) => (index === taskIndex ? false : true));
};

export const formatDate = (date: Date | string) => {
  return date === '' ? '' : new Date(date).toLocaleDateString();
};

export const getCompletedTasks = (taskList: Task[]) => {
  const completedTasks = [];
  taskList.forEach((task) => (task.completed ? completedTasks.push('') : ''));
  return completedTasks.length;
};

export const checkDateAndFormat = (date: string) => {
  const datePatterns = [
    /^\d{1,2}\/\d{1,2}\/\d{4}$/,
    /^\d{1,2}\-\d{1,2}\-\d{4}$/,
    /^\d{4}\/\d{1,2}\/\d{1,2}$/,
    /^\d{4}\-\d{1,2}\-\d{1,2}$/
  ];
  if (datePatterns.some((pattern) => pattern.test(date))) {
    const dateParts = date.includes('/') ? date.split('/') : date.split('-');
    const resultingDate = dateParts[2].length === 4 ? dateParts.reverse().join() : date;
    return formatDate(resultingDate);
  }
  return date === '' ? '' : 'Invalid Date';
};

export const updateTask = (
  taskList: Task[],
  taskIndex: number,
  editedTask = '',
  changeTask = false
) => {
  const task = taskList[taskIndex];

  const updatedTask = {
    ...task,
    text: editedTask
  };

  const newTask = {
    ...task,
    completed: !task.completed,
    date: { ...task.date, to: !task.completed ? formatDate(new Date()) : '' }
  };

  return changeTask ? newTask : updatedTask;
};
