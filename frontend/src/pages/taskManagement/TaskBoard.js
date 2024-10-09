import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TaskBoard.css';

const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Induction Form', assignedTo: 'Leo Nishikawa' },
        'task-2': { id: 'task-2', content: 'Building Inspection Form', assignedTo: 'Taejoo Ha' },
        'task-3': { id: 'task-3', content: 'Construction Inspection Form', assignedTo: 'Yumo Li' },
        'task-4': { id: 'task-4', content: 'Training Induction', assignedTo: 'Raj Khanal' }
    },
    columns: {
        'todo': {
            id: 'todo',
            title: 'To Do',
            taskIds: ['task-1', 'task-2']
        },
        'in-progress': {
            id: 'in-progress',
            title: 'In Progress',
            taskIds: ['task-3']
        },
        'done': {
            id: 'done',
            title: 'Completed',
            taskIds: ['task-4']
        }
    },
    columnOrder: ['todo', 'in-progress', 'done']
};

const KanbanBoard = () => {
    const [data, setData] = useState(initialData);
    const [newTaskContent, setNewTaskContent] = useState('');
    const [assignedUser, setAssignedUser] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingContent, setEditingContent] = useState('');

    // Handle drag and drop
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            const newData = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn
                }
            };
            setData(newData);
            return;
        }

        // Moving between columns
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newData = {
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        setData(newData);
    };

    // Add a new task
    const addTask = () => {
        if (!newTaskContent || !assignedUser) {
            alert('Task content and assigned user are required.');
            return;
        }
    
        const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
        const newTask = { id: newTaskId, content: newTaskContent, assignedTo: assignedUser };
        const newTasks = { ...data.tasks, [newTaskId]: newTask };
    
        const newColumn = {
            ...data.columns['todo'],
            taskIds: [...data.columns['todo'].taskIds, newTaskId]
        };
    
        const newData = {
            ...data,
            tasks: newTasks,
            columns: {
                ...data.columns,
                todo: newColumn 
            }
        };
    
        setData(newData);
        setNewTaskContent('');
        setAssignedUser('');
    };

    // Edit a task
    const editTask = (taskId) => {
        setEditingTaskId(taskId);
        setEditingContent(data.tasks[taskId].content);
    };

    const saveTaskEdit = (taskId) => {
        const updatedTask = { ...data.tasks[taskId], content: editingContent };
        const newTasks = { ...data.tasks, [taskId]: updatedTask };

        setData({ ...data, tasks: newTasks });
        setEditingTaskId(null);
        setEditingContent('');
    };

    // Remove a task
    const removeTask = (taskId) => {
        const newTasks = { ...data.tasks };
        delete newTasks[taskId];

        const newColumns = Object.keys(data.columns).reduce((acc, colId) => {
            acc[colId] = {
                ...data.columns[colId],
                taskIds: data.columns[colId].taskIds.filter(id => id !== taskId)
            };
            return acc;
        }, {});

        setData({ ...data, tasks: newTasks, columns: newColumns });
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="kanban-board-container container-fluid p-4">
                <h1 className="mb-4">Task Board</h1>
                <p className="text-muted mb-5">Welcome to the Task Board! Here you can manage your tasks by dragging and dropping accordingly.</p>
                <div className="add-task-form mb-4">
                    <input
                        type="text"
                        placeholder="New Task"
                        value={newTaskContent}
                        onChange={(e) => setNewTaskContent(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Assigned To"
                        value={assignedUser}
                        onChange={(e) => setAssignedUser(e.target.value)}
                    />
                    <button className="btn btn-success" onClick={addTask}>Add Task</button>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="kanban-board">
                        {data.columnOrder.map(columnId => {
                            const column = data.columns[columnId];
                            const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

                            return <Column key={column.id} column={column} tasks={tasks} editTask={editTask} removeTask={removeTask} saveTaskEdit={saveTaskEdit} editingTaskId={editingTaskId} editingContent={editingContent} setEditingContent={setEditingContent} />;
                        })}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
};

const Column = ({ column, tasks, editTask, removeTask, saveTaskEdit, editingTaskId, editingContent, setEditingContent }) => {
    return (
        <div className="kanban-column">
            <h3>{column.title}</h3>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div className="kanban-tasks" ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} editTask={editTask} removeTask={removeTask} saveTaskEdit={saveTaskEdit} editingTaskId={editingTaskId} editingContent={editingContent} setEditingContent={setEditingContent} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

const Task = ({ task, index, editTask, removeTask, saveTaskEdit, editingTaskId, editingContent, setEditingContent }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`kanban-task ${snapshot.isDragging ? 'dragging' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {editingTaskId === task.id ? (
                        <>
                            <input
                                type="text"
                                value={editingContent}
                                onChange={(e) => setEditingContent(e.target.value)}
                            />
                            <button className="btn btn-sm btn-primary" onClick={() => saveTaskEdit(task.id)}>Save</button>
                        </>
                    ) : (
                        <>
                            <div>
                                <strong>{task.content}</strong>
                                <p><em>Assigned to: {task.assignedTo}</em></p>
                            </div>
                            <button className="btn btn-sm btn-warning" onClick={() => editTask(task.id)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => removeTask(task.id)}>Remove</button>
                        </>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default KanbanBoard;
