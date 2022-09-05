import { useState } from 'react';
import './App.css';
import { FeClipboard } from './assets/Icons';
import { Header, TodoCard, TodoInputs } from './components';
import { Task } from './types';
import { getCompletedTasks, removeTaskFromList, updateTask } from './utils/utils';

function App() {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const [isEditing, setIsEditing] = useState({ type: false, index: 0 });

  const onTaskEdit = (taskIndex: number, editedTask = '') => {
    if (editedTask !== '') {
      const updatedTaskList = [...taskList];
      const updatedTask = updateTask(taskList, taskIndex, editedTask, false);
      updatedTaskList.splice(taskIndex, 1, updatedTask);
      setTaskList(updatedTaskList);
    }
    setIsEditing({
      type: !isEditing.type,
      index: taskIndex
    });
  };

  const onTaskAdd = (task: Task) => {
    setTaskList([...taskList, task]);
  };

  const onTaskDelete = (taskIndex: number) => {
    const taskWasBeingEdited = isEditing.type && isEditing.index === taskIndex;
    if (taskWasBeingEdited) {
      setIsEditing({ type: false, index: 0 });
    }
    setTaskList(removeTaskFromList(taskList, taskIndex));
  };

  const onTaskCheck = (taskIndex: number) => {
    const updatedTaskList = [...taskList];
    const updatedTask = updateTask(taskList, taskIndex, '', true);
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
