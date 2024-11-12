export interface User {
  userId: string;
  username: string;
  avatarUrl: string;
  email: string;
  verifyStatus: string;
  phoneNumber: string;
  cardUrl: string;
  roleName: string;
}

export interface Register {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}

// For change pasword
export interface Password {
  oldPassword: string;
  newPassword: string;
}

// For update frofile
export interface InforUser {
  username: string;
  avatarUrl: string;
  phoneNumber: string;
}

export interface FptCard {
  cardUrl: string;
}
