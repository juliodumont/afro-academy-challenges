import './TodoCard.scss';
import { FeTrash, FeEdit, FeFinalDate, FeInitialDate } from '../../assets/Icons';
import { Task } from '../../types';
import { useEffect, useState } from 'react';

type TodoCardProps = {
  task: Task;
  index: number;
  isEditing: boolean;
  onTaskCheck: (taskIndex: number) => void;
  onTaskDelete: (taskIndex: number) => void;
  onTaskEdit: (taskIndex: number, editedTask?: string) => void;
};

const TodoCard = ({
  task: { text, completed, date },
  index,
  isEditing,
  onTaskCheck,
  onTaskDelete,
  onTaskEdit
}: TodoCardProps) => {
  const handleFinishEditing = () => {
    onTaskEdit(index, task);
  };

  const handleTaskEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  useEffect(() => {
    setTask(text);
  }, [isEditing, text]);

  const [task, setTask] = useState<string>(text);

  return (
    <div className={`todo-card-container base-card ${isEditing ? 'editing' : ''}`}>
      <div className="todo-card-task-container">
        <div className="todo-card-task">
          <input type="checkbox" onChange={() => onTaskCheck(index)} />
          {isEditing ? (
            <input
              type="text"
              className={`task-text ${completed ? 'completed-task' : ''}`}
              onBlur={handleFinishEditing}
              onChange={handleTaskEdit}
              autoFocus
              value={task}
            />
          ) : (
            <p className={`task-text ${completed ? 'completed-task' : ''}`}>{text}</p>
          )}
        </div>
        <div className="todo-card-buttons-container">
          <button className="edit-button" onClick={() => onTaskEdit(index)}>
            <FeEdit />
          </button>
          <button className="delete-button" onClick={() => onTaskDelete(index)}>
            <FeTrash />
          </button>
        </div>
      </div>
      {(date.to || date.from) && (
        <div className="todo-card-task-date-container">
          {date.to && (
            <div className="date-container">
              <FeFinalDate />
              <p>Finalizado em {date.to}</p>
            </div>
          )}
          {date.from && (
            <div className="date-container">
              <FeInitialDate />
              <p>Até {date.from}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoCard;
