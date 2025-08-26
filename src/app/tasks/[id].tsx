import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const TaskManagement: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [task, setTask] = useState<string>('');

    // Fetch task details based on id
    // ...existing code...
    useEffect(() => {
        if (id) {
            fetch(`/api/tasks/${id}`)
                .then(res => res.json())
                .then(data => setTask(data.title)); // misal task punya property 'title'
        }
    }, [id]);
    // ...existing code...

    // Handle edits
    const handleEdit = () => {
        // Logic to update the task, save changes, and navigate back
    };

    // Additionally, you might want to add buttons or forms to:
    // - Mark the task as complete
    // - Delete the task

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-500 py-12 px-4 sm:px-6 lg:px:8">
            <h2 className="text-3xl text-white font-bold">Task Management</h2>
            <div className="mt-8">
                {task && (
                    <div className="bg-white shadow-md rounded-lg p-4">
                        {/* Display task details */}
                        <h3 className="text-xl font-semibold">{task}</h3>
                        <button onClick={handleEdit}>Edit</button>
                        {/* Add more buttons or forms for completion, deletion as needed */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskManagement;
