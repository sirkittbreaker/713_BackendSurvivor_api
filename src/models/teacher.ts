import { User } from "./user";
import { AcademicPosition } from "./academicPosition";
import { Department } from "./department";
import { Student } from "./student";

export interface Teacher {
  id: number;
  userId: number;
  user: User;
  firstName: string;
  lastName: string;
  academicPositionId: number;
  academicPosition: AcademicPosition;
  departmentId: number;
  department: Department;
  students: Student[];
}

export interface TeacherPagination {
  count: number;
  teachers: any;
}
