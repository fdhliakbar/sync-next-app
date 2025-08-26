// filepath: src/pages/api/tasks/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Todo = {
  id: number;
  title: string;
  completed?: boolean;
};

let todos: Todo[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const taskId = parseInt(id as string);

  if (req.method === 'GET') {
    const found = todos.find(t => t.id === taskId);
    if (!found) return res.status(404).end('Task not found');
    res.status(200).json(found);
  } else if (req.method === 'PUT') {
    const index = todos.findIndex(t => t.id === taskId);
    if (index === -1) return res.status(404).end('Task not found');
    todos[index] = req.body;
    res.status(200).json(todos[index]);
  } else if (req.method === 'DELETE') {
    todos = todos.filter(t => t.id !== taskId);
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}