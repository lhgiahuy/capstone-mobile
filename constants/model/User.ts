export interface Login {
  email: string;
  password: string;
  fcmToken?: string;
}

export interface User {
  userId: string;
  username: string;
  avatarUrl: string;
  email: string;
  verifyStatus: string;
  phoneNumber: string;
  studentId: string;
  cardUrl: string;
  roleName: string;
  isHaveUnreadNoti: boolean;
}

export interface Register {
  username: string;
  email: string;
  password: string;
  studentId: string;
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
  studentId: string;
}

export interface FptCard {
  cardUrl: string;
}
