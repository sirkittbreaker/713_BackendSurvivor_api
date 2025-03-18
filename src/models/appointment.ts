import { Student } from './student';
import { Teacher } from './teacher';

export interface Appointment {
    id: number;
    title: string;
    content: string;
    date: Date;
    isAccepted: boolean;
    studentId: string;
    student: Student;
    teacherId: number;
    teacher: Teacher;
}