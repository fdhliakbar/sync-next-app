"use client";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';


const TaskManagement: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [task, setTask] = useState<{ title: string; completed?: boolean } | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`/api/tasks/${id}`)
                .then(res => res.json())
                .then(data => {
                    setTask(data);
                    setInputValue(data.title);
                })
                .catch(() => setMessage('Task not found'))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        if (!id || !inputValue.trim()) return;
        setLoading(true);
        const updatedTask = { ...task, title: inputValue || '' };
        await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        });
        setTask({ title: updatedTask.title, completed: updatedTask.completed });
        setEditMode(false);
        setMessage('Task updated!');
        setLoading(false);
        setTimeout(() => setMessage(''), 1500);
    };

    const handleComplete = async () => {
        if (!id) return;
        setLoading(true);
        const updatedTask = { ...task, completed: true };
        await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        });
        setTask({ title: updatedTask.title || '', completed: true });
        setMessage('Task marked as complete!');
        setLoading(false);
        setTimeout(() => setMessage(''), 1500);
    };

    const handleDelete = async () => {
        if (!id) return;
        setLoading(true);
        await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
        });
        setMessage('Task deleted!');
        setLoading(false);
        setTimeout(() => {
            setMessage('');
            router.push('/');
        }, 1200);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-500 to-gray-700 py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl text-white font-bold mb-4">Task Management</h2>
            <div className="mt-8 w-full max-w-md">
                {loading && <div className="text-white text-center animate-pulse">Loading...</div>}
                {message && <div className="text-green-400 text-center mb-2 animate-fadeIn">{message}</div>}
                {task && (
                    <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-2xl">
                        <div className="flex flex-col gap-4">
                            {editMode ? (
                                <input
                                    type="text"
                                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    autoFocus
                                />
                            ) : (
                                <h3 className={`text-xl font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'} transition-all duration-200`}>{task.title}</h3>
                            )}
                            <div className="flex gap-2 mt-2">
                                {!editMode && (
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
                                        onClick={handleEdit}
                                    >Edit</button>
                                )}
                                {editMode && (
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-700 transition-all duration-200"
                                        onClick={handleSave}
                                    >Save</button>
                                )}
                                <button
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-700 transition-all duration-200"
                                    onClick={handleComplete}
                                    disabled={!!task.completed}
                                >{task.completed ? 'Completed' : 'Mark as Complete'}</button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-700 transition-all duration-200"
                                    onClick={handleDelete}
                                >Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskManagement;
