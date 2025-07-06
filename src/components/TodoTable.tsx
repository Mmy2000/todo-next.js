import { ITodo } from "@/app/interfaces";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MaxWidthWrapper from "./ui/MaxWidthWrapper";
import TodosTableActions from "./TodosTableActions";
import { Badge } from "./ui/badge";

export default function TodosTable({ todos }: { todos: ITodo[] }) {

  return (
    <MaxWidthWrapper>
      <Table>
        <TableCaption>A list of your todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo?.id}>
              <TableCell className="font-medium">{todo?.id}</TableCell>
              <TableCell>{todo?.title}</TableCell>
              <TableCell>
                {todo?.status === "done" ? (
                  <Badge className="bg-green-600">{todo?.status}</Badge>
                ) : (
                  <Badge variant={"secondary"}>{todo?.status}</Badge>
                )}
              </TableCell>
              <TableCell>
                <Badge className="" variant={"outline"}>
                  {todo?.priority}
                </Badge>
              </TableCell>
              <TableCell>
                {todo?.created_at
                  ? new Date(todo.created_at).toLocaleString()
                  : ""}
              </TableCell>
              <TableCell className="flex items-center justify-end space-x-2">
                <TodosTableActions todo={todo} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">
              {!todos.length ? "YOU DON'T HAVE ANY TODO YET!" : todos.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </MaxWidthWrapper>
  );
}
