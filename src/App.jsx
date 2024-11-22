import React, { useState } from 'react';
import './App.css';

const App = () => {
  
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  
  const [tasks, setTasks] = useState(storedTasks);
  const [allTasks, setAllTasks] = useState(storedTasks);
  const [darkMode, setDarkMode] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskColor, setNewTaskColor] = useState('#ffffff');


  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: Math.random(),
      description: newTaskDescription,
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
      isCompleted: false,
      color: newTaskColor,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setAllTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    resetTaskForm();
  };

  
  const editTask = (task) => {
    setEditingTask(task);
    setNewTaskDescription(task.description);
    setNewTaskPriority(task.priority);
    setNewTaskDueDate(task.dueDate);
    setNewTaskColor(task.color);
  };

  const saveTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id
        ? { ...task, description: newTaskDescription, priority: newTaskPriority, dueDate: newTaskDueDate, color: newTaskColor }
        : task
    );
    setTasks(updatedTasks);
    setAllTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    resetTaskForm();
    setEditingTask(null);
  };

  const resetTaskForm = () => {
    setNewTaskDescription('');
    setNewTaskPriority('Medium');
    setNewTaskDueDate('');
    setNewTaskColor('#ffffff');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setAllTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };


  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
    setAllTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  
  const sortTasksByDueDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    setTasks(sortedTasks);
    setAllTasks(sortedTasks);
    localStorage.setItem('tasks', JSON.stringify(sortedTasks));
  };


  const filterTasksByPriority = (priority) => {
    const filteredTasks = allTasks.filter((task) => task.priority === priority);
    setTasks(filteredTasks);
  };

  
  const showAllTasks = () => setTasks(allTasks);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <h1>To-Do List</h1>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

    
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
        />
        <input
          type="color"
          value={newTaskColor}
          onChange={(e) => setNewTaskColor(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

  
      <h2>Task List</h2>
      <button onClick={sortTasksByDueDate}>Sort by Due Date</button>
      <div>
        <h3>Filter by Priority:</h3>
        <button onClick={() => filterTasksByPriority('Low')}>Low</button>
        <button onClick={() => filterTasksByPriority('Medium')}>Medium</button>
        <button onClick={() => filterTasksByPriority('High')}>High</button>
        <button onClick={showAllTasks}>Show All Tasks</button>
      </div>

      
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTask && editingTask.id === task.id ? (
              <div>
                <input
                  type="text"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <input
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                />
                <input
                  type="color"
                  value={newTaskColor}
                  onChange={(e) => setNewTaskColor(e.target.value)}
                />
                <button onClick={saveTask}>Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </div>
            ) : (
              <div style={{ background: task.color }}>
                <span
                  style={{
                    textDecoration: task.isCompleted ? 'line-through' : 'none',
                  }}
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  {task.description} - Priority: {task.priority} - Due: {task.dueDate}
                </span>
                <button onClick={() => editTask(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>

     
      <h3>Total Tasks: {tasks.length}</h3>
    </div>
  );
};

export default App;
