import { Request, Response } from "express";
import {
  getAllTodos as getAllTodosService,
  getTodo as getTodoService,
  createTodo as createTodoService,
  updateTodo as updateTodoService,
  deleteTodo as deleteTodoService,
} from "../services/todoService";

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await getAllTodosService();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getTodo = async (req: Request, res: Response): Promise<void | any> => {
  try {
    const { id } = req.params;
    const todo = await getTodoService(parseInt(id));
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const todo = await createTodoService({ title, description });
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const todo = await updateTodoService(parseInt(id), { title, description });
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await deleteTodoService(parseInt(id));
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
