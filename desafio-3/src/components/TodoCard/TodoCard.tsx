import './TodoCard.scss';
import { FeTrash, FeEdit, FeFinalDate, FeInitialDate } from '../../assets/Icons';
import { Task } from '../../types';

type TodoCardProps = {
  task: Task;
  index: number;
  isEditing: boolean;
  onTaskCheck: (taskIndex: number) => void;
  onTaskDelete: (taskIndex: number) => void;
  onTaskEdit: (taskIndex: number) => void;
};

const TodoCard = ({
  task: { text, completed, date },
  index,
  isEditing,
  onTaskCheck,
  onTaskDelete,
  onTaskEdit
}: TodoCardProps) => {
  return (
    <div className={`todo-card-container base-card ${isEditing ? 'editing' : ''}`}>
      <div className="todo-card-task-container">
        <div className="todo-card-task">
          <input type="checkbox" onChange={() => onTaskCheck(index)} />
          <input
            type="text"
            className={`task-text ${completed ? 'completed-task' : ''}`}
            value={text}
          />
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
