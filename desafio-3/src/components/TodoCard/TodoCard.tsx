import './TodoCard.scss';
import { FeTrash, FeEdit, FeFinalDate, FeInitialDate } from '../../assets/Icons';
import { Task } from '../../types';

type TodoCardProps = {
  task: Task;
  onTaskCheck: (taskIndex: number) => void;
  onTaskDelete: (taskIndex: number) => void;
};

const TodoCard = ({
  task: { text, index, completed, date },
  onTaskCheck,
  onTaskDelete
}: TodoCardProps) => {
  return (
    <div className="todo-card-container base-card">
      <div className="todo-card-task-container">
        <div className="todo-card-task">
          <input type="checkbox" onChange={() => onTaskCheck(index)} />
          <p className={`${completed ? 'completed-task' : ''}`}>{text}</p>
        </div>
        <div className="todo-card-buttons-container">
          <button className="edit-button" onClick={() => onTaskDelete(index)}>
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
