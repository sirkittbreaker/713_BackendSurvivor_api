import { Teacher } from "./teacher";
import { Student } from "./student";

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
  profile?: string; // URL ของรูปโปรไฟล์
  teacher?: Teacher;
  student?: Student;
}

export enum UserRole {
  ADMIN = "ROLE_ADMIN",
  TEACHER = "ROLE_TEACHER",
  STUDENT = "ROLE_STUDENT",
}
