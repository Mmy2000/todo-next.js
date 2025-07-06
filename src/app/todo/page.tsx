"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import TodosTable from "@/components/TodoTable";
import React from "react";
import apiServiceCall from "../service/apiServiceCall";
import { ITodo } from "../interfaces";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/ui/Spinner";

const fetchTodos = async (): Promise<ITodo[]> => {
  const res = await apiServiceCall({
    url: "/api/todo/",
    method: "get",
    endpoint: "todos",
  });
  return res.data;
};

const ToDo = () => {
  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery<ITodo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center w-full justify-center mt-5">
          <Spinner size={36} color="border-t-zinc-700 dark:border-t-zinc-300" />
        </div>
      </ProtectedRoute>
    );
  }

  if (isError) {
    return (
      <ProtectedRoute>
        <div className="mt-10 text-center text-red-500">
          Error fetching todos.
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="mt-10">
        <TodosTable todos={todos} />
      </div>
    </ProtectedRoute>
  );
};

export default ToDo;
