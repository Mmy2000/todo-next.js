export interface ITodo {
  id: string;
  title: string;
  body: string | null;
  status: string;
  priority: string;
  created_at?: Date;
}