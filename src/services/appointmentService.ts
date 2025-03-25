import * as repo from "../repositories/appointmentRepository";

export async function getAllAppointments() {
  const appointments = await repo.getAllAppointments();
  return appointments;
}

export async function getAppointmentsByStudentId(studentId: string) {
  const appointments = await repo.getAppointmentsByStudentId(studentId);
  return appointments;
}

export async function getAppointmentsByTeacherId(teacherId: number) {
  const appointments = await repo.getAppointmentsByTeacherId(teacherId);
  return appointments;
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

