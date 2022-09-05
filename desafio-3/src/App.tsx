import { useState } from 'react';
import './App.css';
import { Header, TodoCard, TodoInputs } from './components';
import { Task } from './types';
import { formatDate, getCompletedTasks, removeTaskFromList } from './utils/utils';

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
    setTaskList([]);
  };

  return (
    <div className="App">
      <Header />
      <TodoInputs onTaskAdd={onTaskAdd} taskIndex={taskList.length} />
      <div className="tasks-container">
        <div className="task-counter-container">
          <h2>
            Tarefas concluídas{' '}
            <span>
              {getCompletedTasks(taskList)} de {taskList.length}
            </span>
          </h2>
        </div>
        {taskList.map((task, index) => (
          <TodoCard key={index} task={task} onTaskCheck={onTaskCheck} onTaskDelete={onTaskDelete} />
        ))}
      </div>
    </div>
  );
}

export default App;
