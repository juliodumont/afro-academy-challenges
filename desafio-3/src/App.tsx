import { useState } from 'react';
import './App.css';
import { FeClipboard } from './assets/Icons';
import { Header, TodoCard, TodoInputs } from './components';
import { Task } from './types';
import { formatDate, getCompletedTasks, removeTaskFromList } from './utils/utils';

function App() {
  const [taskList, setTaskList] = useState<Task[]>([
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis perferendis culpa aperiam dolore iusto cum.',
      completed: false,
      date: {
        to: new Date().toLocaleDateString(),
        from: new Date().toLocaleDateString()
      }
    }
  ]);

  const [isEditing, setIsEditing] = useState({ type: false, index: 0 });

  const onTaskEdit = (taskIndex: number) => {
    setIsEditing({
      type: true,
      index: taskIndex
    });
  };

  const onTaskAdd = (task: Task) => {
    setTaskList([...taskList, task]);
  };

  const onTaskDelete = (taskIndex: number) => {
    setTaskList(removeTaskFromList(taskList, taskIndex));
  };

  const onTaskCheck = (taskIndex: number) => {
    const task = taskList[taskIndex];
    const updatedTaskList = [...taskList];
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
        {taskList.length > 0 ? (
          <>
            <div className="task-counter-container">
              <h2>
                Tarefas concluídas{' '}
                <span>
                  {getCompletedTasks(taskList)} de {taskList.length}
                </span>
              </h2>
            </div>

            {taskList.map((task, index) => (
              <TodoCard
                key={index}
                task={task}
                index={index}
                isEditing={isEditing.type && isEditing.index === index}
                onTaskCheck={onTaskCheck}
                onTaskDelete={onTaskDelete}
                onTaskEdit={onTaskEdit}
              />
            ))}
          </>
        ) : (
          <div className="no-tasks-message-container">
            <FeClipboard />
            <p>Você não tem nenhuma tarefa no momento.</p>
            <p>Adicione novas tarefas para que elas sejam mostradas.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
