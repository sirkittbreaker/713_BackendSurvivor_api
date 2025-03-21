import * as repo from "../repositories/commentRepository";

export async function addComment(
  teacherId: number,
  studentId: string,
  content: string
) {
  const newComment = await repo.addComment(teacherId, studentId, content);
  return newComment;
}
