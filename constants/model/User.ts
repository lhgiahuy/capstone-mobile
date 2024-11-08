export interface User {
  userId: string;
  username: string;
  avatarUrl: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cardUrl: string;
  roleName: string;
  campus: string;
}

export interface Register {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}

export interface Password {
  oldPassword: string;
  newPassword: string;
}
