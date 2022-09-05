import { useState } from 'react';
import './App.css';
import { TodoCard } from './components';
import Header from './components/Header/Header';
import TodoInputs from './components/TodoInputs/TodoInputs';
import { Task } from './types';
import { formatDate, removeTaskFromList } from './utils/utils';

function App() {
  const [taskList, setTaskList] = useState<Task[]>([
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis perferendis culpa aperiam dolore iusto cum.',
      index: 0,
      completed: false,
      date: {
        to: new Date().toLocaleDateString(),
        from: new Date().toLocaleDateString()
      }
    }
  ]);

  const onTaskAdd = (task: Task) => {
    setTaskList([...taskList, task]);
  };

  const onTaskDelete = (taskIndex: number) => {
    setTaskList(removeTaskFromList(taskList, taskIndex));
  };

  const onTaskCheck = (taskIndex: number) => {
    const task = taskList[taskIndex];
    const updatedTaskList = taskList;
    const updatedTask = {
      ...task,
      completed: !task.completed,
      date: { ...task.date, to: !task.completed ? formatDate(new Date()) : '' }
    };
    updatedTaskList.splice(taskIndex, 1, updatedTask);
    setTaskList(updatedTaskList);
  };

  return (
    <div className="App">
      <Header />
      <TodoInputs onTaskAdd={onTaskAdd} taskIndex={taskList.length} />
      <div className="tasks-container">
        {taskList.map((task, index) => (
          <TodoCard key={index} task={task} onTaskCheck={onTaskCheck} onTaskDelete={onTaskDelete} />
        ))}
      </div>
    </div>
  );
}

export default App;
