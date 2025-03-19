import * as repo from "../repositories/appointmentRepository";

export async function getAllAppointmentsPagination(
  pageNo: number,
  pageSize: number
) {
    const pageAppointments = await repo.getAllAppointmentsPagination(pageNo, pageSize);
    return pageAppointments;
}