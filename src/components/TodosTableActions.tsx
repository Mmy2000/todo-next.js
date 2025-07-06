"use client";
import React from "react";
import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import { ITodo } from "@/app/interfaces";
import Spinner from "./ui/Spinner";
import apiServiceCall from "@/app/service/apiServiceCall";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TodosTableActions = ({ todo }: { todo: ITodo }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiServiceCall({
        url: `/api/todo/${id}/`,
        method: "delete",
        endpoint: "todos",
      });
    },
    onSuccess: () => {
      toast.success("Task deleted successfully");
      // Invalidate and refetch the todos
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => {
      toast.error("Failed to delete the task.");
    },
  });

  return (
    <>
      <Button>
        <Pen size={16} />
      </Button>
      <Button
        onClick={() => deleteMutation.mutate(todo.id)}
        size={"icon"}
        variant={"destructive"}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending ? <Spinner size={22} /> : <Trash size={16} />}
      </Button>
    </>
  );
};

export default TodosTableActions;
