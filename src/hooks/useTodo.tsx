import { useState } from "react";
import {
  IdType,
  TodoType,
  todosEndpoint,
  getTodos,
  addTodo,
  addTodoOptions,
  updateTodo,
  updateTodoOptions,
  deleteTodo,
  deleteTodoOptions,
} from "../api/config.tsx";
import useSWR from "swr";
import toast from "react-hot-toast";

const useTodo = () => {
  // get todos using SWR
  const {
    isLoading,
    data: todos,
    mutate,
  } = useSWR(todosEndpoint, getTodos, {
    onSuccess: (data) =>
      data.sort((a: TodoType, b: TodoType) => (a.id! > b.id! ? -1 : 1)),
  });

  const emptyTodo: TodoType = {
    id: undefined,
    todoText: "",
    isImportant: false,
    isCompleted: false,
    createdDate: undefined,
    modifiedDate: undefined,
  };
  const [editedTodo, setEditedTodo] = useState<TodoType>(emptyTodo);

  const deleteTodoMutation = async (id: IdType) => {
    try {
      await mutate(deleteTodo(id), deleteTodoOptions(id));
      toast.success("Todo deleted succesfully.");
    } catch (err: unknown) {
      toast.error(`Delete error: ${err}`);
    }
  };

  const updateTodoMutation = async (updatedTodo: TodoType) => {
    try {
      await mutate(updateTodo(updatedTodo), updateTodoOptions(updatedTodo));
      toast.success("Todo updated succesfully.");
    } catch (err: any) {
      toast.error(`Update error: ${err}`);
    }
  };

  const addTodoMutation = async (newTodo: TodoType) => {
    try {
      await mutate(addTodo(newTodo), addTodoOptions(newTodo));
      toast.success("Todo added succesfully.");
    } catch (err: any) {
      toast.error(`Update error: ${err}`);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setEditedTodo({ ...editedTodo, [name]: value });
  };

  const onEdit = (edTodo: TodoType) => {
    setEditedTodo(edTodo);
  };

  const onAbortEdit = () => {
    setEditedTodo(emptyTodo);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editedTodo.id) {
      addTodoMutation(editedTodo);
    } else {
      updateTodoMutation(editedTodo);
    }
    setEditedTodo(emptyTodo);
  };

  // hook allows access to from outside:
  return {
    todos,
    isLoading,
    deleteTodoMutation,
    updateTodoMutation,
    editedTodo,
    onSubmit,
    onChange,
    onEdit,
    onAbortEdit,
  };
};

export default useTodo;
