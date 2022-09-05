import { useState } from 'react';
import { FePlus } from '../../assets/Icons';
import { Task, TaskDate } from '../../types';
import { checkDateAndFormat } from '../../utils/utils';
import './TodoInputs.scss';

type TodoInputsProps = {
  onTaskAdd: (task: Task) => void;
  taskIndex: number;
};

const TodoInputs = ({ onTaskAdd, taskIndex }: TodoInputsProps) => {
  const [task, setTask] = useState({ text: '', date: '' });
  const [error, setError] = useState({ date: false, text: false });

  const handleTaskAdd = () => {
    const newTask = {
      ...task,
      index: taskIndex,
      completed: false,
      date: { from: checkDateAndFormat(task.date) } as TaskDate
    };
    const isValidDate = !(newTask.date.from === 'Invalid Date');
    const isValidTask = !(newTask.text === '');

    if (!isValidDate || !isValidTask) {
      setError({ text: !isValidTask, date: !isValidDate });
    } else {
      setError({ text: false, date: false });
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
        className={`base-card ${error.text ? 'error' : ''}`}
        placeholder="Insira uma nova atividade"
        onChange={handleTaskChange}
        value={task.text}
      />
      {error.text && <p className="error-alert">A tarefa não pode estar em branco!</p>}
      <div>
        <input
          type="text"
          className={`base-card ${error.date ? 'error' : ''}`}
          placeholder="Insira a data limite para a atividade"
          value={task.date}
          onChange={handleDateChange}
        />
        <button onClick={handleTaskAdd}>
          <FePlus />
        </button>
      </div>
      {error.date && <p className="error-alert">Insira uma data válida!</p>}
    </div>
  );
};

export default TodoInputs;
