"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const TasksList: React.FC = () => {
    const [todos, setTodos] = useState<string[]>([]);

    useEffect(() => {
        // Load todos from localStorage or fetch from API
        const stored = localStorage.getItem("todos");
        const storedTodos = stored ? JSON.parse(stored) : [];
        setTodos(storedTodos);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-8">All Tasks</h1>
            <div className="max-w-md w-full space-y-6">
                {todos.length === 0 ? (
                    <div className="text-center text-gray-500">No tasks found.</div>
                ) : (
                    todos.map((todo, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                            style={{ animation: `fadeIn 0.5s ${idx * 0.1}s both` }}
                        >
                            <span className="text-gray-700 text-base font-medium">{todo}</span>
                            {/* Example: Link to detail page if you have /tasks/[id] */}

                        </div>
                    ))
                )}
            </div>
            <Link href="/">
                <button className="mt-8 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-900 transition-all duration-200">
                    Back to Homepage
                </button>
            </Link>
        </div>
    );
};

export default TasksList;
