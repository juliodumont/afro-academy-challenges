import { Task } from '../types';

export const removeTaskFromList = (taskList: Task[], taskIndex: number): Task[] => {
  return taskList.filter((_task, index) => (index === taskIndex ? false : true));
};

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString();
};
