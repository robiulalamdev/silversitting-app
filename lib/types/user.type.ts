export type UserRole = "childcarer" | "parents" | "admin";

export type IUser = {
  _id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  residance: string;
};
