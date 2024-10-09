import React, { useState } from 'react';
import './TaskProgress.css'; // CSS for styling
import Sidebar from '../../components/Sidebar';

const TaskProgress = () => {
    const [progress, setProgress] = useState(40); // Starting at 40% progress
    const [taskList, setTaskList] = useState([
        { id: 1, task: 'Design mockups', completed: false },
        { id: 2, task: 'Develop frontend', completed: false },
        { id: 3, task: 'Set up backend', completed: true },
        { id: 4, task: 'Testing', completed: false }
    ]);

    // Function to handle manual change of progress
    const handleChange = (e) => {
        setProgress(e.target.value);
    };

    // Dynamically set the color based on progress percentage
    const getProgressColor = (progress) => {
        if (progress < 40) return '#ff4d4d';  // Red for low progress
        if (progress < 70) return '#f4c542';  // Yellow for medium progress
        return '#4caf50';                     // Green for high progress
    };

    // Handle task toggle for completion
    const toggleTaskCompletion = (taskId) => {
        const updatedTasks = taskList.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTaskList(updatedTasks);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="task-progress-container container-fluid p-4">
                <h1 className="mb-4">Task Progress</h1>
                <p className="text-muted mb-5">Welcome to the Task Progress Page. Here you manage your completion and to-do list.</p>
                <h3>Progress Bar</h3>
                <div className="progress-bar-wrapper">
                    <div className="progress-bar-background">
                        <div
                            className="progress-bar-fill"
                            style={{
                                width: `${progress}%`,
                                backgroundColor: getProgressColor(progress)
                            }}
                        ></div>
                    </div>
                    <span className="progress-label">{progress}%</span>
                </div>

                {/* Slider to manually update progress */}
                <div className="progress-input mb-4">
                    <label htmlFor="progress">Set Progress:</label>
                    <input
                        type="range"
                        id="progress"
                        name="progress"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleChange}
                    />
                </div>

                {/* Show breakdown labels */}
                <div className="progress-milestones mb-4">
                    <span>Design Phase</span>
                    <span>Development</span>
                    <span>Testing</span>
                    <span>Completion</span>
                </div>

                {/* Additional Feature: To-Do List */}
                <div className="task-list">
                    <h4>To-Do List</h4>
                    <ul className="list-group">
                        {taskList.map(task => (
                            <li
                                key={task.id}
                                className={`list-group-item ${task.completed ? 'completed-task' : ''}`}
                                onClick={() => toggleTaskCompletion(task.id)}
                            >
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTaskCompletion(task.id)}
                                />
                                {task.task}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TaskProgress;
