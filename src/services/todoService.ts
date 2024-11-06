import prisma from "../config/prisma";
import { Todo } from "@prisma/client";

export const getAllTodos = async (): Promise<Todo[]> => {
  return await prisma.todo.findMany();
};

export const getTodo = async (id: number): Promise<Todo | null> => {
  return await prisma.todo.findUnique({
    where: {
      id,
    },
  });
};

export const createTodo = async (data: {
  title: string;
  description: string;
}): Promise<Todo> => {
  return await prisma.todo.create({
    data,
  });
};

export const updateTodo = async (
  id: number,
  data: { title?: string; description?: string }
): Promise<Todo> => {
  return await prisma.todo.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteTodo = async (id: number): Promise<Todo> => {
  return await prisma.todo.delete({
    where: {
      id,
    },
  });
};
