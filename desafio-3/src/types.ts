export type TaskDate = {
  to: string;
  from: string;
};

export type Task = {
  text: string;
  completed: boolean;
  date: TaskDate;
};
