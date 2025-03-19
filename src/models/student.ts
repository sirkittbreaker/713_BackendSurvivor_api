import { User } from "./user";
import { Department } from "./department";
import { Teacher } from "./teacher";

export interface Student {
  id: number;
  userId: number;
  user: User;
  studentId: string;
  firstName: string;
  lastName: string;
  departmentId: number;
  department: Department;
  teacherId?: number;
  teacher?: Teacher;
}

export interface StudentPagination {
  count: number;
  students: Student[];
}
