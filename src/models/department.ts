import { Teacher } from "./teacher";
import { Student } from "./student";

export interface Department {
  id: number;
  name: string;
  teachers: Teacher[];
  students: Student[];
}
