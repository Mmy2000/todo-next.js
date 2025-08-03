"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import TodosTable from "@/components/TodoTable";
import React from "react";
import apiServiceCall from "../service/apiServiceCall";
import { ITodo } from "../interfaces";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/ui/Spinner";
import { useState } from "react";
import TodosFilter from "@/components/TodosFilter";
import AddTodoForm from "@/components/AddTodoForm";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";

const fetchTodos = async ({
  status,
  priority,
  start_date,
  end_date,
  search,
}: {
  status?: string;
  priority?: string;
  start_date?: string;
  end_date?: string;
  search?: string;
} = {}): Promise<ITodo[]> => {
  const queryParams = new URLSearchParams();

  if (status) queryParams.append("status", status);
  if (priority) queryParams.append("priority", priority);
  if (start_date) queryParams.append("start_date", start_date);
  if (end_date) queryParams.append("end_date", end_date);
  if (search) queryParams.append("search", search);

  const res = await apiServiceCall({
    url: `/api/todo/?${queryParams.toString()}`,
    method: "get",
    endpoint: "todos",
  });
  return res.data;
};


const ToDo = () => {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    start_date: "",
    end_date: "",
    search: "",
  });
  const {
    data: todos = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<ITodo[]>({
    queryKey: ["todos", filters],
    queryFn: () => fetchTodos(filters),
  });

  const handleFilterChange = (updatedFilters: typeof filters) => {
    setFilters(updatedFilters);
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      priority: "",
      start_date: "",
      end_date: "",
      search: "",
    });
  };


  return (
    <ProtectedRoute>
      <MaxWidthWrapper>
        <div className="mt-10">
          <AddTodoForm />
          <TodosFilter
            filters={filters}
            clearFilters={clearFilters}
            onChange={handleFilterChange}
            onApply={() => refetch()}
          />
          {isLoading ? (
            <div className="flex justify-center mt-5">
              <Spinner
                size={36}
                color="border-t-zinc-700 dark:border-t-zinc-300"
              />
            </div>
          ) : isError ? (
            <div className="text-center text-red-500">
              Error fetching todos.
            </div>
          ) : (
            <TodosTable todos={todos} />
          )}
        </div>
      </MaxWidthWrapper>
    </ProtectedRoute>
  );
};

export default ToDo;
