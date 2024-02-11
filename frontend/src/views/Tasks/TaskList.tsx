// components/TaskList.tsx
import React, { useState } from 'react';
import TaskItem from './TaskItem';
import NewTaskForm from '../../components/NewTaskForm';
import './Task.css';

const initialTasks = [
  { id: 1, title: 'Responder emails Uniandes', dueDate: 'Today' },
  { id: 2, title: 'Enviar Propuesta de Trabajo', dueDate: 'Thursday' },
  // ... more tasks
];

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [showNewTaskForm, setShowNewTaskForm] = useState(false); // Nuevo estado para el formulario
    const [isEditing, setIsEditing] = useState<number | null>(null);

    const handleAddTask = (title: string, dueDate: string) => {
        // Lógica para añadir una nueva tarea
        const newTaskId = Math.max(0, ...tasks.map(t => t.id)) + 1; // Crear un nuevo ID
        const newTask = {
            id: newTaskId,
            title: title,
            dueDate: dueDate,
        };
        setTasks([...tasks, newTask]);
        setShowNewTaskForm(false); // Ocultar formulario después de agregar
    };

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleShowNewTaskForm = () => {
        setShowNewTaskForm(true); // Mostrar el formulario
    };

    const handleCancelNewTask = () => {
        setShowNewTaskForm(false); // Ocultar el formulario
    };

    const handleEdit = (id: number) => {
        setIsEditing(id); // Establece el ID de la tarea a editar
      };
    
      const taskToEdit = tasks.find(task => task.id === isEditing);
    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    dueDate={task.dueDate}
                    onDelete={deleteTask}
                    onEdit={handleEdit}
                />
            ))}
            {!showNewTaskForm && (
                <button className="add-task-button" onClick={handleShowNewTaskForm}>
                    <span className="add-task-icon">+</span>
                    Add task
                </button>
            )}
            {showNewTaskForm && (
                <NewTaskForm onAdd={handleAddTask} onCancel={handleCancelNewTask} />
            )}
        </div>
    );
}

export default TaskList;
