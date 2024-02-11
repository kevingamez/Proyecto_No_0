// components/NewTaskForm.tsx
import React, { useState } from 'react';
import './NewTaskForm.css';

interface NewTaskFormProps {
  onAdd: (title: string, dueDate: string, category: string, status: string) => void;
  onCancel: () => void;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [categories, setCategories] = useState(['Category 1', 'Category 2']); // Categorias existentes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    onAdd(title, dueDate, category, status);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "new-category") {
      const newCategory = prompt("Please enter the new category name:");
      if (newCategory) {
        setCategories([...categories, newCategory]);
        setCategory(newCategory);
      }
    } else {
      setCategory(value);
    }
  };

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <div className="form-row"> {/* Contenedor de fila para el input de descripción */}
        <input
          type="text"
          placeholder="Description"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="form-row"> {/* Contenedor de fila para fecha, categoría y estado */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={category} onChange={handleCategoryChange}>
          {categories.map((c, index) => (
            <option key={index} value={c}>{c}</option>
          ))}
          <option value="new-category">+ Add new category</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="form-row form-buttons"> {/* Contenedor de fila para los botones */}
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Add task</button>
      </div>
    </form>
  );
};
export default NewTaskForm;
