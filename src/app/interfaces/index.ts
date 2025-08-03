export interface ITodo {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  created_at?: Date;
}