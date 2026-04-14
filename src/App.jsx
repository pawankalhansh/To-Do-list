import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [priority, setPriority] = useState('medium')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [filter, setFilter] = useState('all')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask, 
        completed: false, 
        priority: priority,
        createdAt: new Date().toLocaleDateString()
      }])
      setNewTask('')
      setPriority('medium')
    }
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const startEdit = (id, text) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = () => {
    setTasks(tasks.map(task => task.id === editingId ? { ...task, text: editText } : task))
    setEditingId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  const completedCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })

  return (
    <div className="app">
      <div className="header">
        <div className="header-content">
          <h1>📋 Daily Tasks</h1>
          <p className="date">{today}</p>
        </div>
        <div className="progress-circle">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" className="bg-circle" />
            <circle cx="50" cy="50" r="45" className="progress-circle" 
              style={{strokeDashoffset: 282.7 - (282.7 * completedCount / (totalCount || 1))}} />
          </svg>
          <div className="progress-text">
            <span className="progress-number">{completedCount}/{totalCount}</span>
            <span className="progress-label">Done</span>
          </div>
        </div>
      </div>

      <div className="input-section">
        <div className="input-wrapper">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="task-input"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="priority-select">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={addTask} className="add-btn">+</button>
        </div>
      </div>

      <div className="filter-section">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {sortedTasks.length > 0 ? (
        <ul className="task-list">
          {sortedTasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
              <div className="task-checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="task-checkbox"
                />
                <span className={`priority-badge ${task.priority}`}>{task.priority.charAt(0).toUpperCase()}</span>
              </div>
              <div className="task-content">
                {editingId === task.id ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      autoFocus
                    />
                  </div>
                ) : (
                  <span className="task-text">{task.text}</span>
                )}
              </div>
              <div className="task-actions">
                {editingId === task.id ? (
                  <>
                    <button className="save-btn" onClick={saveEdit}>✓</button>
                    <button className="cancel-btn" onClick={cancelEdit}>✕</button>
                  </>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => startEdit(task.id, task.text)}>✎</button>
                    <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">✨</div>
          <p>No tasks yet. Add one to get started!</p>
        </div>
      )}
    </div>
  )
}

export default App
