import { title } from "process";
import * as repo from "../repositories/appointmentRepository";

export async function getAllAppointmentsPagination(
  pageNo: number,
  pageSize: number
) {
  const pageAppointments = await repo.getAllAppointmentsPagination(
    pageNo,
    pageSize
  );
  return pageAppointments;
}

export async function updateAppointmentStatus(
  appointmentId: number,
  status: string
) {
  const updatedAppointment = await repo.updateAppointmentStatus(
    appointmentId,
    status
  );
  return updatedAppointment;
}

export async function updateFinalTime(appointmentId: number, finalTime: Date) {
  const updatedAppointment = await repo.updateFinalTime(
    appointmentId,
    finalTime
  );
  return updatedAppointment;
}

export async function findRequestedTimeById(appointmentId: number) {
  const appointment = await repo.findRequestedById(appointmentId);
  return appointment;
}

export async function addAppointment(
  requestedTime: Date,
  studentId: string,
  teacherId: number,
  title: string,
  content: string
) {
  const newAppointment = await repo.addAppointment(
    requestedTime,
    studentId,
    teacherId,
    title,
    content
  );
  return newAppointment;
}

export async function confirmAppointment(appointmentId: number) {
  const confirmedAppointment = await repo.confirmAppointment(appointmentId);
  return confirmedAppointment;
}