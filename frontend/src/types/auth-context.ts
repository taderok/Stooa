

import { User } from '@/types/user';

export interface Auth {
  user: User;
  isAuthenticated: boolean;
  loginStatus: StatusPayload | Record<string, unknown>;
  loading: boolean;
  createFishbowl: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ data: Record<string, unknown> }> | Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  updateLogingStatus: () => void;
  updateCreateFishbowl: (val: boolean) => void;
}

export interface StatusPayload {
  type: string;
  data: {
    code?: number;
    message?: string;
    token?: string;
    refresh_token?: string;
  };
}
