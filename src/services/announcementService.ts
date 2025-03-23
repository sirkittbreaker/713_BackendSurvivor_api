import * as repo from "../repositories/announcementRepository";

export async function getAllAnnouncementsByTeacherId(teacherId: number) {
    const announcements = await repo.getAllAnnouncementsByTeacherId(teacherId);
    return announcements;
}

export async function addAnnouncement(title: string, content: string, fileUrl: string, teacherId: number) {
    const announcement = await repo.addAccouncement(title, content, fileUrl, teacherId);
    return announcement;
}