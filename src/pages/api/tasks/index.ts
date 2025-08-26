// filepath: src/pages/api/tasks/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Todo = {
  id: number;
  title: string;
  completed?: boolean;
};

const todos: Todo[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(todos);
  } else if (req.method === 'POST') {
    const newTodo = req.body;
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else {
    res.status(405).end();
  }
}