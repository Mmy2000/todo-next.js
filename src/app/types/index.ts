export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  source: string;
  is_active: boolean;
  profile: any;
  date_joined?:string
};

export type AuthContextType = {
  user: User | null;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

export type LoginInput = {
  email_or_username: string;
  password: string;
};

export type RegisterInput = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
};