import axios from "axios";

export const api = axios.create({
  baseURL: "https://springpostgresqltest.onrender.com",
  //baseURL: "http://localhost:8080",
});
export const todosEndpoint = "/todos";
export const todoEndpoint = "/todo";

export type IdType = number | undefined;

export type TodoType = {
  id: IdType | undefined;
  todoText: string;
  isImportant: boolean;
  isCompleted: boolean;
  createdDate: string | undefined;
  modifiedDate: string | undefined;
};

export const getTodos = async () => {
  const { data } = await api.get(todosEndpoint);
  return data;
};

export const addTodo = async (body: Partial<TodoType>) => {
  const { data } = await api.post(todoEndpoint, body);
  return data;
};
export const addTodoOptions = (newTodo: Partial<TodoType>) => {
  return {
    optimisticData: (todos: TodoType[]) =>
      [...todos, newTodo].sort((a, b) => b.id! - a.id!),
    populateCache: (added: TodoType, todos: TodoType[]) =>
      [...todos, added].sort((a, b) => b.id! - a.id!),
    rollbackOnError: true,
    revalidate: false,
  };
};

export const updateTodo = async (body: Partial<TodoType>) => {
  const { data } = await api.put(`${todoEndpoint}/${body.id}`, body);
  return data;
};
export const updateTodoOptions = (updatedTodo: Partial<TodoType>) => {
  return {
    optimisticData: (todos: TodoType[]) => {
      const prevTodos = todos.filter((item) => item.id !== updatedTodo.id);
      return [...prevTodos, updatedTodo].sort((a, b) => b.id! - a.id!);
    },
    populateCache: (updated: TodoType, todos: TodoType[]) => {
      const prevTodos = todos.filter((item) => item.id !== updated.id);
      return [...prevTodos, updated].sort((a, b) => b.id! - a.id!);
    },
    rollbackOnError: true,
    revalidate: false,
  };
};

export const deleteTodo = async (id: IdType) => {
  const { data } = await api.delete(`${todoEndpoint}/${id}`);
  return data;
};
export const deleteTodoOptions = (id: IdType) => {
  return {
    optimisticData: (todos: TodoType[]) =>
      todos.filter((todo) => todo.id !== id),
    populateCache: (_: any, todos: TodoType[]) =>
      todos.filter((todo) => todo.id !== id),
    rollbackOnError: true,
    revalidate: false,
  };
};

// Maybe put this everywhere for more error information
//
// export const getTodos = async () => {
//   try {
//     const { data } = await api.get(todosEndpoint)
//     return data
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       return {
//         message: error.message,
//         status: error.response?.status
//       }
//     } else {
//       return {
//         message: "Error",
//         status: 0
//       }
//     }
//   }
// };
