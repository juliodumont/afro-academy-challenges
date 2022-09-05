import { useState } from 'react';
import { FePlus } from '../../assets/Icons';
import { Task, TaskDate } from '../../types';
import { formatDate } from '../../utils/utils';
import './TodoInputs.scss';

type TodoInputsProps = {
  onTaskAdd: (task: Task) => void;
  taskIndex: number;
};

const TodoInputs = ({ onTaskAdd, taskIndex }: TodoInputsProps) => {
  const [task, setTask] = useState({ text: '', date: '' });
  const [error, setError] = useState<boolean>(false);

  const handleTaskAdd = () => {
    const newTask = {
      ...task,
      index: taskIndex,
      completed: false,
      date: { from: formatDate(task.date) } as TaskDate
    };
    if (newTask.date.from === 'Invalid Date') {
      setError(true);
    } else {
      setError(false);
      setTask({ text: '', date: '' });
      onTaskAdd(newTask);
    }
  };

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, text: event.target.value });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, date: event.target.value });
  };

  return (
    <div className="todo-inputs-container">
      <input
        type="text"
        className="base-card"
        placeholder="Insira uma nova atividade"
        onChange={handleTaskChange}
        value={task.text}
      />
      <div>
        <input
          type="text"
          className={`base-card ${error ? 'error' : ''}`}
          placeholder="Insira a data limite para a atividade"
          value={task.date}
          onChange={handleDateChange}
        />
        <button onClick={handleTaskAdd}>
          <FePlus />
        </button>
      </div>
      {error && <p className="error-alert">Insira uma data válida!</p>}
    </div>
  );
};

export default TodoInputs;
