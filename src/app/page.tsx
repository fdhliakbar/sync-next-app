"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Home: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  useEffect(() => {
    // Load todos from localStorage or fetch from API
    const stored = localStorage.getItem('todos');
    const storedTodos = stored ? JSON.parse(stored) : [];
    setTodos(storedTodos);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem('todo') as HTMLInputElement;
    const newTodo = input.value;

    if (!newTodo) return;

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    // Save to localStorage or send to API
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    // OR
    // fetch('/api/todos', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newTodo)
    // });

    input.value = '';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Todo List | Sync Next App</title>
        <meta name="description" content="A simple To-do list application." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-md w-full space-y-8">
        {todos.map((todo, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            style={{ animation: `fadeIn 0.5s ${idx * 0.1}s both` }}
          >
            {editIdx === idx ? (
              <input
                className="flex-1 rounded-lg border border-blue-300 px-2 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                autoFocus
              />
            ) : (
              <span className="text-gray-700 text-base font-medium">{todo}</span>
            )}
            <div className="flex gap-2">
              {editIdx === idx ? (
                <>
                  <button
                    className="px-3 py-1 rounded text-sm text-white bg-green-500 hover:bg-green-700 transition-colors duration-200"
                    onClick={() => {
                      const updatedTodos = todos.map((t, i) => i === idx ? editValue : t);
                      setTodos(updatedTodos);
                      localStorage.setItem('todos', JSON.stringify(updatedTodos));
                      setEditIdx(null);
                      setEditValue('');
                    }}
                  >Save</button>
                  <button
                    className="px-3 py-1 rounded text-sm text-white bg-gray-400 hover:bg-gray-600 transition-colors duration-200"
                    onClick={() => {
                      setEditIdx(null);
                      setEditValue('');
                    }}
                  >Cancel</button>
                </>
              ) : (
                <>
                  <button
                    className="px-3 py-1 rounded text-sm text-white bg-blue-400 hover:bg-blue-600 transition-colors duration-200"
                    onClick={() => {
                      setEditIdx(idx);
                      setEditValue(todo);
                    }}
                  >Edit</button>
                  <button
                    className="px-3 py-1 rounded text-sm text-white bg-red-400 hover:bg-red-600 transition-colors duration-200"
                    onClick={() => {
                      const updatedTodos = todos.filter((_, i) => i !== idx);
                      setTodos(updatedTodos);
                      localStorage.setItem('todos', JSON.stringify(updatedTodos));
                    }}
                  >Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            name="todo"
            className="flex-1 rounded-lg shadow-sm border border-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 transition-all duration-200"
            placeholder="Add a new To-do"
            autoComplete="off"
          />
          <button
            type="submit"
            className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg transition-all duration-200"
          >
            Add
          </button>
        </div>
      </form>
      {/* Tambahkan tombol/link ke halaman list */}
      <div className="mt-8">
        <Link href="/tasks">
          <button className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-900 transition-all duration-200 shadow">
            Go to Task List
          </button>
        </Link>
      </div>
    </div>

  );
  /* Tambahkan animasi fadeIn dengan CSS inline di global atau style jsx jika ingin lebih rapi */
};

export default Home;
