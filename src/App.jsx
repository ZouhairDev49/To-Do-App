import { useState,useEffect } from "react";
import "./App.css";
const TestTask = {
  
    id: Date.now(),
    text: "Learning Laravel",
    createdAt: new Date().toLocaleString(),
    completed: false,
  
}
function App() {
  const [tasks, setTasks] = useState([TestTask]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        createdAt: new Date().toLocaleString(),
        completed: false,
      },
    ]);
    setNewTask("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDetails = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      alert(`Task: ${task.text} \nDate Created: ${task.createdAt}`);
    } else {
      alert("Task not found!");
    }
  };

  const handleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleEdit = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setEditingTaskId(id);
      setEditTaskText(task.text);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editTaskText.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId
          ? { ...task, text: editTaskText, createdAt: new Date().toLocaleString() }
          : task
      )
    );
    setEditingTaskId(null);
    setEditTaskText("");
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTaskText("");
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <>
      <form onSubmit={editingTaskId ? handleSaveEdit : handleSubmit}>
        <fieldset>
          <legend>{editingTaskId ? <strong>Edit Task</strong>  : "Add Task"}</legend>
            <span className="time" > <u>Time :</u> {currentTime.toLocaleString()}</span>
          <div className="styled-input-container" >
            <input
              onChange={(e) => (editingTaskId ? setEditTaskText(e.target.value) : setNewTask(e.target.value))}
              type="text"
              placeholder="Write a task..."
              value={editingTaskId ? editTaskText : newTask}
            />
          </div>
          <div>
            <button className="button-93" role="button" type="submit">{editingTaskId ? "Save" : "Add Task"}</button>
            {editingTaskId && <button className="button-92" role="button" type="button" onClick={handleCancelEdit}>Cancel</button>}
          </div>
        </fieldset>
      </form>

      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              <td>{task.text}</td>
              <td>{task.createdAt}</td>
              <td>{task.completed ? "Completed" : "Pending"}</td>
              <td>
                <button className="button-91" role="button" onClick={() => handleDelete(task.id)}>Delete</button>
                <button className="button-91" role="button" onClick={() => handleDetails(task.id)}>Details</button>
                <button className="button-91" role="button" onClick={() => handleComplete(task.id)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button className="button-91" role="button" onClick={() => handleEdit(task.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button className="button-93" role="button" onClick={handleClearCompleted}>Clear Completed Tasks</button>
      </div>
    </>
  );
}

export default App;
