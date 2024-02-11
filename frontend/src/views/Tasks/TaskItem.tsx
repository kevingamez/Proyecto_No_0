// components/TaskItem.tsx
import React, { useState } from 'react';

interface TaskItemProps {
    id: number;
  title: string;
  dueDate: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, dueDate, onDelete }) => {
  const [completed, setCompleted] = useState(false);

  const handleCheckboxChange = () => {
    setCompleted(!completed);
  };


  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <label className="task-content">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        <div className="task-details">
          <span className="task-title">{title}</span>
          <span className="task-due-date">{dueDate}</span>
        </div>
      </label>
      <div className="task-actions">
        <span className="task-edit" onClick={() => onEdit(id)}>
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
