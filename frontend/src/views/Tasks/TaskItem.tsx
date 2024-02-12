// components/TaskItem.tsx
import React, { useState } from 'react';

interface Status {
  key: string;
  value: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

interface TaskItemProps {
  id: number;
  text: string;
  creationDate: string;
  deadline: string;
  status: Status;
  category: Category;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  id, text, creationDate, deadline, status, category, onDelete 
}) => {
  const [completed, setCompleted] = useState(false);

  const handleCheckboxChange = () => {
    setCompleted(!completed);
  };

  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleCheckboxChange}
        className="task-checkbox" // Añadir clase para estilización
      />
      <label className="task-content">
        <div className="task-details">
          <span className="task-title">{text}</span>
          <div className="task-info">
            <div className="task-status">{status?.value}</div>
            <div className="task-due-date-wrapper">
              <span className="creation-date">{creationDate}</span>
              <span className="task-due-date">{deadline}</span>
              
            </div>
          </div>
        </div>
      </label>
      <div className="task-actions">
        <span className="task-edit">
          ✏️
        </span>
        <span className="task-delete" onClick={() => onDelete(id)}>
          ❌
        </span>
      </div>

    </div>
  );
}

export default TaskItem;
