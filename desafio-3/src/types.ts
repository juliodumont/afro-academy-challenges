export type TaskDate = {
  to: string;
  from: string;
};

export type Task = {
  text: string;
  index: number;
  completed: boolean;
  date: TaskDate;
};
