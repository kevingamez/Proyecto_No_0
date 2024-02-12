import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import NewTaskForm from '../../components/NewTaskForm';
import './Task.css';

interface Status {
    key: string;
    value: string;
  }
  
  interface Category {
    id: number;
    name: string;
    description: string;
  }
  
  interface Task {
    id: number;
    text: string;
    creationDate: string;
    deadline: string;
    status: Status;
    category: Category;
  }
  

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);
    const [isEditing, setIsEditing] = useState<number | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/tasks')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []); 

    const handleAddTask = (title: string, dueDate: string) => {
        const newTask = { title, dueDate };

        fetch('http://localhost:8080/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
        .then(response => response.json())
        .then(addedTask => {
            setTasks([...tasks, addedTask]); // Asume que el servidor responde con la tarea agregada, incluido su ID
            setShowNewTaskForm(false);
        })
        .catch(error => console.error('Error adding task:', error));
    };

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleShowNewTaskForm = () => {
        setShowNewTaskForm(true);
    };

    const handleCancelNewTask = () => {
        setShowNewTaskForm(false);
    };

    const handleEdit = (id: number) => {
        setIsEditing(id);
    };

    const taskToEdit = tasks.find(task => task.id === isEditing);

    return (
        <div className="task-list">
            {tasks.map(task => (
  <TaskItem
    key={task.id}
    id={task.id}
    text={task.text}
    creationDate={task.creationDate}
    deadline={task.deadline}
    status={task.status} // Ahora es un objeto
    category={task.category} // Ahora es un objeto
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
