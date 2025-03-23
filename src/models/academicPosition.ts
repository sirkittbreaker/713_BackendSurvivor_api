import { Teacher } from "./teacher";

export interface AcademicPosition {
  id: number;
  title: string;
  teachers: Teacher[];
}
