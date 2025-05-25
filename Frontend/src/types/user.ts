export interface User {
  id?: string;
  fullName?: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin' | 'ngo';
}

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
} 